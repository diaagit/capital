/*
  Warnings:

  - Added the required column `bank_name` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BankName" AS ENUM ('yesbank', 'bob', 'hdfc', 'icic', 'kotak');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "bank_name" "BankName" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "bank_name" "BankName";
