import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Sparkles, Volume2, Check, ArrowRight, Wand2, Tag, FileText, Languages, Globe, Search, ChevronDown, X } from "lucide-react";
import { CRAFT_CATEGORIES } from "../data/sampleProducts";
import { HastakalaVoiceEngine, SUPPORTED_LANGUAGES } from "../utils/speechEngine";

export default function VoiceCataloger({ photoSrc, onProceedToPricing }) {
  // Restore user's last selected language from localStorage or default to Bengali (bn-IN)
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedId = localStorage.getItem("hastakala_spoken_lang_id");
    if (savedId) {
      const found = SUPPORTED_LANGUAGES.find(l => l.id === savedId);
      if (found) return found;
    }
    return SUPPORTED_LANGUAGES[0]; // Bengali (India) default
  });

  // Search filter state for language combobox
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Clean Separate Data Architecture
  const [nativeTranscription, setNativeTranscription] = useState("আমি আজ বাজারে গিয়েছিলাম।");
  const [englishTranslation, setEnglishTranslation] = useState("I went to the market today.");

  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const [voiceEngine] = useState(() => new HastakalaVoiceEngine());
  const translationTimeoutRef = useRef(null);

  const [aiResult, setAiResult] = useState({
    title: "I went to the market today",
    craftCategory: "Handloom Weaving",
    description: "I went to the market today.",
    specifications: {
      material: "Natural Eco-Friendly Materials",
      technique: "Traditional Artisan Craftsmanship",
      dimensions: "Standard Artisan Size",
      weight: "Approx. 500g - 800g",
      care: "Dry Clean Only / Gentle Care"
    },
    tags: ["Handcrafted", "ArtisanProduct", "IndiaCraft"]
  });

  // Handle Source Language Selection Change
  const handleLanguageSelect = (langObj) => {
    setSelectedLanguage(langObj);
    localStorage.setItem("hastakala_spoken_lang_id", langObj.id);
    setIsDropdownOpen(false);
    setSearchQuery("");
    setNativeTranscription("");
    setEnglishTranslation("");
    setTranslationError(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter languages based on search query (name, nativeName, locale, region)
  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.speechLocale.toLowerCase().includes(q) ||
      (lang.region && lang.region.toLowerCase().includes(q))
    );
  });

  // Dynamic Neural Translation Engine: Selected Language -> English ONLY
  const translateSourceToEnglish = async (text, srcLang) => {
    if (!text || text.trim() === "") return "";
    const cleanText = text.trim();

    // If source language is English, return directly
    if (srcLang.speechLocale.startsWith("en")) {
      return cleanText;
    }

    try {
      // Dynamic Neural Machine Translation using source language locale -> English
      const srcCode = srcLang.speechLocale.split("-")[0];
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${srcCode}|en`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        if (data && data.responseData && data.responseData.translatedText) {
          let translated = data.responseData.translatedText.trim();
          translated = translated.replace(/^["']|["']$/g, "").trim();
          if (translated) return translated;
        }
      }
    } catch (e) {
      console.warn("Translation API fallback:", e);
    }

    // Direct fallback preserving raw text without adding any prefixed labels/metadata
    return cleanText;
  };

  // Real-Time Pipeline Effect
  useEffect(() => {
    if (!nativeTranscription || nativeTranscription.trim() === "") {
      setEnglishTranslation("");
      setTranslationError(null);
      return;
    }

    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
    }

    setIsTranslating(true);
    setTranslationError(null);

    translationTimeoutRef.current = setTimeout(async () => {
      try {
        const engText = await translateSourceToEnglish(nativeTranscription, selectedLanguage);
        setEnglishTranslation(engText);

        // Update overall catalog details dynamically
        let category = "Handloom Weaving";
        const lowerNative = nativeTranscription.toLowerCase();
        const lowerEng = engText.toLowerCase();

        if (lowerNative.includes("vase") || lowerNative.includes("pottery") || lowerNative.includes("पॉटरी") || lowerNative.includes("花瓶") || lowerEng.includes("pottery") || lowerEng.includes("vase")) {
          category = "Pottery & Ceramics";
        } else if (lowerNative.includes("brass") || lowerNative.includes("dhokra") || lowerNative.includes("metal") || lowerNative.includes("نحاسي") || lowerEng.includes("brass") || lowerEng.includes("metal")) {
          category = "Metal Craft & Casting";
        } else if (lowerNative.includes("toy") || lowerNative.includes("wood") || lowerNative.includes("खिलौना") || lowerEng.includes("toy") || lowerEng.includes("wood")) {
          category = "Wood Craft & Toys";
        }

        setAiResult({
          title: engText ? engText : "Handmade Craft Product",
          craftCategory: category,
          description: engText,
          specifications: {
            material: "Natural Eco-Friendly Materials",
            technique: "Traditional Artisan Craftsmanship",
            dimensions: "Standard Artisan Size",
            weight: "Approx. 500g - 800g",
            care: "Dry Clean Only / Gentle Care"
          },
          tags: ["Handcrafted", "ArtisanProduct", "IndiaCraft"]
        });
      } catch (err) {
        console.error(err);
        setTranslationError("Translation could not be completed.");
      } finally {
        setIsTranslating(false);
      }
    }, 350);

    return () => {
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
    };
  }, [nativeTranscription, selectedLanguage]);

  // Speech Recognition Start/Stop using Authoritative selectedLanguage.speechLocale
  const toggleListening = () => {
    if (isListening) {
      voiceEngine.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranslationError(null);

      // Explicitly pass selectedLanguage.speechLocale (e.g. bn-IN, ru-RU, zh-CN, ja-JP, hi-IN, etc.)
      voiceEngine.startListening(
        selectedLanguage.speechLocale,
        (res) => {
          setNativeTranscription(res);
        },
        (err) => {
          console.error(err);
          setIsListening(false);
          setTranslationError(`Speech in ${selectedLanguage.name} (${selectedLanguage.speechLocale}) not recognized. Please speak clearly.`);
        },
        () => setIsListening(false)
      );
    }
  };

  // TTS Narration handlers
  const playVoiceNarration = (text, locale) => {
    if (!text) return;
    voiceEngine.speak(text, locale || "en-US");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Studio Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-inshot-gradient text-white text-xs font-black shadow-lg shadow-[#ff3366]/25 mb-3">
          <Wand2 className="w-4 h-4 text-white" />
          <span>InShot PRO AI • Multilingual Voice Cataloger</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gradient-inshot tracking-tight mb-3">
          Multilingual Voice Auto-Cataloger
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Select your spoken language from the comprehensive speech registry below, press mic, and speak naturally. Your speech will be transcribed in native script and translated into English in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Voice Mic Studio & SEARCHABLE LANGUAGE COMBOBOX (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* SEARCHABLE SOURCE LANGUAGE SELECTOR CONTROL */}
          <div className="bg-[#16171d] p-5 rounded-[28px] border border-white/10 shadow-xl relative" ref={dropdownRef}>
            <label className="text-xs font-black text-slate-200 flex items-center justify-between mb-2">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#ff3366]" />
                Spoken Language (Source):
              </span>
              <span className="text-[10px] text-slate-400 font-bold bg-[#0e0e12] px-2.5 py-1 rounded-full border border-white/10">
                {SUPPORTED_LANGUAGES.length} Speech Locales
              </span>
            </label>

            {/* Combobox Trigger Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#0e0e12] hover:bg-[#121319] text-white text-xs font-bold p-3.5 rounded-2xl border border-white/15 focus:outline-none focus:border-[#ff3366] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366] flex-shrink-0 animate-pulse" />
                <span className="truncate font-black text-white">{selectedLanguage.name}</span>
                <span className="text-slate-400 font-medium truncate">({selectedLanguage.nativeName})</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                  {selectedLanguage.speechLocale}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180 text-[#ff3366]" : ""}`} />
              </div>
            </button>

            {/* Searchable Dropdown Popup */}
            {isDropdownOpen && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-[#16171d] border border-[#ff3366]/40 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl max-h-96 flex flex-col animate-in fade-in slide-in-from-top-2">
                
                {/* Search Input Bar */}
                <div className="p-3 border-b border-white/10 bg-[#0e0e12] relative flex items-center">
                  <Search className="w-4 h-4 text-[#ff3366] absolute left-6 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search language (e.g. Russian, Русский, hi, bn)..."
                    className="w-full bg-[#16171d] text-white text-xs font-bold pl-9 pr-8 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#ff3366]"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-5 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Options List */}
                <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => {
                      const isSelected = selectedLanguage.id === lang.id;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between font-bold ${
                            isSelected
                              ? "bg-[#ff3366]/15 text-white border border-[#ff3366]/40"
                              : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <span className="font-extrabold text-white truncate">{lang.name}</span>
                            <span className="text-[#ff3366] font-semibold text-[11px] truncate">({lang.nativeName})</span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono">
                              {lang.speechLocale}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#ff3366]" />}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 font-semibold">
                      No language found matching "{searchQuery}".
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

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
            
            {/* Dynamic Selected Language Indicator Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0e0e12] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-black text-[#ff3366]">
              <Languages className="w-3.5 h-3.5 text-[#ff3366]" />
              <span>{selectedLanguage.name} → English</span>
            </div>

            <h3 className="text-xs font-black text-[#ff3366] uppercase tracking-widest mt-2 mb-1">
              Press Mic & Speak in {selectedLanguage.name}
            </h3>
            <p className="text-[11px] text-slate-400 mb-6 max-w-xs font-medium">
              Active Locale: <strong className="text-white font-black">{selectedLanguage.speechLocale}</strong>
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

            {translationError && (
              <p className="text-xs font-bold text-amber-400 mt-4 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
                ⚠️ {translationError}
              </p>
            )}
          </div>

        </div>

        {/* Right Column: DUAL-LANGUAGE PRODUCT DESCRIPTION UI (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          <div className="bg-[#16171d] backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/10 relative">
            
            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#ff3366]" />
                  Dual-Language Product Description
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#ff3366] bg-[#ff3366]/10 px-3 py-1 rounded-full border border-[#ff3366]/30">
                  {selectedLanguage.name} → English
                </span>
                {isTranslating && (
                  <span className="text-xs text-[#ff3366] font-bold animate-pulse flex items-center gap-1">
                    <Sparkles className="w-4 h-4 animate-spin text-[#ff3366]" />
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-5">
              
              {/* TOP BOX 1: SPOKEN DESCRIPTION (SELECTED SOURCE LANGUAGE) */}
              <div className="p-4 bg-[#0e0e12] rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-[#ff3366] uppercase tracking-wider">
                    1. SPOKEN DESCRIPTION ({selectedLanguage.name.toUpperCase()})
                  </label>
                  <button
                    onClick={() => playVoiceNarration(nativeTranscription, selectedLanguage.ttsLocale)}
                    className="text-xs text-[#ff3366] hover:text-[#ff5e62] flex items-center gap-1.5 font-extrabold transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#ff3366]" />
                    <span>Listen Original</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={nativeTranscription}
                  onChange={(e) => setNativeTranscription(e.target.value)}
                  className="w-full p-3 text-xs font-semibold text-white bg-[#16171d] rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3366]"
                  placeholder={`Speech transcription in ${selectedLanguage.name}...`}
                />
              </div>

              {/* LOWER BLUE BOX 2: ENGLISH TRANSLATION ONLY */}
              <div className="p-4 bg-[#0e0e12] rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                    2. ENGLISH TRANSLATION
                  </label>
                  <button
                    onClick={() => playVoiceNarration(englishTranslation, "en-US")}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-extrabold transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Listen English</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={englishTranslation}
                  onChange={(e) => setEnglishTranslation(e.target.value)}
                  className="w-full p-3 text-xs font-bold text-white bg-[#16171d] rounded-xl border border-emerald-500/30 focus:outline-none"
                  placeholder="Strict faithful English translation of native speech..."
                />
              </div>

              {/* Additional Product Catalog Details */}
              <div className="pt-3 border-t border-white/10 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">English SEO Product Title</label>
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
                      <span key={i} className="text-xs font-bold bg-[#ff3366]/10 text-[#ff3366] px-[#ff3366] py-1 rounded-xl border border-[#ff3366]/30">
                        #{tg}
                      </span>
                    ))}
                  </div>
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
