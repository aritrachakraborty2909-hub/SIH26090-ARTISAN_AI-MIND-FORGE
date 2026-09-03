/**
 * Dynamic Pricing Assistant Engine for Hastakala AI
 * Calculates optimal market price, artisan fair wages, profit margin, and market benchmarks.
 */

export function calculateDynamicPricing({
  rawMaterialCost = 1000,
  laborHours = 20,
  hourlyRate = 120,
  packagingCost = 250,
  craftCategory = "Handloom Weaving",
  isGiTagged = false,
  targetMarginPercent = 35
}) {
  // Base Production Cost
  const totalLaborWage = Math.max(0, laborHours * hourlyRate);
  const baseCost = Math.max(0, rawMaterialCost) + totalLaborWage + Math.max(0, packagingCost);

  // Skill & GI Tag Premium Multiplier
  let GI_Multiplier = isGiTagged ? 1.25 : 1.0;
  
  let categoryMultiplier = 1.15;
  if (craftCategory.includes("Handloom") || craftCategory.includes("Silk")) categoryMultiplier = 1.30;
  if (craftCategory.includes("Metal") || craftCategory.includes("Dhokra")) categoryMultiplier = 1.28;
  if (craftCategory.includes("Pottery") || craftCategory.includes("Wood")) categoryMultiplier = 1.20;

  // Recommended Base Price (Cost + Artisan Net Profit Margin)
  const marginMultiplier = 1 + (targetMarginPercent / 100);
  const calculatedBasePrice = baseCost * marginMultiplier * GI_Multiplier;

  // Market Range Estimation (Surajkund / Dilli Haat / Export Benchmarks)
  const minMarketPrice = Math.round((baseCost * 1.25) / 50) * 50;
  const optimalPrice = Math.round(calculatedBasePrice / 50) * 50;
  const maxMarketPrice = Math.round((calculatedBasePrice * 1.35 * categoryMultiplier) / 50) * 50;

  // Profit Breakdown calculation for optimal price
  const artisanNetProfit = Math.round(optimalPrice - baseCost);
  const artisanTotalEarnings = totalLaborWage + artisanNetProfit;

  return {
    baseCost: Math.round(baseCost),
    totalLaborWage: Math.round(totalLaborWage),
    rawMaterialCost: Math.round(rawMaterialCost),
    packagingCost: Math.round(packagingCost),
    artisanNetProfit,
    artisanTotalEarnings,
    minMarketPrice,
    optimalPrice,
    maxMarketPrice,
    marginPercent: Math.round((artisanNetProfit / optimalPrice) * 100),
    breakdownPercent: {
      material: Math.round((rawMaterialCost / optimalPrice) * 100),
      labor: Math.round((totalLaborWage / optimalPrice) * 100),
      packaging: Math.round((packagingCost / optimalPrice) * 100),
      profit: Math.round((artisanNetProfit / optimalPrice) * 100)
    }
  };
}

export const CRAFT_BENCHMARKS = [
  {
    category: "Handloom Weaving (Silk & Fine Cotton)",
    avgHourlyRate: 150,
    avgLaborHours: 40,
    typicalMargin: "35% - 50%",
    shilpFairPriceRange: "₹8,000 - ₹25,000",
    tip: "Silk Mark & GI Tagged sarees command a 25-40% premium on e-commerce platforms."
  },
  {
    category: "Jaipur Blue Pottery / Ceramics",
    avgHourlyRate: 120,
    avgLaborHours: 12,
    typicalMargin: "30% - 45%",
    shilpFairPriceRange: "₹1,500 - ₹6,500",
    tip: "Fragile ceramic crafts should account for 10-15% extra cushioning in packaging cost."
  },
  {
    category: "Dhokra Lost-Wax Brass Craft",
    avgHourlyRate: 130,
    avgLaborHours: 24,
    typicalMargin: "40% - 60%",
    shilpFairPriceRange: "₹3,500 - ₹12,000",
    tip: "Highlight ancient tribal heritage and recycled metal purity to attract B2B corporate buyers."
  },
  {
    category: "Channapatna Wooden Craft & Toys",
    avgHourlyRate: 110,
    avgLaborHours: 8,
    typicalMargin: "25% - 40%",
    shilpFairPriceRange: "₹800 - ₹3,200",
    tip: "IS-9873 Non-Toxic certification increases exports to schools and international buyers."
  }
];
