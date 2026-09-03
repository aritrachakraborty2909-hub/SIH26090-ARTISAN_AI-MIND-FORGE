import React from "react";
import { Camera, Mic, IndianRupee, Store, Building2 } from "lucide-react";

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "studio", label: "AI Studio", icon: Camera },
    { id: "cataloger", label: "Cataloger", icon: Mic },
    { id: "pricing", label: "Pricing", icon: IndianRupee },
    { id: "inventory", label: "Inventory", icon: Store },
    { id: "b2b", label: "B2B Hub", icon: Building2 },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0e0e12]/95 backdrop-blur-2xl border-t border-white/10 py-2 px-3 flex items-center justify-around shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              isActive
                ? "text-[#ff3366] font-black scale-105"
                : "text-slate-400 hover:text-slate-200 font-bold"
            }`}
          >
            <div
              className={`p-2 rounded-2xl transition-all ${
                isActive
                  ? "bg-[#ff3366]/20 border border-[#ff3366]/40 shadow-lg shadow-[#ff3366]/20"
                  : "bg-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
