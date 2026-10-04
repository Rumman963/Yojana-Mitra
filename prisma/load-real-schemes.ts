import { prisma } from "../src/lib/db_client";
import { realSchemes } from "./real-schemes";

async function main() {
  for (const item of realSchemes) {
    const slug = item.scheme.slug;

    // 1. Create the scheme, or update it if the slug already exists
    await prisma.scheme.upsert({
      where: { slug: slug },
      update: item.scheme,
      create: item.scheme,
    });

    // 2. Link its documents
    const links = item.documentKeys.map((key) => ({ key: key }));
    await prisma.scheme.update({
      where: { slug: slug },
      data: { documents: { set: links } },
    });

    console.log("Saved:", slug);
  }
}

main().finally(() => prisma.$disconnect());