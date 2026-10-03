/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SchemeLevel" AS ENUM ('CENTRAL', 'STATE');

-- CreateEnum
CREATE TYPE "SchemeCategory" AS ENUM ('EDUCATION', 'AGRICULTURE', 'HEALTH', 'HOUSING', 'EMPLOYMENT', 'WOMEN_AND_CHILD', 'PENSION', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SocialCategory" AS ENUM ('GENERAL', 'OBC', 'SC', 'ST');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Scheme" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "SchemeLevel" NOT NULL,
    "state" TEXT,
    "category" "SchemeCategory" NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHi" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionHi" TEXT,
    "benefitEn" TEXT NOT NULL,
    "benefitHi" TEXT,
    "howToApplyEn" TEXT,
    "howToApplyHi" TEXT,
    "officialUrl" TEXT NOT NULL,
    "lastVerifiedAt" TIMESTAMP(3) NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "gender" "Gender",
    "maxAnnualIncome" INTEGER,
    "socialCategories" "SocialCategory"[],
    "occupations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_slug_key" ON "Scheme"("slug");
