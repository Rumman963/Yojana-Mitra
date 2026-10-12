-- CreateEnum
CREATE TYPE "SchemeStatus" AS ENUM ('DRAFT', 'VERIFIED', 'RETIRED');

-- AlterTable
ALTER TABLE "Scheme" ADD COLUMN     "jurisdictionId" INTEGER,
ADD COLUMN     "status" "SchemeStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "SchemeSource" (
    "id" SERIAL NOT NULL,
    "schemeId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "supports" TEXT NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemeSource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scheme" ADD CONSTRAINT "Scheme_jurisdictionId_fkey" FOREIGN KEY ("jurisdictionId") REFERENCES "Jurisdiction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeSource" ADD CONSTRAINT "SchemeSource_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
