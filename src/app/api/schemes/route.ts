import {prisma} from "@/lib/db_client"

export async function GET(){
    const schemes = await prisma.scheme.findMany({
        include:{documents: true},
        orderBy: {nameEn: "asc"},
    });

    return Response.json(schemes);
}