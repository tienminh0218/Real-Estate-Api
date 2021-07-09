/*
  Warnings:

  - You are about to drop the column `brokerBeCommented` on the `Comment_Broker` table. All the data in the column will be lost.
  - You are about to drop the column `companyBeCommented` on the `Comment_Company` table. All the data in the column will be lost.
  - You are about to drop the column `projectBeCommented` on the `Comment_Project` table. All the data in the column will be lost.
  - You are about to drop the column `propertyBeCommented` on the `Comment_Property` table. All the data in the column will be lost.
  - You are about to drop the column `coordinates` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Category_Property` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brokerId` to the `Comment_Broker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Comment_Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Comment_Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Comment_Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `propertyId` to the `Comment_Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Comment_Property` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `city` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_categoryId_fkey";

-- AlterTable
ALTER TABLE "Comment_Broker" DROP COLUMN "brokerBeCommented",
ADD COLUMN     "brokerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Company" DROP COLUMN "companyBeCommented",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Project" DROP COLUMN "projectBeCommented",
ADD COLUMN     "projectId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Property" DROP COLUMN "propertyBeCommented",
ADD COLUMN     "propertyId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "coordinates",
DROP COLUMN "location",
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "district" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Category_Property";

-- CreateTable
CREATE TABLE "categoryProperty" (
    "id" TEXT NOT NULL,
    "nameCategory" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY ("categoryId") REFERENCES "categoryProperty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Broker" ADD FOREIGN KEY ("userId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Company" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Property" ADD FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Project" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
