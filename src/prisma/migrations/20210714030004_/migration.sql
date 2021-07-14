-- AlterTable
ALTER TABLE "categoryProperty" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "categoryProperty" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
