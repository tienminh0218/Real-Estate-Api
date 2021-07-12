/*
  Warnings:

  - You are about to drop the column `boughtBy` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `nameCategory` on the `categoryProperty` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[companyName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectName]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameCategory]` on the table `categoryProperty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment_Broker" DROP CONSTRAINT "Comment_Broker_userId_fkey1";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_userId_fkey1";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "boughtBy";

-- AlterTable
ALTER TABLE "categoryProperty" ALTER COLUMN "nameCategory" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Company.companyName_unique" ON "Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_unique" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project.projectName_unique" ON "Project"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "categoryProperty.nameCategory_unique" ON "categoryProperty"("nameCategory");

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Broker" ADD FOREIGN KEY ("brokerId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
