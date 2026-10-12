import { prisma } from "../src/lib/db_client";
import { realSchemes } from "./real-schemes";

async function main() {
  for (const item of realSchemes) {
    const slug = item.scheme.slug;

    // 1. Create the scheme, or update it if the slug already exists
    const saved = await prisma.scheme.upsert({
      where: { slug: slug },
      update: item.scheme,
      create: item.scheme,
    });

    // 2. Link the state (only for state schemes)
    let jurisdictionId: number | null = null;
    if (item.stateLgdCode !== undefined) {
      const jurisdiction = await prisma.jurisdiction.findUnique({
        where: { lgdCode: item.stateLgdCode },
      });
      if (!jurisdiction) {
        throw new Error("No state with LGD code " + item.stateLgdCode);
      }
      jurisdictionId = jurisdiction.id;
    }

    // 3. Link the documents
    const links = item.documentKeys.map((key) => ({ key: key }));

    await prisma.scheme.update({
      where: { slug: slug },
      data: {
        jurisdictionId: jurisdictionId,
        documents: { set: links },
      },
    });

    // 4. Replace the sources
    await prisma.schemeSource.deleteMany({ where: { schemeId: saved.id } });
    for (const source of item.sources) {
      await prisma.schemeSource.create({
        data: {
          schemeId: saved.id,
          url: source.url,
          supports: source.supports,
          accessedAt: new Date(source.accessedAt),
        },
      });
    }

    console.log("Saved:", slug);
  }
}

main().finally(() => prisma.$disconnect());