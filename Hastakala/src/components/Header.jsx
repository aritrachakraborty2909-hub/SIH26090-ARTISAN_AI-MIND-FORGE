import React, { useState } from "react";
import { Sparkles, Camera, Mic, IndianRupee, Store, Building2, Volume2, Globe, User, LogOut, Smartphone, Monitor } from "lucide-react";
import { REGIONAL_LANGUAGES } from "../data/sampleProducts";

export default function Header({
  activeTab,
  setActiveTab,
  selectedLang,
  setSelectedLang,
  onTriggerVoiceGuide,
  userProfile,
  onSignOut,
  isMobileFrame,
  setIsMobileFrame
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0e0e12]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* InShot Brand Logo & PRO AI Badge */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("inventory")}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-inshot-gradient rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-2xl bg-[#16171d] flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-[#ff3366] animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-gradient-inshot flex items-center gap-2">
                Hastakala
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-inshot-gradient text-white shadow-md shadow-[#ff3366]/30">
                  PRO AI
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                {userProfile?.name ? `Welcome, ${userProfile.name}` : "Artisan Business Manager"}
              </p>
            </div>
          </div>

          {/* InShot Style Desktop Toolbar Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#16171d] p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab("studio")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "studio"
                  ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>AI Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("cataloger")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "cataloger"
                  ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Cataloger</span>
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "pricing"
                  ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              <span>Pricing</span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "inventory"
                  ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab("b2b")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === "b2b"
                  ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>B2B Hub</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            
            {/* View Shell Mode Toggle */}
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16171d] border border-white/10 text-xs font-bold text-slate-300 hover:text-[#ff3366] transition-colors shadow-sm"
              title="Toggle Mobile View Frame"
            >
              {isMobileFrame ? (
                <>
                  <Monitor className="w-4 h-4 text-[#ff3366]" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-[#ff3366]" />
                  <span>Mobile App Shell</span>
                </>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#16171d] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 shadow-sm">
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

            {/* User Profile Button */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-2xl bg-inshot-gradient p-0.5 shadow-lg shadow-[#ff3366]/20 transition-transform active:scale-95"
              >
                <div className="w-full h-full bg-[#16171d] rounded-[14px] flex items-center justify-center text-white">
                  <User className="w-4 h-4 text-[#ff3366]" />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-[#16171d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn">
                  <div className="pb-2 border-b border-white/10 mb-2">
                    <span className="text-xs font-black text-white block truncate">{userProfile?.name || "Artisan Weaver"}</span>
                    <span className="text-[10px] text-[#ff3366] font-bold block truncate">{userProfile?.craftCategory || "Handloom Weaver"}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{userProfile?.identifier}</span>
                  </div>

                  <button
                    onClick={onTriggerVoiceGuide}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-white/5 flex items-center gap-2 transition-colors mb-1"
                  >
                    <Volume2 className="w-4 h-4 text-[#ff3366]" /> Voice Assistant
                  </button>

                  <button
                    onClick={() => { setShowProfileMenu(false); onSignOut(); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
