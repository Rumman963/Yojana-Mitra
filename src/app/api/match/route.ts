import { z } from "zod";
import { prisma } from "@/lib/db_client";
import { isEligible, type Profile } from "@/lib/matcher";
import { extractProfile } from "@/lib/llm";
import { profileSchema } from "@/lib/profile-schema";
import { isRateLimited } from "@/lib/rate-limit";

const bodySchema = z.object({
  text: z.string().min(3).max(1000).optional(),
  profile: profileSchema.optional(),
});

export async function POST(request: Request) {
  // 1. Read the JSON body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  // 2. Check the body
  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const { text, profile: givenProfile } = parsedBody.data;

  // 3. Get a profile: either given directly, or extracted from text
  let profile: Profile | null = null;

  if (givenProfile) {
    profile = givenProfile;
  } 
    else if (text) {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    if (isRateLimited(ip, 2, 60000)) {
      return Response.json(
        { error: "Too many requests, please wait a minute" },
        { status: 429 }
      );
    }

    try {
      profile = await extractProfile(text);
    } catch(error) {
      console.error("extractProfile failed:", error);
      return Response.json({ error: "AI service is unavailable" }, { status: 502 });
    }
  }
    
  else {
    return Response.json({ error: "Send either text or profile" }, { status: 400 });
  }

  if (!profile) {
    return Response.json(
      { error: "Could not understand the description, please rephrase" },
      { status: 422 }
    );
  }

  // 4. Ask for missing key details
  const missing = [];
  if (profile.age === undefined) {
    missing.push("age");
  }
  if (profile.state === undefined) {
    missing.push("state");
  }
  if (missing.length > 0) {
    return Response.json({ needsMoreInfo: true, missing: missing, profile: profile });
  }

  // 5. Load schemes and keep the eligible ones
  const schemes = await prisma.scheme.findMany({
    include: { documents: true },
  });

  const matches = [];
  for (const scheme of schemes) {
    if (isEligible(profile, scheme)) {
      matches.push(scheme);
    }
  }

  return Response.json({ profile: profile, count: matches.length, matches: matches });
}