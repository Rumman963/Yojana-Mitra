-- CreateEnum
CREATE TYPE "JurisdictionType" AS ENUM ('STATE', 'UNION_TERRITORY');

-- CreateTable
CREATE TABLE "Jurisdiction" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHi" TEXT,
    "type" "JurisdictionType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jurisdiction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jurisdiction_code_key" ON "Jurisdiction"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Jurisdiction_nameEn_key" ON "Jurisdiction"("nameEn");
