import React, { useState } from "react";
import { Building2, ShoppingBag, Send, CheckCircle2, Users } from "lucide-react";
import confetti from "canvas-confetti";

export default function B2BMarketplace({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(100);
  const [quoteSent, setQuoteSent] = useState(false);

  const unitPrice = selectedProduct?.suggestedPrice || 1400;
  let discountPercent = 0;
  if (quantity >= 50 && quantity < 100) discountPercent = 10;
  if (quantity >= 100 && quantity < 300) discountPercent = 18;
  if (quantity >= 300) discountPercent = 25;

  const discountedUnitPrice = Math.round(unitPrice * (1 - discountPercent / 100));
  const totalBulkQuote = discountedUnitPrice * quantity;

  const handleSendQuote = () => {
    confetti({ particleCount: 60, spread: 50 });
    setQuoteSent(true);
    setTimeout(() => setQuoteSent(false), 4000);
  };

  const sampleB2BLeads = [
    {
      company: "TRIFED (Tribal Co-operative Marketing Federation)",
      requirement: "Authentic Dhokra Brass Artifacts & Tribal Craft",
      quantityNeeded: "250 Units",
      deadline: "Within 30 Days",
      budget: "₹12,000,000",
      location: "New Delhi"
    },
    {
      company: "Central Cottage Industries Emporium",
      requirement: "Pure Kadwa Banarasi Silk Sarees (Silk Mark Certified)",
      quantityNeeded: "150 Units",
      deadline: "Within 45 Days",
      budget: "₹1,800,000",
      location: "Janpath, New Delhi"
    },
    {
      company: "Tata Craft Empowerment Corporate Gifting",
      requirement: "Jaipur Blue Pottery Vases & Pen Holders",
      quantityNeeded: "500 Units",
      deadline: "Within 20 Days",
      budget: "₹1,500,000",
      location: "Mumbai"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
          <Building2 className="w-4 h-4 text-white" />
          <span>InShot PRO B2B • Wholesale Procurement Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight mb-3">
          B2B Wholesale Procurement Hub
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Connect directly with corporate gifting buyers, empanelled government buyers (TRIFED, Cottage Emporiums), and Shilp Samagam procurement leads without paying commission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: B2B Wholesale Bulk Quote Builder (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10 border-inshot-glow">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#ff3366] mb-5 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#ff3366]" /> B2B Bulk Order Quotation Generator
            </h3>

            <div className="space-y-5">
              {/* Product Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Select Craft Product from Catalog:</label>
                <select
                  value={selectedProduct?.id}
                  onChange={(e) => setSelectedProduct(products.find(p => p.id === e.target.value))}
                  className="w-full p-3.5 text-xs font-bold text-white bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#16171d] text-white">
                      {p.title} - Retail ₹{p.suggestedPrice}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Bulk Order Quantity:</label>
                  <span className="text-sm font-black text-[#ff3366]">{quantity} Units</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-[#0e0e12] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-black mt-1.5">
                  <span>MOQ: 20 Units</span>
                  <span>100 Units (-18%)</span>
                  <span>500+ Units (-25%)</span>
                </div>
              </div>

              {/* Wholesale Pricing Calculation Box */}
              <div className="bg-[#0e0e12] p-6 rounded-[28px] text-white shadow-2xl border border-white/10">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Standard Retail</span>
                    <span className="text-sm font-bold line-through text-slate-400">₹{unitPrice} / unit</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#ff3366] font-bold uppercase block">B2B Wholesale Price</span>
                    <span className="text-xl font-black text-[#ff3366]">₹{discountedUnitPrice} / unit</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Total B2B Quotation Value</span>
                    <span className="text-xs text-[#ff3366] font-semibold">({discountPercent}% Volume Discount Applied)</span>
                  </div>
                  <div className="text-3xl font-black text-emerald-400">
                    ₹{totalBulkQuote.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Send Quotation Button */}
              <button
                onClick={handleSendQuote}
                className="w-full py-4 px-6 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#ff3366]/30 transition-all touch-btn"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official B2B Quote to Empanelled Buyers</span>
              </button>

              {quoteSent && (
                <div className="p-4 bg-emerald-500/10 text-emerald-300 text-xs font-bold rounded-2xl border border-emerald-500/30 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Wholesale Quote Sent Successfully! Procurement officer will contact via GeM portal.</span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Column: Verified B2B Buyer Leads (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          <h3 className="text-xs font-black uppercase tracking-wider text-[#ff3366] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#ff3366]" /> Active Government & Corporate Buyer Leads
          </h3>

          <div className="space-y-4">
            {sampleB2BLeads.map((lead, idx) => (
              <div key={idx} className="bg-[#16171d] p-5 rounded-[28px] shadow-xl border border-white/10 hover:border-[#ff3366]/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-[#ff3366] bg-[#ff3366]/10 px-3 py-1 rounded-full border border-[#ff3366]/30">
                    Verified Lead #{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{lead.location}</span>
                </div>

                <h4 className="text-sm font-black text-white mb-1">{lead.company}</h4>
                <p className="text-xs text-slate-300 mb-3 font-medium">Looking for: <strong>{lead.requirement}</strong></p>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Quantity Needed:</span>
                    <strong className="text-white">{lead.quantityNeeded}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Target Budget:</span>
                    <strong className="text-emerald-400 font-black">{lead.budget}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
