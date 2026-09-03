import React, { useState } from "react";
import { Sparkles, Phone, Mail, ArrowRight, User, MapPin, CheckCircle2, Lock } from "lucide-react";
import { CRAFT_CATEGORIES } from "../data/sampleProducts";

export default function AuthScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState("login");
  const [loginMethod, setLoginMethod] = useState("mobile");
  
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    otp: "",
    name: "",
    craftCategory: CRAFT_CATEGORIES[0],
    location: "Varanasi, Uttar Pradesh",
    giRegistered: true
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.mobileOrEmail) {
      alert("Please enter a valid mobile number or email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: formData.name || (loginMethod === "mobile" ? "Master Artisan Weaver" : "Sita Ram Weaver"),
        identifier: formData.mobileOrEmail || "+91 98765 43210",
        craftCategory: formData.craftCategory,
        location: formData.location,
        giRegistered: formData.giRegistered
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden bg-inshot-dark">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff3366]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#ff5e62]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#16171d]/90 backdrop-blur-2xl border border-white/10 rounded-[36px] p-6 sm:p-8 shadow-2xl relative z-10 border-inshot-glow">
        
        {/* App Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-inshot-gradient flex items-center justify-center shadow-xl shadow-[#ff3366]/25 mx-auto mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gradient-inshot">
            Hastakala PRO AI
          </h1>
          <p className="text-xs text-[#ff3366] font-bold tracking-wider uppercase mt-1">
            Artisan Virtual Business Manager
          </p>
        </div>

        {/* Login / Sign Up Toggle */}
        <div className="flex bg-[#0e0e12] p-1 rounded-2xl mb-6 border border-white/10">
          <button
            onClick={() => { setAuthMode("login"); setOtpSent(false); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              authMode === "login"
                ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode("signup"); setOtpSent(false); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              authMode === "signup"
                ? "bg-inshot-gradient text-white shadow-lg shadow-[#ff3366]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile / Email Selector */}
        <div className="flex items-center justify-center gap-6 mb-5 text-xs text-slate-400 font-bold">
          <button
            onClick={() => setLoginMethod("mobile")}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
              loginMethod === "mobile" ? "border-[#ff3366] text-[#ff3366]" : "border-transparent text-slate-400"
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Mobile Number
          </button>
          <button
            onClick={() => setLoginMethod("email")}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
              loginMethod === "email" ? "border-[#ff3366] text-[#ff3366]" : "border-transparent text-slate-400"
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email Address
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={otpSent ? handleVerifyAndSubmit : handleSendOtp} className="space-y-4">
          
          {authMode === "signup" && !otpSent && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0e0e12] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Craft Category</label>
                <select
                  value={formData.craftCategory}
                  onChange={(e) => setFormData({ ...formData, craftCategory: e.target.value })}
                  className="w-full p-3 bg-[#0e0e12] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-[#ff3366]"
                >
                  {CRAFT_CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#16171d] text-white">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Artisan Cluster / Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. Varanasi, Uttar Pradesh"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0e0e12] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>
            </>
          )}

          {!otpSent ? (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {loginMethod === "mobile" ? "Mobile Number (10 Digits)" : "Email Address"}
              </label>
              <div className="relative">
                {loginMethod === "mobile" ? (
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                )}
                <input
                  type={loginMethod === "mobile" ? "tel" : "email"}
                  required
                  placeholder={loginMethod === "mobile" ? "+91 98765 43210" : "artisan@handicrafts.in"}
                  value={formData.mobileOrEmail}
                  onChange={(e) => setFormData({ ...formData, mobileOrEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#0e0e12] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-[#ff3366]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-[#ff3366]/10 border border-[#ff3366]/30 rounded-2xl text-xs text-[#ff3366] text-center font-bold">
                OTP code sent to {formData.mobileOrEmail || "your mobile"}. Enter demo code <strong>123456</strong> below.
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Enter 6-Digit OTP</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="123456"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0e0e12] border border-white/10 rounded-2xl text-sm font-black text-[#ff3366] tracking-widest focus:outline-none focus:border-[#ff3366]"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 rounded-2xl bg-inshot-gradient hover:bg-inshot-gradient-hover text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#ff3366]/30 transition-all touch-btn mt-5"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : otpSent ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP & Enter App</span>
              </>
            ) : (
              <>
                <span>{authMode === "signup" ? "Create Artisan Account" : "Get OTP Code"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <button
            onClick={() =>
              onLoginSuccess({
                name: "Sita Ram Master Weaver",
                identifier: "+91 98765 43210",
                craftCategory: "Handloom Weaving",
                location: "Varanasi, Uttar Pradesh",
                giRegistered: true
              })
            }
            className="text-xs text-slate-400 hover:text-[#ff3366] font-black underline underline-offset-4"
          >
            🚀 Fast Demo Sign In (Explore as Verified Master Artisan)
          </button>
        </div>

      </div>
    </div>
  );
}
