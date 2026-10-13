export type Lang = "en" | "hi";

export const defaultLang: Lang = "en";

export function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "hi";
}

const en = {
  findSchemes: "Find schemes",
  changeLanguage: "Change language",

  heroBadge: "Uttar Pradesh and Bihar",
  heroTitleStart: "Find the government schemes you ",
  heroTitleHighlight: "actually qualify for",
  heroSubtitle:
    "Answer a few simple questions. We show the schemes that fit you, what you will get, and the documents to keep ready.",
  heroCta: "Find my schemes",
  heroHow: "How it works",
  heroPoint1: "Checked against official sources",
  heroPoint2: "Free to use, no sign-up",

  howTitle: "How it works",
  howStep: "Step",
  step1Title: "Tell us about yourself",
  step1Text:
    "Answer a few simple questions, such as your state, age, and work. Most are optional.",
  step2Title: "We find the schemes",
  step2Text:
    "We compare your details with each scheme's rules and show the ones that may fit you.",
  step3Title: "Apply with confidence",
  step3Text:
    "See the benefit, the documents to keep ready, and a link to the official website.",
};

export type TextKey = keyof typeof en;

const hi: Record<TextKey, string> = {
  findSchemes: "योजनाएँ खोजें",
  changeLanguage: "भाषा बदलें",

  heroBadge: "उत्तर प्रदेश और बिहार",
  heroTitleStart: "वे सरकारी योजनाएँ खोजें जिनके लिए आप ",
  heroTitleHighlight: "सच में पात्र हैं",
  heroSubtitle:
    "कुछ आसान सवालों के जवाब दीजिए। हम आपको वे योजनाएँ दिखाते हैं जो आपके लिए उपयुक्त हैं, आपको क्या मिलेगा, और कौन से दस्तावेज़ तैयार रखने हैं।",
  heroCta: "मेरी योजनाएँ खोजें",
  heroHow: "यह कैसे काम करता है",
  heroPoint1: "आधिकारिक स्रोतों से जाँची गई",
  heroPoint2: "मुफ़्त, साइन-अप की ज़रूरत नहीं",

  howTitle: "यह कैसे काम करता है",
  howStep: "चरण",
  step1Title: "अपने बारे में बताइए",
  step1Text:
    "अपने राज्य, उम्र और काम जैसे कुछ आसान सवालों के जवाब दीजिए। ज़्यादातर सवाल वैकल्पिक हैं।",
  step2Title: "हम योजनाएँ खोजते हैं",
  step2Text:
    "हम आपकी जानकारी को हर योजना के नियमों से मिलाते हैं और वे योजनाएँ दिखाते हैं जो आपके लिए उपयुक्त हो सकती हैं।",
  step3Title: "भरोसे के साथ आवेदन करें",
  step3Text:
    "लाभ, तैयार रखने वाले दस्तावेज़ और आधिकारिक वेबसाइट का लिंक देखें।",
};

export const dictionary: Record<Lang, Record<TextKey, string>> = { en, hi };