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
      nameEn: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      nameHi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
      descriptionEn:
        "Income support for farmer families who own cultivable land.",
      benefitEn:
        "Rs 6,000 per year in three equal installments of Rs 2,000 every four months, sent directly to your bank account.",
      howToApplyEn:
        "Register as a new farmer on the PM-KISAN portal, or through your State or UT authorities, who identify and verify beneficiaries. eKYC is mandatory: OTP-based eKYC on the portal, or biometric eKYC at a Common Service Centre (CSC).",
      officialUrl: "https://www.pmkisan.gov.in/",
      lastVerifiedAt: new Date("2026-10-05"),
      occupations: ["farmer"],
      otherConditionsEn: [
        "Your land must be in your State land records.",
        "You must complete eKYC.",
        "Some people are excluded, for example income tax payers, government employees and pensioners with Rs 10,000 or more a month. See the official website for the full list.",
      ],
    },
    documentKeys: ["aadhaar", "bank-passbook"],
  },{
    
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
            otherConditionsEn: [
        "You must not already receive a salary, pension or other social security pension from the Centre or the State.",
      ],
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
            otherConditionsEn: [
        "You must not already receive a salary, pension or other social security pension from the Centre or the State.",
      ],
    },
    documentKeys: [],
  },
];