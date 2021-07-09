/*
  Warnings:

  - You are about to drop the column `userBeCommented` on the `Comment_Broker` table. All the data in the column will be lost.
  - You are about to drop the column `userBeCommented` on the `Comment_Company` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Comment_Project` table. All the data in the column will be lost.
  - You are about to drop the column `userBeCommented` on the `Comment_Project` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Comment_Property` table. All the data in the column will be lost.
  - You are about to drop the column `userBeCommented` on the `Comment_Property` table. All the data in the column will be lost.
  - You are about to drop the column `coordinates` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoryProperty` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brokerBeCommented` to the `Comment_Broker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyBeCommented` to the `Comment_Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectBeCommented` to the `Comment_Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyBeCommented` to the `Comment_Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brokerId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment_Project" DROP CONSTRAINT "Comment_Project_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Comment_Property" DROP CONSTRAINT "Comment_Property_userId_fkey1";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_categoryId_fkey";

-- AlterTable
ALTER TABLE "Comment_Broker" DROP COLUMN "userBeCommented",
ADD COLUMN     "brokerBeCommented" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Company" DROP COLUMN "userBeCommented",
ADD COLUMN     "companyBeCommented" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Project" DROP COLUMN "projectId",
DROP COLUMN "userBeCommented",
ADD COLUMN     "projectBeCommented" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment_Property" DROP COLUMN "propertyId",
DROP COLUMN "userBeCommented",
ADD COLUMN     "propertyBeCommented" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "coordinates",
DROP COLUMN "location",
DROP COLUMN "projectName",
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "companyName" VARCHAR(255),
ADD COLUMN     "district" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "brokerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "district";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "categoryProperty";

-- CreateTable
CREATE TABLE "Broker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category_Property" (
    "id" TEXT NOT NULL,
    "nameCategory" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Broker_userId_unique" ON "Broker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_unique" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "News_authorId_unique" ON "News"("authorId");

-- AddForeignKey
ALTER TABLE "Broker" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY ("categoryId") REFERENCES "Category_Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD FOREIGN KEY ("userId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD FOREIGN KEY ("authorId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
