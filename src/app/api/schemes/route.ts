import {prisma} from "@/lib/db_client";
import type { Prisma } from "@/generated/prisma/client";
import {z} from "zod";
import { SchemeCategory } from "@/generated/prisma/enums"


const querySchema = z.object({
      state: z.string().min(1).optional(),
      category:z.enum(SchemeCategory).optional(),
})
export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    
    const parsed = querySchema.safeParse({
    state: searchParams.get("state") ?? undefined,
    category: searchParams.get("category") ?? undefined,
  });

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid query", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { state, category } = parsed.data;

  const where: Prisma.SchemeWhereInput = {};

  if (category){
    where.category = category;
  }

  if (state){
    where.OR = [
        {
        state:state
    },
    {
        level: "CENTRAL"
    }
]
  }

  const schemes = await prisma.scheme.findMany({
    where: where , 
    include: { documents: true },
    orderBy: { nameEn: "asc" },
  });

  return Response.json(schemes);
}