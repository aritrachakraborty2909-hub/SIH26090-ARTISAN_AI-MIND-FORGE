/**
 * Centralized Multilingual Speech Recognition & Text-To-Speech Engine for Hastakala AI
 * Comprehensive official BCP 47 locale registry based on Web Speech API capabilities.
 */

export const SUPPORTED_LANGUAGES = [
  // --- POPULAR & SOUTH ASIA ---
  { id: "bn-IN", name: "Bengali (India)", nativeName: "বাংলা (ভারত)", speechLocale: "bn-IN", ttsLocale: "bn-IN", region: "South Asia" },
  { id: "bn-BD", name: "Bengali (Bangladesh)", nativeName: "বাংলা (বাংলাদেশ)", speechLocale: "bn-BD", ttsLocale: "bn-BD", region: "South Asia" },
  { id: "hi-IN", name: "Hindi", nativeName: "हिंदी", speechLocale: "hi-IN", ttsLocale: "hi-IN", region: "South Asia" },
  { id: "mr-IN", name: "Marathi", nativeName: "मराठी", speechLocale: "mr-IN", ttsLocale: "mr-IN", region: "South Asia" },
  { id: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", speechLocale: "gu-IN", ttsLocale: "gu-IN", region: "South Asia" },
  { id: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", speechLocale: "pa-IN", ttsLocale: "pa-IN", region: "South Asia" },
  { id: "ta-IN", name: "Tamil (India)", nativeName: "தமிழ் (இந்திய)", speechLocale: "ta-IN", ttsLocale: "ta-IN", region: "South Asia" },
  { id: "ta-LK", name: "Tamil (Sri Lanka)", nativeName: "தமிழ் (இலங்கை)", speechLocale: "ta-LK", ttsLocale: "ta-LK", region: "South Asia" },
  { id: "te-IN", name: "Telugu", nativeName: "తెలుగు", speechLocale: "te-IN", ttsLocale: "te-IN", region: "South Asia" },
  { id: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ", speechLocale: "kn-IN", ttsLocale: "kn-IN", region: "South Asia" },
  { id: "ml-IN", name: "Malayalam", nativeName: "മലയാളം", speechLocale: "ml-IN", ttsLocale: "ml-IN", region: "South Asia" },
  { id: "ur-PK", name: "Urdu (Pakistan)", nativeName: "اردو (پاکستان)", speechLocale: "ur-PK", ttsLocale: "ur-PK", region: "South Asia" },
  { id: "ur-IN", name: "Urdu (India)", nativeName: "اردو (بھارت)", speechLocale: "ur-IN", ttsLocale: "ur-IN", region: "South Asia" },
  { id: "or-IN", name: "Odia", nativeName: "ଓଡ଼ିଆ", speechLocale: "or-IN", ttsLocale: "or-IN", region: "South Asia" },
  { id: "ne-NP", name: "Nepali", nativeName: "नेपाली", speechLocale: "ne-NP", ttsLocale: "ne-NP", region: "South Asia" },
  { id: "si-LK", name: "Sinhala", nativeName: "සිංහල", speechLocale: "si-LK", ttsLocale: "si-LK", region: "South Asia" },

  // --- EAST & SOUTHEAST ASIA ---
  { id: "zh-CN", name: "Chinese (Mandarin Simplified)", nativeName: "中文 (简体)", speechLocale: "zh-CN", ttsLocale: "zh-CN", region: "East Asia" },
  { id: "zh-TW", name: "Chinese (Taiwan Traditional)", nativeName: "中文 (繁體)", speechLocale: "zh-TW", ttsLocale: "zh-TW", region: "East Asia" },
  { id: "zh-HK", name: "Chinese (Cantonese HK)", nativeName: "粵語 (香港)", speechLocale: "zh-HK", ttsLocale: "zh-HK", region: "East Asia" },
  { id: "ja-JP", name: "Japanese", nativeName: "日本語", speechLocale: "ja-JP", ttsLocale: "ja-JP", region: "East Asia" },
  { id: "ko-KR", name: "Korean", nativeName: "한국어", speechLocale: "ko-KR", ttsLocale: "ko-KR", region: "East Asia" },
  { id: "th-TH", name: "Thai", nativeName: "ไทย", speechLocale: "th-TH", ttsLocale: "th-TH", region: "Southeast Asia" },
  { id: "id-ID", name: "Indonesian", nativeName: "Bahasa Indonesia", speechLocale: "id-ID", ttsLocale: "id-ID", region: "Southeast Asia" },
  { id: "vi-VN", name: "Vietnamese", nativeName: "Tiếng Việt", speechLocale: "vi-VN", ttsLocale: "vi-VN", region: "Southeast Asia" },
  { id: "ms-MY", name: "Malay", nativeName: "Bahasa Melayu", speechLocale: "ms-MY", ttsLocale: "ms-MY", region: "Southeast Asia" },
  { id: "km-KH", name: "Khmer", nativeName: "ភាសាខ្មែរ", speechLocale: "km-KH", ttsLocale: "km-KH", region: "Southeast Asia" },
  { id: "lo-LA", name: "Lao", nativeName: "ພາສາລາວ", speechLocale: "lo-LA", ttsLocale: "lo-LA", region: "Southeast Asia" },

  // --- EUROPE & AMERICAS ---
  { id: "en-US", name: "English (US)", nativeName: "English (US)", speechLocale: "en-US", ttsLocale: "en-US", region: "Americas" },
  { id: "en-GB", name: "English (UK)", nativeName: "English (UK)", speechLocale: "en-GB", ttsLocale: "en-GB", region: "Europe" },
  { id: "en-IN", name: "English (India)", nativeName: "English (India)", speechLocale: "en-IN", ttsLocale: "en-IN", region: "South Asia" },
  { id: "en-AU", name: "English (Australia)", nativeName: "English (Australia)", speechLocale: "en-AU", ttsLocale: "en-AU", region: "Oceania" },
  { id: "ru-RU", name: "Russian", nativeName: "Русский", speechLocale: "ru-RU", ttsLocale: "ru-RU", region: "Europe" },
  { id: "es-ES", name: "Spanish (Spain)", nativeName: "Español (España)", speechLocale: "es-ES", ttsLocale: "es-ES", region: "Europe" },
  { id: "es-MX", name: "Spanish (Mexico)", nativeName: "Español (México)", speechLocale: "es-MX", ttsLocale: "es-MX", region: "Americas" },
  { id: "es-US", name: "Spanish (US)", nativeName: "Español (EE.UU.)", speechLocale: "es-US", ttsLocale: "es-US", region: "Americas" },
  { id: "fr-FR", name: "French (France)", nativeName: "Français (France)", speechLocale: "fr-FR", ttsLocale: "fr-FR", region: "Europe" },
  { id: "fr-CA", name: "French (Canada)", nativeName: "Français (Canada)", speechLocale: "fr-CA", ttsLocale: "fr-CA", region: "Americas" },
  { id: "de-DE", name: "German", nativeName: "Deutsch", speechLocale: "de-DE", ttsLocale: "de-DE", region: "Europe" },
  { id: "it-IT", name: "Italian", nativeName: "Italiano", speechLocale: "it-IT", ttsLocale: "it-IT", region: "Europe" },
  { id: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", speechLocale: "pt-BR", ttsLocale: "pt-BR", region: "Americas" },
  { id: "pt-PT", name: "Portuguese (Portugal)", nativeName: "Português (Portugal)", speechLocale: "pt-PT", ttsLocale: "pt-PT", region: "Europe" },
  { id: "nl-NL", name: "Dutch", nativeName: "Nederlands", speechLocale: "nl-NL", ttsLocale: "nl-NL", region: "Europe" },
  { id: "pl-PL", name: "Polish", nativeName: "Polski", speechLocale: "pl-PL", ttsLocale: "pl-PL", region: "Europe" },
  { id: "uk-UA", name: "Ukrainian", nativeName: "Українська", speechLocale: "uk-UA", ttsLocale: "uk-UA", region: "Europe" },
  { id: "tr-TR", name: "Turkish", nativeName: "Türkçe", speechLocale: "tr-TR", ttsLocale: "tr-TR", region: "Middle East" },
  { id: "el-GR", name: "Greek", nativeName: "Ελληνικά", speechLocale: "el-GR", ttsLocale: "el-GR", region: "Europe" },
  { id: "sv-SE", name: "Swedish", nativeName: "Svenska", speechLocale: "sv-SE", ttsLocale: "sv-SE", region: "Europe" },
  { id: "no-NO", name: "Norwegian", nativeName: "Norsk", speechLocale: "no-NO", ttsLocale: "no-NO", region: "Europe" },
  { id: "da-DK", name: "Danish", nativeName: "Dansk", speechLocale: "da-DK", ttsLocale: "da-DK", region: "Europe" },
  { id: "fi-FI", name: "Finnish", nativeName: "Suomi", speechLocale: "fi-FI", ttsLocale: "fi-FI", region: "Europe" },
  { id: "cs-CZ", name: "Czech", nativeName: "Čeština", speechLocale: "cs-CZ", ttsLocale: "cs-CZ", region: "Europe" },
  { id: "hu-HU", name: "Hungarian", nativeName: "Magyar", speechLocale: "hu-HU", ttsLocale: "hu-HU", region: "Europe" },
  { id: "ro-RO", name: "Romanian", nativeName: "Română", speechLocale: "ro-RO", ttsLocale: "ro-RO", region: "Europe" },
  { id: "bg-BG", name: "Bulgarian", nativeName: "Български", speechLocale: "bg-BG", ttsLocale: "bg-BG", region: "Europe" },
  { id: "hr-HR", name: "Croatian", nativeName: "Hrvatski", speechLocale: "hr-HR", ttsLocale: "hr-HR", region: "Europe" },
  { id: "sr-RS", name: "Serbian", nativeName: "Српски", speechLocale: "sr-RS", ttsLocale: "sr-RS", region: "Europe" },
  { id: "sk-SK", name: "Slovak", nativeName: "Slovenčina", speechLocale: "sk-SK", ttsLocale: "sk-SK", region: "Europe" },
  { id: "sl-SI", name: "Slovenian", nativeName: "Slovenščina", speechLocale: "sl-SI", ttsLocale: "sl-SI", region: "Europe" },

  // --- MIDDLE EAST & AFRICA ---
  { id: "ar-SA", name: "Arabic (Saudi Arabia)", nativeName: "العربية (السعودية)", speechLocale: "ar-SA", ttsLocale: "ar-SA", region: "Middle East" },
  { id: "ar-EG", name: "Arabic (Egypt)", nativeName: "العربية (مصر)", speechLocale: "ar-EG", ttsLocale: "ar-EG", region: "Middle East" },
  { id: "ar-AE", name: "Arabic (UAE)", nativeName: "العربية (الإمارات)", speechLocale: "ar-AE", ttsLocale: "ar-AE", region: "Middle East" },
  { id: "he-IL", name: "Hebrew", nativeName: "עברית", speechLocale: "he-IL", ttsLocale: "he-IL", region: "Middle East" },
  { id: "fa-IR", name: "Persian (Farsi)", nativeName: "فارسی", speechLocale: "fa-IR", ttsLocale: "fa-IR", region: "Middle East" },
  { id: "sw-KE", name: "Swahili", nativeName: "Kiswahili", speechLocale: "sw-KE", ttsLocale: "sw-KE", region: "Africa" },
  { id: "af-ZA", name: "Afrikaans", nativeName: "Afrikaans", speechLocale: "af-ZA", ttsLocale: "af-ZA", region: "Africa" },
  { id: "zu-ZA", name: "Zulu", nativeName: "isiZulu", speechLocale: "zu-ZA", ttsLocale: "zu-ZA", region: "Africa" },
  { id: "am-ET", name: "Amharic", nativeName: "አማርኛ", speechLocale: "am-ET", ttsLocale: "am-ET", region: "Africa" }
];

export class HastakalaVoiceEngine {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    } else {
      this.recognition = null;
    }

    this.synth = window.speechSynthesis || null;
  }

  isSupported() {
    return !!this.recognition;
  }

  startListening(speechLocale = "en-US", onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError("Voice recognition is not supported in this browser.");
      return;
    }

    // Explicitly configure recognition language from selected user language
    this.recognition.lang = speechLocale || "en-US";

    this.recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  speak(text, ttsLocale = "en-US") {
    if (!this.synth) return;

    this.synth.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ttsLocale || "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Match native TTS voice for locale
    const voices = this.synth.getVoices();
    const prefix = ttsLocale ? ttsLocale.split("-")[0].toLowerCase() : "en";
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}
