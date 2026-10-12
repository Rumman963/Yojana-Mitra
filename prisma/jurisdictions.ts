export type JurisdictionSeed = {
  code: string;
  nameEn: string;
  nameHi: string;
  type: "STATE" | "UNION_TERRITORY";
};

export const jurisdictions: JurisdictionSeed[] = [
  { code: "AP", nameEn: "Andhra Pradesh", nameHi: "आंध्र प्रदेश", type: "STATE" },
  { code: "AR", nameEn: "Arunachal Pradesh", nameHi: "अरुणाचल प्रदेश", type: "STATE" },
  { code: "AS", nameEn: "Assam", nameHi: "असम", type: "STATE" },
  { code: "BR", nameEn: "Bihar", nameHi: "बिहार", type: "STATE" },
  { code: "CG", nameEn: "Chhattisgarh", nameHi: "छत्तीसगढ़", type: "STATE" },
  { code: "GA", nameEn: "Goa", nameHi: "गोवा", type: "STATE" },
  { code: "GJ", nameEn: "Gujarat", nameHi: "गुजरात", type: "STATE" },
  { code: "HR", nameEn: "Haryana", nameHi: "हरियाणा", type: "STATE" },
  { code: "HP", nameEn: "Himachal Pradesh", nameHi: "हिमाचल प्रदेश", type: "STATE" },
  { code: "JH", nameEn: "Jharkhand", nameHi: "झारखंड", type: "STATE" },
  { code: "KA", nameEn: "Karnataka", nameHi: "कर्नाटक", type: "STATE" },
  { code: "KL", nameEn: "Kerala", nameHi: "केरल", type: "STATE" },
  { code: "MP", nameEn: "Madhya Pradesh", nameHi: "मध्य प्रदेश", type: "STATE" },
  { code: "MH", nameEn: "Maharashtra", nameHi: "महाराष्ट्र", type: "STATE" },
  { code: "MN", nameEn: "Manipur", nameHi: "मणिपुर", type: "STATE" },
  { code: "ML", nameEn: "Meghalaya", nameHi: "मेघालय", type: "STATE" },
  { code: "MZ", nameEn: "Mizoram", nameHi: "मिज़ोरम", type: "STATE" },
  { code: "NL", nameEn: "Nagaland", nameHi: "नागालैंड", type: "STATE" },
  { code: "OD", nameEn: "Odisha", nameHi: "ओडिशा", type: "STATE" },
  { code: "PB", nameEn: "Punjab", nameHi: "पंजाब", type: "STATE" },
  { code: "RJ", nameEn: "Rajasthan", nameHi: "राजस्थान", type: "STATE" },
  { code: "SK", nameEn: "Sikkim", nameHi: "सिक्किम", type: "STATE" },
  { code: "TN", nameEn: "Tamil Nadu", nameHi: "तमिल नाडु", type: "STATE" },
  { code: "TS", nameEn: "Telangana", nameHi: "तेलंगाना", type: "STATE" },
  { code: "TR", nameEn: "Tripura", nameHi: "त्रिपुरा", type: "STATE" },
  { code: "UP", nameEn: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", type: "STATE" },
  { code: "UK", nameEn: "Uttarakhand", nameHi: "उत्तराखंड", type: "STATE" },
  { code: "WB", nameEn: "West Bengal", nameHi: "पश्चिम बंगाल", type: "STATE" },
  { code: "AN", nameEn: "Andaman and Nicobar Islands", nameHi: "अंडमान और निकोबार द्वीपसमूह", type: "UNION_TERRITORY" },
  { code: "CH", nameEn: "Chandigarh", nameHi: "चंडीगढ़", type: "UNION_TERRITORY" },
  { code: "DH", nameEn: "Dadra and Nagar Haveli and Daman and Diu", nameHi: "दादरा और नगर हवेली और दमन और दीव", type: "UNION_TERRITORY" },
  { code: "DL", nameEn: "Delhi", nameHi: "दिल्ली", type: "UNION_TERRITORY" },
  { code: "JK", nameEn: "Jammu and Kashmir", nameHi: "जम्मू और कश्मीर", type: "UNION_TERRITORY" },
  { code: "LA", nameEn: "Ladakh", nameHi: "लद्दाख", type: "UNION_TERRITORY" },
  { code: "LD", nameEn: "Lakshadweep", nameHi: "लक्षद्वीप", type: "UNION_TERRITORY" },
  { code: "PY", nameEn: "Puducherry", nameHi: "पुडुचेरी", type: "UNION_TERRITORY" },
];
