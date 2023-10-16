/*
  Warnings:

  - A unique constraint covering the columns `[sleeperUserId]` on the table `owners` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "owners" ADD COLUMN     "sleeperUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "owners_sleeperUserId_key" ON "owners"("sleeperUserId");
