import React, { useState } from "react";
import { Store, Download, QrCode, Search, Filter, ShieldCheck, Plus } from "lucide-react";
import confetti from "canvas-confetti";

export default function InventoryCatalog({ products, onSelectHangtag, onAddNewProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.craftCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || p.status.toLowerCase().includes(selectedStatus);
    return matchesSearch && matchesStatus;
  });

  const handleExportGeM = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    const jsonStr = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Hastakala_GeM_ONDC_Catalog_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
            <Store className="w-4 h-4 text-white" />
            <span>InShot PRO Media Catalog & GeM Storefront</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight">
            Digital Inventory & GeM Catalog
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Year-round digital storefront. Directly export your digitized inventory to GeM, ONDC, and generate physical trade-fair QR certificates.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onAddNewProduct}
            className="py-3.5 px-5 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-[#ff3366]/30 transition-all touch-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={handleExportGeM}
            className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all touch-btn"
          >
            <Download className="w-4 h-4" />
            <span>Export GeM / ONDC Catalog (JSON)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#16171d] backdrop-blur-xl p-4 rounded-[28px] shadow-xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search craft category or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-bold text-white bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none focus:border-[#ff3366]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              selectedStatus === "all" ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30" : "bg-[#0e0e12] text-slate-400 hover:text-white"
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setSelectedStatus("gem")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              selectedStatus === "gem" ? "bg-emerald-600 text-white shadow-lg" : "bg-[#0e0e12] text-slate-400 hover:text-white"
            }`}
          >
            GeM Listed
          </button>
          <button
            onClick={() => setSelectedStatus("ondc")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              selectedStatus === "ondc" ? "bg-indigo-600 text-white shadow-lg" : "bg-[#0e0e12] text-slate-400 hover:text-white"
            }`}
          >
            ONDC Ready
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-[#16171d] backdrop-blur-xl rounded-[32px] overflow-hidden shadow-2xl border border-white/10 hover:border-[#ff3366]/50 transition-all duration-300 flex flex-col group inshot-card-hover"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-[#0e0e12] overflow-hidden">
              <img
                src={prod.processedImage || prod.image}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0e0e12]/90 backdrop-blur text-[#ff3366] text-[10px] font-black px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff3366]" /> {prod.craftCategory}
              </span>

              {prod.giTagged && (
                <span className="absolute top-3 right-3 bg-inshot-gradient text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                  🏅 GI Tagged
                </span>
              )}

              <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-lg shadow-md">
                {prod.status}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-white text-sm line-clamp-1 mb-2">{prod.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed font-medium">
                  {prod.description}
                </p>
              </div>

              {/* Price & Hangtag Button Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Suggested SRP</span>
                  <span className="text-lg font-black text-[#ff3366]">₹{prod.suggestedPrice?.toLocaleString("en-IN")}</span>
                </div>

                <button
                  onClick={() => onSelectHangtag(prod)}
                  className="px-3.5 py-2 rounded-2xl bg-[#ff3366]/10 hover:bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/30 text-xs font-black flex items-center gap-2 transition-all shadow-md"
                  title="Generate Physical QR Code Certificate Hang-Tag"
                >
                  <QrCode className="w-4 h-4 text-[#ff3366]" />
                  <span>QR Hang-Tag</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
