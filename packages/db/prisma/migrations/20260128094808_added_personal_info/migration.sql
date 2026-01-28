/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "DOB" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE INDEX "User_email_phone_number_idx" ON "User"("email", "phone_number");
