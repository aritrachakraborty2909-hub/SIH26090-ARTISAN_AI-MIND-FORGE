import React from "react";
import { Volume2, X, Sparkles, Mic, Camera, IndianRupee, Store, ShieldCheck } from "lucide-react";
import { HastakalaVoiceEngine } from "../utils/speechEngine";

export default function VoiceGuideModal({ onClose }) {
  const voiceEngine = new HastakalaVoiceEngine();

  const guideSteps = [
    {
      title: "1. फोटो स्टूडियो (AI Studio)",
      hindi: "अपने उत्पाद की फोटो लें या अपलोड करें। एआई अपने आप बैकग्राउंड हटा देगा और सुंदर बैकग्राउंड लगा देगा।",
      english: "Take or upload a product photo. AI will automatically remove cluttered background and apply e-commerce studio lighting.",
      actionText: "सुनें: फोटो का विवरण (Listen Hindi)"
    },
    {
      title: "2. बहुभाषी आवाज़ कैटलॉगर (Voice Cataloger)",
      hindi: "माइक बटन दबाएं और अपनी क्षेत्रीय भाषा में उत्पाद के बारे में बोलें। एआई अंग्रेजी और हिंदी में विवरण तैयार करेगा।",
      english: "Press the mic and speak in your regional language. AI generates SEO title and description in English & Hindi.",
      actionText: "सुनें: कैटलॉग निर्देश (Listen Hindi)"
    },
    {
      title: "3. गतिशील मूल्य निर्धारण (Dynamic Pricing)",
      hindi: "कच्चे माल का खर्च और लगे घंटे दर्ज करें। एआई निष्पक्ष बाजार मूल्य और आपका मुनाफा बताएगा।",
      english: "Enter raw material cost and labor hours. AI calculates fair selling price and artisan profit margin.",
      actionText: "सुनें: मूल्य निर्देश (Listen Hindi)"
    },
    {
      title: "4. जीईएम और ओएनडीसी एक्सपोर्ट (GeM & ONDC Catalog)",
      hindi: "एक क्लिक में अपने उत्पादों को सरकारी ई-मार्केटप्लेस (GeM) और ONDC पर साझा करें।",
      english: "Export your digitized catalog to Government e-Marketplace (GeM) and print physical QR code hang-tags for trade fairs.",
      actionText: "सुनें: एक्सपोर्ट निर्देश (Listen Hindi)"
    }
  ];

  const speakText = (text) => {
    voiceEngine.speak(text, "hi-IN");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-amber-500/30 overflow-hidden relative animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-700 to-orange-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-amber-200 animate-bounce" />
            <div>
              <h3 className="font-extrabold text-base tracking-tight">आवाज़ सहायक और निर्देश (Voice Guide)</h3>
              <p className="text-xs text-amber-100">Low Digital Literacy Interactive Audio Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-amber-800/80 text-white hover:bg-amber-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {guideSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">{step.title}</h4>
                <button
                  onClick={() => speakText(step.hindi)}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{step.actionText}</span>
                </button>
              </div>
              <p className="text-xs text-amber-900 font-semibold mb-1">{step.hindi}</p>
              <p className="text-[11px] text-slate-500 font-medium">{step.english}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
