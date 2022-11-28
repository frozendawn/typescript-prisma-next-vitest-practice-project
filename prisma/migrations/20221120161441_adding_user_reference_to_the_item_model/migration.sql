/*
  Warnings:

  - Added the required column `userRefId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userRefId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
