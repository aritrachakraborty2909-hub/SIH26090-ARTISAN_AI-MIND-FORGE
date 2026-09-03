/**
 * Multilingual Speech Recognition & Text-To-Speech Engine for Hastakala AI
 * Supports regional Indian languages: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Odia, English.
 */

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

  startListening(langCode = "hi-IN", onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError("Voice recognition is not supported in this browser.");
      return;
    }

    this.recognition.lang = langCode;

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

  speak(text, langCode = "hi-IN") {
    if (!this.synth) return;

    this.synth.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95; // Slightly slower for low-literacy clarity
    utterance.pitch = 1.0;

    // Try to find native voice
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(langCode.split("-")[0]));
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

export const sampleVoiceInputs = [
  {
    lang: "Hindi (हिंदी)",
    code: "hi-IN",
    text: "यह बनारसी सिल्क साड़ी है, हमने ६ दिन में हाथ के करघे पर बुनी है। इसमें असली चांदी की जरी और कड़वा बुनाई है।",
    craft: "Handloom Weaving"
  },
  {
    lang: "Hindi (हिंदी)",
    code: "hi-IN",
    text: "जयपुर की प्रसिद्ध ब्लू पॉटरी वास है। हमने इसमें क्वार्ट्ज़ स्टोन और प्राकृतिक नीले रंग का इस्तेमाल किया है।",
    craft: "Pottery & Ceramics"
  },
  {
    lang: "Marathi (मराठी)",
    code: "mr-IN",
    text: "हा पैठणी पदर साडी आहे. यावर मोर आणि पोपटाची नक्षी हाताने विणली आहे. १००% शुद्ध रेशीम आहे.",
    craft: "Handloom Weaving"
  },
  {
    lang: "Gujarati (ગુજરાતી)",
    code: "gu-IN",
    text: "આ પટોળા સાડી છે જે અમે પાટણમાં કુદરતી રંગોથી બનાવી છે. બંને બાજુ સરખી જ ભાત દેખાય છે.",
    craft: "Handloom Weaving"
  },
  {
    lang: "Tamil (தமிழ்)",
    code: "ta-IN",
    text: "இது காஞ்சிபுரம் பட்டு சேலை. சுத்தமான ஜரிகை மற்றும் இயற்கை பட்டு நூல் கொண்டு நெய்யப்பட்டது.",
    craft: "Handloom Weaving"
  },
  {
    lang: "Bengali (বাংলা)",
    code: "bn-IN",
    text: "এটি নদীয়ার তাঁতের সুতির শাড়ি। সম্পূর্ণ হাতে বোনা ও পরতে খুব আরামদায়ক।",
    craft: "Handloom Weaving"
  }
];
