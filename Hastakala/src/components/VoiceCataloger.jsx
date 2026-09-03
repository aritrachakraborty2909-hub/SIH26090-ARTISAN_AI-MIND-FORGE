import React, { useState } from "react";
import { Mic, MicOff, Sparkles, Volume2, Globe, Check, Edit3, ArrowRight, Wand2, Tag, FileText } from "lucide-react";
import { REGIONAL_LANGUAGES, CRAFT_CATEGORIES } from "../data/sampleProducts";
import { HastakalaVoiceEngine, sampleVoiceInputs } from "../utils/speechEngine";

export default function VoiceCataloger({ photoSrc, onProceedToPricing }) {
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(
    "This saree was hand-woven on our home loom in Varanasi over 6 days using pure silk yarn and silver zari motifs."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [voiceEngine] = useState(() => new HastakalaVoiceEngine());

  const [aiResult, setAiResult] = useState({
    title: "Hand-Woven Royal Banarasi Silk & Zari Saree",
    craftCategory: "Handloom Weaving",
    description: "Exquisite hand-woven Kadwa Banarasi Silk Saree featuring pure silver zari floral bootis. Crafted over 6 days by master weavers using traditional Pit Looms. Soft, breathable, and certified under Silk Mark India.",
    specifications: {
      material: "100% Pure Katan Silk & Silver Zari",
      technique: "Kadwa Pit Loom Weave",
      dimensions: "6.5 Meters (with blouse piece)",
      weight: "750 grams",
      care: "Dry Clean Only"
    },
    tags: ["BanarasiSilk", "HandloomWeave", "GITagged", "VaranasiCraft"]
  });

  const toggleListening = () => {
    if (isListening) {
      voiceEngine.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceEngine.startListening(
        selectedLang,
        (res) => setTranscript(res),
        (err) => {
          console.error(err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
    }
  };

  const playVoiceNarration = (text) => {
    voiceEngine.speak(text, selectedLang);
  };

  const loadSampleVoice = (sample) => {
    setSelectedLang(sample.code);
    setTranscript(sample.text);
    generateAICatalog(sample.text, sample.craft);
  };

  const generateAICatalog = (inputTranscript = transcript, inputCraft = "Handloom Weaving") => {
    setIsGenerating(true);
    setTimeout(() => {
      let category = inputCraft;
      let title = "Authentic Artisan Handcrafted Product";
      let desc = inputTranscript;
      let mat = "Natural Eco-Friendly Materials";
      let tags = ["Handicraft", "ArtisanProduct", "IndiaCraft"];

      if (inputTranscript.toLowerCase().includes("saree") || inputTranscript.includes("साड़ी")) {
        category = "Handloom Weaving";
        title = "Royal Handloom Woven Silk Saree with Zari Motifs";
        desc = "Exquisite hand-woven silk saree crafted by traditional weavers using heritage looms. Features intricate floral zari borders, lightweight texture, and pure silk mark certification.";
        mat = "100% Pure Natural Silk & Metallic Thread";
        tags = ["HandloomSilk", "TraditionalWeave", "SareeCraft", "IndiaWeaver"];
      } else if (inputTranscript.toLowerCase().includes("pottery") || inputTranscript.toLowerCase().includes("vase")) {
        category = "Pottery & Ceramics";
        title = "Handpainted Royal Blue Pottery Quartz Decorative Vase";
        desc = "Authentic Jaipur Blue Pottery decorative vase hand-painted with traditional cobalt floral motifs. Made using quartz stone powder, raw glass, and natural oxides.";
        mat = "Quartz Stone Powder & Mineral Oxide Glaze";
        tags = ["BluePottery", "CeramicVase", "JaipurCraft", "Handpainted"];
      }

      setAiResult({
        title,
        craftCategory: category,
        description: desc,
        specifications: {
          material: mat,
          technique: "Traditional Artisan Craftsmanship",
          dimensions: "Standard Artisan Size",
          weight: "Approx. 500 - 800g",
          care: "Handle with care, keep dry"
        },
        tags
      });

      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
          <Wand2 className="w-4 h-4 text-white" />
          <span>InShot PRO AI • Multilingual Voice Auto-Cataloger</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight mb-3">
          Voice Auto-Cataloger Studio
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Describe your craft product via voice notes or text. AI automatically generates SEO-optimized product titles, descriptions, and catalog tags in English.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Voice Mic Studio Box (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {photoSrc && (
            <div className="bg-[#16171d] p-3.5 rounded-[28px] border border-white/10 shadow-xl flex items-center gap-3.5">
              <img src={photoSrc} alt="Selected Product" className="w-14 h-14 rounded-2xl object-cover border border-[#ff3366]/40 shadow-md" />
              <div>
                <span className="text-[10px] font-black uppercase text-[#ff3366] tracking-wider">AI Photo Linked</span>
                <p className="text-xs font-black text-white">Studio Photo Ready for Cataloging</p>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Object Cutout & Dehazed
                </span>
              </div>
            </div>
          )}

          {/* Voice Mic Studio Box */}
          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] text-white shadow-2xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden border-inshot-glow">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0e0e12] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#ff3366]" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
              >
                {REGIONAL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#16171d] text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <h3 className="text-xs font-black text-[#ff3366] uppercase tracking-widest mt-2 mb-1">
              Press Mic & Describe Craft Product
            </h3>
            <p className="text-[11px] text-slate-400 mb-6 max-w-xs font-medium">
              Tap to speak in {REGIONAL_LANGUAGES.find(l => l.code === selectedLang)?.name}.
            </p>

            {/* Mic Button */}
            <button
              onClick={toggleListening}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-2xl border-4 ${
                isListening
                  ? "bg-red-600 border-red-400 text-white mic-inshot-pulse scale-105"
                  : "bg-inshot-gradient border-white/30 text-white hover:scale-105 shadow-[#ff3366]/30"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8 animate-pulse mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Listening</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Tap Mic</span>
                </>
              )}
            </button>

            <button
              onClick={() => playVoiceNarration("Please state product name, materials used, and crafting time.")}
              className="mt-6 text-xs text-[#ff3366] hover:text-[#ff5e62] flex items-center gap-1.5 font-bold underline underline-offset-4"
            >
              <Volume2 className="w-4 h-4 text-[#ff3366]" /> <span>Hear Audio Instructions</span>
            </button>
          </div>

          {/* Transcript Box */}
          <div className="bg-[#16171d] p-5 rounded-[28px] shadow-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#ff3366]" /> Voice Transcript / Text Input
              </span>
              <button
                onClick={() => generateAICatalog()}
                disabled={isGenerating}
                className="text-xs font-black text-[#ff3366] bg-[#ff3366]/10 hover:bg-[#ff3366]/20 px-3 py-1.5 rounded-xl border border-[#ff3366]/30 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Re-Generate
              </button>
            </div>

            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={3}
              className="w-full p-3 text-xs font-semibold text-slate-200 bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none focus:border-[#ff3366]"
              placeholder="Describe your craft here or tap the mic..."
            />

            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-1.5">Preset Voice Samples:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleVoiceInputs.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSampleVoice(sample)}
                    className="text-[10px] bg-[#0e0e12] hover:bg-[#ff3366]/20 text-slate-300 px-2.5 py-1 rounded-xl border border-white/10 font-bold transition-all"
                  >
                    🗣️ {sample.lang.split(" ")[0]} - {sample.craft}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Generated Listing (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-inshot-gradient px-3 py-1 rounded-full shadow-md">
                  ✨ AI Generated E-Commerce Listing
                </span>
                <h3 className="text-lg font-black text-white mt-1.5">SEO Product Details</h3>
              </div>
              
              {isGenerating && (
                <span className="text-xs text-[#ff3366] font-bold animate-pulse flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 animate-spin text-[#ff3366]" /> AI Cataloging...
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">SEO English Title</label>
                <input
                  type="text"
                  value={aiResult.title}
                  onChange={(e) => setAiResult({ ...aiResult, title: e.target.value })}
                  className="w-full p-3 text-xs font-bold text-white bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none focus:border-[#ff3366]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Craft Category</label>
                <select
                  value={aiResult.craftCategory}
                  onChange={(e) => setAiResult({ ...aiResult, craftCategory: e.target.value })}
                  className="w-full p-3 text-xs font-bold text-white bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none"
                >
                  {CRAFT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#16171d] text-white">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 flex items-center justify-between mb-1">
                  <span>English Product Description</span>
                  <button
                    onClick={() => playVoiceNarration(aiResult.description, "en-IN")}
                    className="text-[10px] text-[#ff3366] hover:text-[#ff5e62] flex items-center gap-1 font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#ff3366]" /> Listen Audio
                  </button>
                </label>
                <textarea
                  rows={3}
                  value={aiResult.description}
                  onChange={(e) => setAiResult({ ...aiResult, description: e.target.value })}
                  className="w-full p-3 text-xs font-medium text-slate-200 bg-[#0e0e12] rounded-2xl border border-white/10 focus:outline-none"
                />
              </div>

              <div className="bg-[#0e0e12] p-4 rounded-2xl border border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                  <FileText className="w-4 h-4 text-[#ff3366]" /> Extracted Specifications
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Material:</span>
                    <span className="font-bold text-white">{aiResult.specifications.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold">Technique:</span>
                    <span className="font-bold text-white">{aiResult.specifications.technique}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#ff3366]" /> SEO Craft Hashtags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {aiResult.tags.map((tg, i) => (
                    <span key={i} className="text-xs font-bold bg-[#ff3366]/10 text-[#ff3366] px-3 py-1 rounded-xl border border-[#ff3366]/30">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => onProceedToPricing(aiResult)}
                className="py-3.5 px-6 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-[#ff3366]/30 transition-all touch-btn"
              >
                <span>Next: Dynamic Pricing Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
