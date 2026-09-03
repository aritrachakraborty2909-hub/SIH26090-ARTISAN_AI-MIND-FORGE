import React, { useState } from "react";
import { Sparkles, Camera, Mic, IndianRupee, Store, ArrowRight, Wand2, ShieldCheck, Check, Layers, ChevronRight } from "lucide-react";

export default function OnboardingSlides({ onGetStarted }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "slide-1",
      badge: "Feature 1: AI Precision Studio",
      icon: Camera,
      title: "AI Studio & Object Crop",
      subtitle: "Instant Photo Quality Enhancement",
      description: "Upload any raw craft or product photo. AI removes fog & haze, isolates the main subject, cuts out background clutter, and centers it on studio backdrops with zero watermarks.",
      highlights: [
        "Dynamic AI Bounding-Box Object Crop",
        "HD Dehaze & High-Clarity Enhancement",
        "Pure White & Custom Studio Themes"
      ],
      accentGradient: "from-[#ff3366] to-[#ff5e62]"
    },
    {
      id: "slide-2",
      badge: "Feature 2: Voice Auto-Cataloger",
      icon: Mic,
      title: "Multilingual Voice Cataloger",
      subtitle: "Describe Crafts in Your Mother Tongue",
      description: "Press the mic and describe your product in Hindi, Marathi, Bengali, Tamil, etc. AI automatically translates and generates SEO titles, descriptions, and hashtags in English.",
      highlights: [
        "9 Regional Languages Supported",
        "Auto-Extracts Specifications & Materials",
        "Generates High-Converting SEO Descriptions"
      ],
      accentGradient: "from-[#ff5e62] to-[#ff9966]"
    },
    {
      id: "slide-3",
      badge: "Feature 3: Dynamic Pricing",
      icon: IndianRupee,
      title: "Dynamic AI Pricing Assistant",
      subtitle: "Fair Artisan Wages & Market Benchmarks",
      description: "Input raw material costs and crafting labor hours. AI calculates fair artisan wages, profit margins, and benchmark prices based on Shilp Samagam & Surajkund trade fair data.",
      highlights: [
        "Fair Wages & Direct Net Profit Margin",
        "Shilp Samagam & Surajkund Trade Benchmarks",
        "Transparent Visual Cost Breakdown"
      ],
      accentGradient: "from-[#ff9966] to-[#00e5ff]"
    },
    {
      id: "slide-4",
      badge: "Feature 4: GeM & B2B Hub",
      icon: Store,
      title: "GeM & B2B Wholesale Hub",
      subtitle: "Year-Round Digital Commerce & Fairs",
      description: "Export your catalog to GeM & ONDC with 1-click. Connect directly with corporate gifting buyers and print QR-code hang-tag certificates for physical trade fairs.",
      highlights: [
        "1-Click Export to GeM & ONDC Formats",
        "Printable QR Story Certificate Hang-Tags",
        "B2B Wholesale Quotes for Empanelled Buyers"
      ],
      accentGradient: "from-[#00e5ff] to-[#ff3366]"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onGetStarted();
    }
  };

  const activeSlide = slides[currentSlide];
  const Icon = activeSlide.icon;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden bg-inshot-dark">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#ff3366]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="w-full max-w-md flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-inshot-gradient flex items-center justify-center shadow-lg shadow-[#ff3366]/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black text-gradient-inshot">Hastakala PRO AI</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={onGetStarted}
          className="text-xs font-extrabold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all"
        >
          Skip Intro
        </button>
      </div>

      {/* Main Sliding Container Card */}
      <div className="w-full max-w-md my-auto z-10">
        
        {/* Animated Slide Content Box */}
        <div className="bg-[#16171d]/90 backdrop-blur-2xl border border-white/10 rounded-[36px] p-6 sm:p-8 shadow-2xl relative border-inshot-glow transition-all duration-500 min-h-[460px] flex flex-col justify-between">
          
          <div>
            {/* Slide Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff3366]/10 text-[#ff3366] text-[11px] font-black border border-[#ff3366]/30 mb-4">
              <Wand2 className="w-3.5 h-3.5" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Giant Feature Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1a1b22] to-[#22242d] border border-white/10 flex items-center justify-center mb-5 shadow-xl">
              <Icon className="w-8 h-8 text-[#ff3366]" />
            </div>

            {/* Slide Titles */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {activeSlide.title}
            </h2>
            <p className="text-xs font-bold text-[#ff3366] mb-3">
              {activeSlide.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed font-medium mb-5">
              {activeSlide.description}
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              {activeSlide.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#ff3366]/20 border border-[#ff3366]/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#ff3366]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators Dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "w-8 bg-inshot-gradient shadow-md shadow-[#ff3366]/30"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Get Started / Next Controls */}
      <div className="w-full max-w-md z-10 pb-4">
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-sm flex items-center justify-center gap-2 shadow-2xl shadow-[#ff3366]/40 transition-all touch-btn"
        >
          <span>{currentSlide === slides.length - 1 ? "Get Started (लॉग इन / साइन अप)" : "Next Feature"}</span>
          {currentSlide === slides.length - 1 ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

    </div>
  );
}
