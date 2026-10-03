
import { profileSchema } from "@/lib/profile-schema";
import { prisma } from "@/lib/db_client";
import { isEligible } from "@/lib/matcher";


export async function POST(request: Request) {
  // 1. Read the JSON body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  // 2. Check the profile
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid profile" }, { status: 400 });
  }
  const profile = parsed.data;

  // 3. Load all schemes
  const schemes = await prisma.scheme.findMany({
    include: { documents: true },
  });

  // 4. Keep only the schemes this person is eligible for
  const matches = [];
  for (const scheme of schemes) {
    if (isEligible(profile, scheme)) {
      matches.push(scheme);
    }
  }

  return Response.json({ count: matches.length, matches: matches });
}