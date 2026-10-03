import { prisma } from "../src/lib/db_client";

async function main() {
  // 1. Documents
  const documents = [
    { key: "aadhaar", nameEn: "Aadhaar card", nameHi: "आधार कार्ड" },
    { key: "bank-passbook", nameEn: "Bank passbook", nameHi: "बैंक पासबुक" },
    { key: "land-records", nameEn: "Land ownership records", nameHi: "भूमि स्वामित्व के कागज़ात" },
  ];

  for (const doc of documents) {
    await prisma.document.upsert({
      where: { key: doc.key },
      update: doc,
      create: doc,
    });
  }

  // 2. One scheme
  const scheme = {
    slug: "pm-kisan",
    level: "CENTRAL" as const,
    category: "AGRICULTURE" as const,
    nameEn: "PM-KISAN",
    nameHi: "पीएम-किसान",
    descriptionEn: "Income support for landholding farmer families.",
    benefitEn: "Rs 6,000 per year, paid in three installments.",
    officialUrl: "https://pmkisan.gov.in",
    lastVerifiedAt: new Date(),
    occupations: ["farmer"],
  };

  await prisma.scheme.upsert({
    where: { slug: scheme.slug },
    update: {},
    create: {
      ...scheme,
      documents: {
        connect: [
          { key: "aadhaar" },
          { key: "bank-passbook" },
          { key: "land-records" },
        ],
      },
    },
  });

    // Test scheme 1: scholarship with age, income and category rules
  await prisma.scheme.upsert({
    where: { slug: "test-scholarship" },
    update: {},
    create: {
      slug: "test-scholarship",
      level: "CENTRAL",
      category: "EDUCATION",
      nameEn: "Test Scholarship",
      descriptionEn: "Test data only.",
      benefitEn: "Test data only.",
      officialUrl: "https://example.com",
      lastVerifiedAt: new Date(),
      minAge: 15,
      maxAge: 30,
      maxAnnualIncome: 250000,
      socialCategories: ["SC", "ST", "OBC"],
      occupations: ["student"],
    },
  });

  // Test scheme 2: state pension for older people
  await prisma.scheme.upsert({
    where: { slug: "test-up-pension" },
    update: {},
    create: {
      slug: "test-up-pension",
      level: "STATE",
      state: "Uttar Pradesh",
      category: "PENSION",
      nameEn: "Test UP Pension",
      descriptionEn: "Test data only.",
      benefitEn: "Test data only.",
      officialUrl: "https://example.com",
      lastVerifiedAt: new Date(),
      minAge: 60,
    },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());