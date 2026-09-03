import React from "react";
import { X, Printer, QrCode, ShieldCheck, Sparkles, MapPin, Award, Phone } from "lucide-react";

export default function ArtisanHangtagModal({ product, onClose }) {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-500/30 overflow-hidden relative animate-fadeIn">
        
        {/* Top Control Bar (Non-printable) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 printable-hide">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <QrCode className="w-4 h-4" /> Physical Trade Fair Printable QR Hang-Tag Certificate
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Certificate
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE HANG-TAG CERTIFICATE CONTAINER */}
        <div className="p-6 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 printable-hangtag text-slate-900">
          
          {/* Certificate Border Header */}
          <div className="border-4 border-double border-amber-700/60 p-5 rounded-2xl relative">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-700 text-white text-[10px] font-extrabold uppercase tracking-widest mb-1">
                MINISTRY OF TEXTILES & HANDICRAFTS • SHILP SAMAGAM
              </div>
              <h2 className="text-xl font-extrabold text-amber-900 tracking-tight">
                Authentic Craft Origin Certificate
              </h2>
              <p className="text-[11px] text-slate-600 font-serif italic">
                प्रामाणिक हस्तशिल्प एवं हथकरघा प्रमाण पत्र
              </p>
            </div>

            {/* Product Image & Key Specs */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-amber-200">
              <img
                src={product.processedImage || product.image}
                alt={product.title}
                className="w-20 h-20 rounded-xl object-cover border-2 border-amber-600 shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-extrabold text-slate-900 text-sm line-clamp-1">{product.title}</h3>
                <p className="text-xs font-bold text-amber-800 mb-1">{product.titleHindi}</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {product.craftCategory}
                  </span>
                  {product.giTagged && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      🏅 GI Tagged Craft
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Artisan Lineage & Story */}
            <div className="space-y-2 text-xs text-slate-700 mb-4 bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Master Artisan:</span>
                <span className="font-extrabold text-slate-900">{product.artisanName || "Sita Ram Master Weaver"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Craft Origin Cluster:</span>
                <span className="font-extrabold text-slate-900 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" /> {product.location || "Varanasi, UP"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Suggested Fair SRP:</span>
                <span className="font-extrabold text-amber-800 text-sm">₹{product.suggestedPrice?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* QR Code & Digital Scan Box */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-300 block">Scan to Buy Online Year-Round</span>
                <p className="text-xs font-bold text-white leading-snug">
                  साल भर डिजिटल खरीदारी के लिए QR कोड स्कैन करें
                </p>
                <span className="text-[9px] text-slate-400 block mt-1">GeM ID: {product.id} • Hastakala Verified</span>
              </div>

              {/* Dynamic Simulated QR SVG */}
              <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                  <rect x="5" y="5" width="30" height="30" rx="3" />
                  <rect x="10" y="10" width="20" height="20" fill="white" />
                  <rect x="15" y="15" width="10" height="10" />
                  <rect x="65" y="5" width="30" height="30" rx="3" />
                  <rect x="70" y="10" width="20" height="20" fill="white" />
                  <rect x="75" y="15" width="10" height="10" />
                  <rect x="5" y="65" width="30" height="30" rx="3" />
                  <rect x="10" y="70" width="20" height="20" fill="white" />
                  <rect x="15" y="75" width="10" height="10" />
                  <rect x="45" y="45" width="10" height="10" />
                  <rect x="65" y="65" width="15" height="15" />
                  <rect x="80" y="80" width="15" height="15" />
                  <rect x="45" y="15" width="10" height="20" />
                  <rect x="15" y="45" width="20" height="10" />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
