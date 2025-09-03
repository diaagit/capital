-- AlterEnum
ALTER TYPE "public"."TransactionType" ADD VALUE 'Initiate';

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "token" TEXT;
