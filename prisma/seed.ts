import { prisma } from "../src/lib/db_client";
import { jurisdictions } from "../src/lib/jurisdictions";

async function main() {
  // 1. States and Union Territories
  for (const jurisdiction of jurisdictions) {
    await prisma.jurisdiction.upsert({
       where: { lgdCode: jurisdiction.lgdCode },
      update: jurisdiction,
      create: jurisdiction,
    });
  }

  // 2. Documents
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

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());