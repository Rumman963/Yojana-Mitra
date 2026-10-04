import type { Prisma } from "../src/generated/prisma/client";

type Entry = {
  scheme: Prisma.SchemeCreateInput;
  documentKeys: string[];
};

export const realSchemes: Entry[] = [
  {
    scheme: {
      slug: "pm-kisan",
      level: "CENTRAL",
      category: "AGRICULTURE",
      nameEn: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      nameHi: "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)",
      descriptionEn:
        "Income support for landholding farmer families. Not available to institutional landholders or to higher-income categories such as retired pensioners with a monthly pension of Rs 10,000 or more.",
      benefitEn:
        "Rs 6,000 per year per family, paid in three installments of Rs 2,000 every four months.",
      howToApplyEn:
        "Apply through the village Patwari or revenue officials, or self-register in the Farmers Corner at pmkisan.gov.in. eKYC is required.",
      officialUrl: "https://pmkisan.gov.in",
      lastVerifiedAt: new Date("2026-10-04"),
      occupations: ["farmer"],
    },
    
    documentKeys: ["aadhaar", "bank-passbook", "land-records"],

    
  },

    {
    scheme: {
      slug: "atal-pension-yojana",
      level: "CENTRAL",
      category: "PENSION",
      nameEn: "Atal Pension Yojana (APY)",
      nameHi: "अटल पेंशन योजना",
      descriptionEn:
        "A guaranteed pension scheme for unorganised-sector workers. Open to Indian citizens aged 18 to 40 with a bank account. Not open to anyone who is or has been an income-tax payer.",
      benefitEn:
        "A fixed monthly pension of Rs 1,000 to Rs 5,000 (your choice) after age 60. The same pension goes to the spouse after the subscriber's death.",
      howToApplyEn:
        "Apply at your bank branch or post office. Contributions are auto-debited from your savings account until age 60.",
      officialUrl: "https://www.pfrda.org.in",
      lastVerifiedAt: new Date("2026-10-04"),
      minAge: 18,
      maxAge: 40,
    },
    documentKeys: [],
  },
  {
    scheme: {
      slug: "bihar-vridhjan-pension",
      level: "STATE",
      state: "Bihar",
      category: "PENSION",
      nameEn: "Mukhyamantri Vridhjan Pension Yojana (Bihar)",
      nameHi: "मुख्यमंत्री वृद्धजन पेंशन योजना",
      descriptionEn:
        "Old-age pension for senior citizens of Bihar aged 60 or above, for all income groups. Not for people already receiving a salary, pension, or other social security pension from the Centre or State.",
      benefitEn: "Rs 1,100 per month (from June 2025).",
      howToApplyEn:
        "Apply online on the Bihar social security portal, or at the RTPS counter in your Gram Panchayat office. Keep your age proof (date of birth certificate) ready.",
      officialUrl: "https://sspmis.bihar.gov.in",
      lastVerifiedAt: new Date("2026-10-04"),
      minAge: 60,
    },
    documentKeys: [],
  },
];