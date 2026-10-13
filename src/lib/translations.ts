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
      findTitle: "Find your schemes",
  stepOf: "Step {n} of {total}",
  q1Title: "Where do you live, and how old are you?",
  stateLabel: "State",
  stateChoose: "Choose your state or Union Territory",
  groupStates: "States",
  groupUts: "Union Territories",
  ageLabel: "Age",
  agePlaceholder: "For example, 35",
  q2Title: "A little about you",
  q2Hint: "Optional. These help us find more schemes, and you can skip them.",
  genderLabel: "Gender",
  genderMale: "Male",
  genderFemale: "Female",
  genderOther: "Other",
  categoryLabel: "Category",
  categoryGeneral: "General",
  categoryObc: "OBC",
  categorySc: "SC",
  categorySt: "ST",
  q3Title: "Work and income",
  q3Hint: "Optional. Many schemes depend on these.",
  workLabel: "What work do you do?",
  workFarmer: "Farmer",
  workStudent: "Student",
  workOther: "Something else",
  incomeLabel: "Yearly family income in rupees",
  incomePlaceholder: "For example, 150000",
  back: "Back",
  next: "Next",
  searching: "Searching...",
  submit: "Find my schemes",
  yourSchemes: "Your schemes",
  changeAnswers: "Change my answers",
  errorGeneric: "Something went wrong. Please try again.",
  errorNetwork: "Could not reach the server. Please try again.",
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
      findTitle: "अपनी योजनाएँ खोजें",
  stepOf: "चरण {n} / {total}",
  q1Title: "आप कहाँ रहते हैं, और आपकी उम्र क्या है?",
  stateLabel: "राज्य",
  stateChoose: "अपना राज्य या केंद्र शासित प्रदेश चुनें",
  groupStates: "राज्य",
  groupUts: "केंद्र शासित प्रदेश",
  ageLabel: "उम्र",
  agePlaceholder: "उदाहरण: 35",
  q2Title: "आपके बारे में थोड़ा",
  q2Hint: "वैकल्पिक। इससे हमें और योजनाएँ खोजने में मदद मिलती है, आप इन्हें छोड़ सकते हैं।",
  genderLabel: "लिंग",
  genderMale: "पुरुष",
  genderFemale: "महिला",
  genderOther: "अन्य",
  categoryLabel: "श्रेणी",
  categoryGeneral: "सामान्य",
  categoryObc: "अन्य पिछड़ा वर्ग (OBC)",
  categorySc: "अनुसूचित जाति (SC)",
  categorySt: "अनुसूचित जनजाति (ST)",
  q3Title: "काम और आय",
  q3Hint: "वैकल्पिक। कई योजनाएँ इन पर निर्भर करती हैं।",
  workLabel: "आप क्या काम करते हैं?",
  workFarmer: "किसान",
  workStudent: "छात्र / छात्रा",
  workOther: "कुछ और",
  incomeLabel: "परिवार की सालाना आय (रुपये में)",
  incomePlaceholder: "उदाहरण: 150000",
  back: "वापस",
  next: "आगे",
  searching: "खोज रहे हैं...",
  submit: "मेरी योजनाएँ खोजें",
  yourSchemes: "आपकी योजनाएँ",
  changeAnswers: "जवाब बदलें",
  errorGeneric: "कुछ गड़बड़ हो गई। कृपया फिर से कोशिश करें।",
  errorNetwork: "सर्वर से संपर्क नहीं हो पाया। कृपया फिर से कोशिश करें।",
};

export const dictionary: Record<Lang, Record<TextKey, string>> = { en, hi };