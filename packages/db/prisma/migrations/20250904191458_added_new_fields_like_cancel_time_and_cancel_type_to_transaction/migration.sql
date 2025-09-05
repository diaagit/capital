-- AlterEnum
ALTER TYPE "public"."TransactionType" ADD VALUE 'CANCEL';

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "canceled_at" TIMESTAMP(3);
