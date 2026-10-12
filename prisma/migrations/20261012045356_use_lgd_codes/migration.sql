/*
  Warnings:

  - You are about to drop the column `code` on the `Jurisdiction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lgdCode]` on the table `Jurisdiction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lgdCode` to the `Jurisdiction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Jurisdiction_code_key";

-- AlterTable
ALTER TABLE "Jurisdiction" DROP COLUMN "code",
ADD COLUMN     "lgdCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Jurisdiction_lgdCode_key" ON "Jurisdiction"("lgdCode");
