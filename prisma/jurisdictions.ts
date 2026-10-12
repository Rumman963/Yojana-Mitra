// Source: Local Government Directory (Ministry of Panchayati Raj), "List of States", October 2026.
// lgdCode comes from the official LGD list. Hindi names are NOT from that list and still need checking.

export type JurisdictionSeed = {
  lgdCode: number;
  nameEn: string;
  nameHi: string;
  type: "STATE" | "UNION_TERRITORY";
};

export const jurisdictions: JurisdictionSeed[] = [
  // States
  { lgdCode: 28, nameEn: "Andhra Pradesh", nameHi: "आंध्र प्रदेश", type: "STATE" },
  { lgdCode: 12, nameEn: "Arunachal Pradesh", nameHi: "अरुणाचल प्रदेश", type: "STATE" },
  { lgdCode: 18, nameEn: "Assam", nameHi: "असम", type: "STATE" },
  { lgdCode: 10, nameEn: "Bihar", nameHi: "बिहार", type: "STATE" },
  { lgdCode: 22, nameEn: "Chhattisgarh", nameHi: "छत्तीसगढ़", type: "STATE" },
  { lgdCode: 30, nameEn: "Goa", nameHi: "गोवा", type: "STATE" },
  { lgdCode: 24, nameEn: "Gujarat", nameHi: "गुजरात", type: "STATE" },
  { lgdCode: 6, nameEn: "Haryana", nameHi: "हरियाणा", type: "STATE" },
  { lgdCode: 2, nameEn: "Himachal Pradesh", nameHi: "हिमाचल प्रदेश", type: "STATE" },
  { lgdCode: 20, nameEn: "Jharkhand", nameHi: "झारखंड", type: "STATE" },
  { lgdCode: 29, nameEn: "Karnataka", nameHi: "कर्नाटक", type: "STATE" },
  { lgdCode: 32, nameEn: "Kerala", nameHi: "केरल", type: "STATE" },
  { lgdCode: 23, nameEn: "Madhya Pradesh", nameHi: "मध्य प्रदेश", type: "STATE" },
  { lgdCode: 27, nameEn: "Maharashtra", nameHi: "महाराष्ट्र", type: "STATE" },
  { lgdCode: 14, nameEn: "Manipur", nameHi: "मणिपुर", type: "STATE" },
  { lgdCode: 17, nameEn: "Meghalaya", nameHi: "मेघालय", type: "STATE" },
  { lgdCode: 15, nameEn: "Mizoram", nameHi: "मिज़ोरम", type: "STATE" },
  { lgdCode: 13, nameEn: "Nagaland", nameHi: "नागालैंड", type: "STATE" },
  { lgdCode: 21, nameEn: "Odisha", nameHi: "ओडिशा", type: "STATE" },
  { lgdCode: 3, nameEn: "Punjab", nameHi: "पंजाब", type: "STATE" },
  { lgdCode: 8, nameEn: "Rajasthan", nameHi: "राजस्थान", type: "STATE" },
  { lgdCode: 11, nameEn: "Sikkim", nameHi: "सिक्किम", type: "STATE" },
  { lgdCode: 33, nameEn: "Tamil Nadu", nameHi: "तमिल नाडु", type: "STATE" },
  { lgdCode: 36, nameEn: "Telangana", nameHi: "तेलंगाना", type: "STATE" },
  { lgdCode: 16, nameEn: "Tripura", nameHi: "त्रिपुरा", type: "STATE" },
  { lgdCode: 9, nameEn: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", type: "STATE" },
  { lgdCode: 5, nameEn: "Uttarakhand", nameHi: "उत्तराखंड", type: "STATE" },
  { lgdCode: 19, nameEn: "West Bengal", nameHi: "पश्चिम बंगाल", type: "STATE" },

  // Union Territories
  { lgdCode: 35, nameEn: "Andaman and Nicobar Islands", nameHi: "अंडमान और निकोबार द्वीपसमूह", type: "UNION_TERRITORY" },
  { lgdCode: 4, nameEn: "Chandigarh", nameHi: "चंडीगढ़", type: "UNION_TERRITORY" },
  { lgdCode: 38, nameEn: "Dadra and Nagar Haveli and Daman and Diu", nameHi: "दादरा और नगर हवेली और दमन और दीव", type: "UNION_TERRITORY" },
  { lgdCode: 7, nameEn: "Delhi", nameHi: "दिल्ली", type: "UNION_TERRITORY" },
  { lgdCode: 1, nameEn: "Jammu and Kashmir", nameHi: "जम्मू और कश्मीर", type: "UNION_TERRITORY" },
  { lgdCode: 37, nameEn: "Ladakh", nameHi: "लद्दाख", type: "UNION_TERRITORY" },
  { lgdCode: 31, nameEn: "Lakshadweep", nameHi: "लक्षद्वीप", type: "UNION_TERRITORY" },
  { lgdCode: 34, nameEn: "Puducherry", nameHi: "पुडुचेरी", type: "UNION_TERRITORY" },
];