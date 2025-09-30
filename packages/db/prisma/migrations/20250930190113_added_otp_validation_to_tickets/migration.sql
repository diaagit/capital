-- AlterEnum
ALTER TYPE "public"."OTPPurpose" ADD VALUE 'ticket_validation';

-- AlterTable
ALTER TABLE "public"."Otp" ADD COLUMN     "ticketId" TEXT,
ADD COLUMN     "ticketVerificationId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Otp" ADD CONSTRAINT "Otp_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Otp" ADD CONSTRAINT "Otp_ticketVerificationId_fkey" FOREIGN KEY ("ticketVerificationId") REFERENCES "public"."TicketVerification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
