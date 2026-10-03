import { prisma } from "@/lib/db_client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const scheme = await prisma.scheme.findUnique({
    where: { slug: slug },
    include: { documents: true },
  });

  if (!scheme) {
    return Response.json({ error: "Scheme not found" }, { status: 404 });
  }

  return Response.json(scheme);
}