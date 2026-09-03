import React, { useState, useEffect } from "react";
import { Camera, Upload, Sparkles, Wand2, Download, ArrowRight, Layers, RefreshCw, Sun, Crop, Sliders, Image as ImageIcon } from "lucide-react";
import { BACKDROP_PRESETS, SAMPLE_PRODUCTS } from "../data/sampleProducts";
import { processProductImage } from "../utils/imageProcessor";

export default function AIStudio({ onProceedToCatalog }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRODUCTS[0].image);
  const [processedImage, setProcessedImage] = useState(SAMPLE_PRODUCTS[0].image);
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeBackdrop, setActiveBackdrop] = useState("white");
  const [lightingEnhance, setLightingEnhance] = useState(true);
  const [dehazeClarity, setDehazeClarity] = useState(true);
  const [removeBackground, setRemoveBackground] = useState(true);

  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    runImageEnhancement();
  }, [selectedImage, activeBackdrop, lightingEnhance, dehazeClarity, removeBackground]);

  const runImageEnhancement = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    try {
      const result = await processProductImage(selectedImage, {
        removeBg: removeBackground,
        backdropId: activeBackdrop,
        lightingEnhance,
        dehazeClarity
      });
      setProcessedImage(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Studio Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
          <Wand2 className="w-4 h-4 text-white animate-spin" />
          <span>InShot PRO AI • Object Isolator & Dehazer Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight mb-3">
          AI Precision Photo Editor & Studio
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Upload any photo (product, vehicle, handicraft). AI isolates the identified object, performs a dynamic tight crop, and centers it cleanly on a white or custom studio backdrop with zero watermarks.
        </p>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: InShot Canvas & Split Slider (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="bg-[#16171d] rounded-[32px] p-5 shadow-2xl border border-white/10 border-inshot-glow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#ff3366] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#ff3366]" /> Live Pro Canvas Preview
              </span>
              {isProcessing && (
                <span className="text-xs font-black text-[#ff3366] animate-pulse flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI Dehazing & Cropping...
                </span>
              )}
            </div>

            {/* Split Slider Preview Box */}
            <div className="relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden bg-[#0a0b0e] border border-white/10 shadow-2xl group select-none">
              
              {/* InShot Scanline Laser */}
              {isProcessing && <div className="scanline-inshot" />}

              {/* After (Processed) Image */}
              <img
                src={processedImage}
                alt="AI Dynamic Object Precision Crop"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before (Original Raw) Image with Clip Path */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={selectedImage}
                  alt="Original Raw Photo"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-90 blur-[0.3px]"
                />
                <span className="absolute top-4 left-4 bg-[#0a0b0e]/90 backdrop-blur text-slate-300 text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 shadow-xl">
                  RAW UN-CROPPED PHOTO
                </span>
              </div>

              {/* Split Slider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-inshot-gradient cursor-ew-resize flex items-center justify-center shadow-2xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#16171d] text-[#ff3366] shadow-2xl flex items-center justify-center border-2 border-[#ff3366] -ml-3.5 text-xs font-black">
                  ↔
                </div>
              </div>

              {/* Invisible Range Input for Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            <div className="mt-4 text-center text-xs text-slate-400 font-bold tracking-wide">
              👈 Drag handle left/right to compare Original Photo vs AI Cropped Object 👉
            </div>
          </div>

          {/* Quick Sample Image Picker */}
          <div className="bg-[#16171d]/80 p-5 rounded-[28px] border border-white/10 backdrop-blur">
            <span className="text-xs font-bold text-slate-300 block mb-3">Sample Craft & Object Photos:</span>
            <div className="grid grid-cols-4 gap-3">
              {SAMPLE_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedImage(prod.image)}
                  className={`relative rounded-2xl overflow-hidden border-2 aspect-square transition-all ${
                    selectedImage === prod.image
                      ? "border-[#ff3366] ring-4 ring-[#ff3366]/20 scale-105 shadow-xl"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#0b0c10]/90 text-[9px] font-bold text-slate-300 p-1 text-center truncate">
                    {prod.craftCategory.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: InShot Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* Upload / Camera Control Box */}
          <div className="bg-[#16171d] p-5 rounded-[28px] shadow-xl border border-white/10">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#ff3366] mb-3.5 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#ff3366]" /> Upload or Capture Photo
            </h3>
            <div className="flex gap-3">
              <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#ff3366]/40 hover:border-[#ff3366] rounded-2xl bg-[#ff3366]/5 hover:bg-[#ff3366]/10 cursor-pointer transition-all text-center">
                <Upload className="w-6 h-6 text-[#ff3366] mb-1.5" />
                <span className="text-xs font-extrabold text-white">Upload Image</span>
                <span className="text-[10px] text-slate-400">PNG, JPG, WEBP</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={() => alert("Camera live stream initialized. Taking snap...")}
                className="flex-1 flex flex-col items-center justify-center p-4 border border-white/10 hover:border-white/20 rounded-2xl bg-[#0e0e12] hover:bg-[#16171d] transition-all text-center"
              >
                <Camera className="w-6 h-6 text-slate-300 mb-1.5" />
                <span className="text-xs font-extrabold text-white">Use Camera</span>
                <span className="text-[10px] text-slate-400">Live View</span>
              </button>
            </div>
          </div>

          {/* AI Precision Controls */}
          <div className="bg-[#16171d] p-5 rounded-[28px] shadow-xl border border-white/10 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#ff3366] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ff3366]" /> AI Precision Controls & Backdrops
            </h3>

            {/* Dynamic AI Object Crop Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#20222a] border border-white/10">
              <div>
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Crop className="w-4 h-4 text-[#ff3366]" /> Dynamic AI Object Crop & Isolation
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Tight bounding-box crop & centering</span>
              </div>
              <input
                type="checkbox"
                checked={removeBackground}
                onChange={(e) => setRemoveBackground(e.target.checked)}
                className="w-5 h-5 accent-[#ff3366] rounded cursor-pointer"
              />
            </div>

            {/* Backdrop Presets Grid */}
            <div>
              <span className="text-[11px] font-bold text-slate-300 block mb-2">Select Replacement Studio Backdrop:</span>
              <div className="grid grid-cols-2 gap-2.5">
                {BACKDROP_PRESETS.map((bp) => (
                  <button
                    key={bp.id}
                    onClick={() => setActiveBackdrop(bp.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left text-xs font-extrabold transition-all ${
                      activeBackdrop === bp.id
                        ? "border-[#ff3366] bg-[#ff3366]/10 text-white ring-1 ring-[#ff3366]/50 shadow-lg"
                        : "border-white/10 hover:border-white/20 text-slate-300 bg-[#0e0e12]"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border shadow-sm flex-shrink-0"
                      style={{ background: bp.bgStyle, borderColor: bp.border }}
                    />
                    <span className="truncate text-[11px]">{bp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Dehazer Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e0e12] border border-white/10">
              <div>
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" /> AI Dehaze & HD Enhancement
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Zero pixelation, crystal clarity</span>
              </div>
              <input
                type="checkbox"
                checked={dehazeClarity}
                onChange={(e) => setDehazeClarity(e.target.checked)}
                className="w-5 h-5 accent-[#ff3366] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={processedImage}
              download="hastakala-inshot-cropped.jpg"
              className="flex-1 py-3.5 px-4 rounded-2xl border border-white/10 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 bg-[#16171d] hover:bg-[#20222a] transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-[#ff3366]" /> Download Image
            </a>

            <button
              onClick={() => onProceedToCatalog(processedImage)}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#ff3366]/30 transition-all touch-btn"
            >
              <span>Next: Voice Cataloger</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
