import React, { useState, useEffect } from "react";
import { IndianRupee, TrendingUp, Award, CheckCircle2, Wand2 } from "lucide-react";
import { calculateDynamicPricing, CRAFT_BENCHMARKS } from "../utils/pricingEngine";
import { CRAFT_CATEGORIES } from "../data/sampleProducts";

export default function DynamicPricing({ initialCatalogData, onSaveToInventory }) {
  const [rawMaterialCost, setRawMaterialCost] = useState(initialCatalogData?.rawMaterialCost || 3500);
  const [laborHours, setLaborHours] = useState(initialCatalogData?.laborHours || 48);
  const [hourlyRate, setHourlyRate] = useState(initialCatalogData?.laborRatePerHour || 150);
  const [packagingCost, setPackagingCost] = useState(initialCatalogData?.packagingShipping || 400);
  const [craftCategory, setCraftCategory] = useState(initialCatalogData?.craftCategory || "Handloom Weaving");
  const [isGiTagged, setIsGiTagged] = useState(true);
  const [targetMargin] = useState(35);

  const [pricing, setPricing] = useState(() =>
    calculateDynamicPricing({
      rawMaterialCost,
      laborHours,
      hourlyRate,
      packagingCost,
      craftCategory,
      isGiTagged,
      targetMarginPercent: targetMargin
    })
  );

  useEffect(() => {
    const res = calculateDynamicPricing({
      rawMaterialCost: Number(rawMaterialCost),
      laborHours: Number(laborHours),
      hourlyRate: Number(hourlyRate),
      packagingCost: Number(packagingCost),
      craftCategory,
      isGiTagged,
      targetMarginPercent: Number(targetMargin)
    });
    setPricing(res);
  }, [rawMaterialCost, laborHours, hourlyRate, packagingCost, craftCategory, isGiTagged, targetMargin]);

  const handlePublish = () => {
    const finalProduct = {
      ...initialCatalogData,
      rawMaterialCost: Number(rawMaterialCost),
      laborHours: Number(laborHours),
      laborRatePerHour: Number(hourlyRate),
      packagingShipping: Number(packagingCost),
      suggestedPrice: pricing.optimalPrice,
      marketMinPrice: pricing.minMarketPrice,
      marketMaxPrice: pricing.maxMarketPrice,
      craftCategory,
      giTagged: isGiTagged
    };
    onSaveToInventory(finalProduct);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
          <TrendingUp className="w-4 h-4 text-white" />
          <span>InShot PRO AI • Dynamic Market Pricing Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight mb-3">
          AI Dynamic Market Pricing Assistant
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Eliminate under-pricing and middleman exploitation. AI calculates raw materials, labor wages, and market benchmarks from Shilp Samagam & Surajkund fairs to suggest fair, competitive selling prices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Cost Input Sliders & Parameters (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">

          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10 border-inshot-glow">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#ff3366] mb-5 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#ff3366]" /> Cost & Labor Parameter Calculator
            </h3>

            <div className="space-y-5">
              {/* Raw Material Cost */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Raw Material Cost</label>
                  <span className="text-sm font-black text-[#ff3366]">₹{rawMaterialCost}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="15000"
                  step="100"
                  value={rawMaterialCost}
                  onChange={(e) => setRawMaterialCost(e.target.value)}
                  className="w-full h-2 bg-[#0e0e12] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Labor Hours Spent */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Artisan Crafting Time</label>
                  <span className="text-sm font-black text-[#ff3366]">{laborHours} Hours ({Math.round(laborHours / 8)} Days)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  value={laborHours}
                  onChange={(e) => setLaborHours(e.target.value)}
                  className="w-full h-2 bg-[#0e0e12] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Hourly Wage Rate */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Artisan Wage Rate</label>
                  <span className="text-sm font-black text-[#ff3366]">₹{hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="400"
                  step="10"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full h-2 bg-[#0e0e12] rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                  ✓ Direct Fair Wage: ₹{laborHours * hourlyRate}
                </span>
              </div>

              {/* Packaging */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Packaging & Cushioning</label>
                  <span className="text-sm font-black text-[#ff3366]">₹{packagingCost}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  className="w-full h-2 bg-[#0e0e12] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* GI Tag & Category */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Craft Category</label>
                  <select
                    value={craftCategory}
                    onChange={(e) => setCraftCategory(e.target.value)}
                    className="w-full p-2.5 text-xs font-bold text-white bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none"
                  >
                    {CRAFT_CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#16171d] text-white">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#ff3366]/10 border border-[#ff3366]/30">
                  <div>
                    <span className="text-xs font-bold text-white block">GI Tagged Premium</span>
                    <span className="text-[10px] text-[#ff3366] font-bold">+25% Value</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiTagged}
                    onChange={(e) => setIsGiTagged(e.target.checked)}
                    className="w-4 h-4 accent-[#ff3366] rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Craft Benchmark Tip Card */}
          <div className="bg-[#16171d] p-5 rounded-[28px] text-white shadow-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[#ff3366]" />
              <h4 className="text-sm font-bold text-white">Shilp Samagam & Trade Fair Market Benchmark</h4>
            </div>
            <p className="text-xs text-slate-300 mb-2 font-medium">
              Based on historical sales at Shilp Samagam & Surajkund Crafts Mela, authentic {craftCategory} sells in the fair price range of:
            </p>
            <div className="text-xl font-black text-[#ff3366]">
              {CRAFT_BENCHMARKS[0].shilpFairPriceRange}
            </div>
          </div>

        </div>

        {/* Right Column: AI Price & Profit Breakdown Graph (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">

          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-inshot-gradient px-3 py-1 rounded-full shadow-md">
                ✨ AI Price Recommendation
              </span>
              <span className="text-xs text-slate-400 font-semibold">Total Direct Cost: ₹{pricing.baseCost}</span>
            </div>

            {/* Main Price Display Box */}
            <div className="bg-inshot-gradient p-6 rounded-[32px] text-white shadow-2xl shadow-[#ff3366]/30 text-center relative overflow-hidden">
              <span className="text-xs font-black uppercase tracking-widest text-white/90 block mb-1">
                Optimal Selling Price
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight my-1">
                ₹{pricing.optimalPrice.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-white/90 font-medium mt-1">
                Artisan Net Earnings: <strong className="text-white font-black text-sm">₹{pricing.artisanTotalEarnings.toLocaleString("en-IN")}</strong> (Fair Wages + Net Profit)
              </p>
            </div>

            {/* Min / Max Range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#0e0e12] border border-white/10 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Min Fair Price</span>
                <span className="text-sm font-black text-white">₹{pricing.minMarketPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#ff3366]/10 border border-[#ff3366]/30 text-center">
                <span className="text-[10px] font-bold text-[#ff3366] uppercase block">Premium Retail</span>
                <span className="text-sm font-black text-[#ff3366]">₹{pricing.maxMarketPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Profit & Cost Visual Bar Chart Breakdown */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-slate-200 mb-3 flex items-center justify-between">
                <span>Cost & Profit Breakdown</span>
                <span className="text-emerald-400 font-black text-xs">+{pricing.marginPercent}% Net Profit</span>
              </h4>

              <div className="h-6 w-full rounded-2xl overflow-hidden flex shadow-inner border border-white/10 mb-3">
                <div
                  className="bg-[#ff3366] h-full flex items-center justify-center text-[10px] font-black text-white transition-all"
                  style={{ width: `${pricing.breakdownPercent.material}%` }}
                >
                  {pricing.breakdownPercent.material}%
                </div>
                <div
                  className="bg-indigo-600 h-full flex items-center justify-center text-[10px] font-black text-white transition-all"
                  style={{ width: `${pricing.breakdownPercent.labor}%` }}
                >
                  {pricing.breakdownPercent.labor}%
                </div>
                <div
                  className="bg-slate-600 h-full flex items-center justify-center text-[10px] font-black text-white transition-all"
                  style={{ width: `${pricing.breakdownPercent.packaging}%` }}
                >
                  {pricing.breakdownPercent.packaging}%
                </div>
                <div
                  className="bg-emerald-600 h-full flex items-center justify-center text-[10px] font-black text-white transition-all"
                  style={{ width: `${pricing.breakdownPercent.profit}%` }}
                >
                  {pricing.breakdownPercent.profit}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-[#ff3366]" />
                  <span>Materials: ₹{pricing.rawMaterialCost}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span>Labor Wages: ₹{pricing.totalLaborWage}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-slate-600" />
                  <span>Packaging: ₹{pricing.packagingCost}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span>Net Profit: ₹{pricing.artisanNetProfit}</span>
                </div>
              </div>
            </div>

            {/* Save to Catalog Button */}
            <div className="pt-2">
              <button
                onClick={handlePublish}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all touch-btn"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Save Listing to Artisan Inventory & GeM Catalog</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
