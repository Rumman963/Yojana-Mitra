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

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());