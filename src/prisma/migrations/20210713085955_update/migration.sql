/*
  Warnings:

  - Added the required column `userId` to the `categoryProperty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoryProperty" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categoryProperty" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
