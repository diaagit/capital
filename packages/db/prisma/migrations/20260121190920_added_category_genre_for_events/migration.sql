/*
  Warnings:

  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('movie', 'concert', 'sports', 'theatre', 'comedy', 'conference', 'workshop', 'exhibition', 'festival', 'other');

-- CreateEnum
CREATE TYPE "EventGenre" AS ENUM ('action', 'drama', 'comedy', 'romance', 'horror', 'thriller', 'sci_fi', 'fantasy', 'documentary', 'animation', 'classical', 'rock', 'pop', 'jazz', 'hip_hop', 'sports_general', 'other');

-- CreateEnum
CREATE TYPE "EventLanguage" AS ENUM ('english', 'hindi', 'marathi', 'spanish', 'french', 'german', 'japanese', 'korean', 'chinese', 'tamil', 'telugu', 'multi_language');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ISSUED', 'CANCELLED', 'USED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" "EventCategory" NOT NULL,
ADD COLUMN     "genre" "EventGenre",
ADD COLUMN     "is_online" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" "EventLanguage",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft',
ALTER COLUMN "location_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'ISSUED';

-- CreateIndex
CREATE INDEX "Event_category_idx" ON "Event"("category");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "EventSlot_eventId_idx" ON "EventSlot"("eventId");

-- CreateIndex
CREATE INDEX "Ticket_eventSlotId_idx" ON "Ticket"("eventSlotId");

-- CreateIndex
CREATE INDEX "Ticket_userId_idx" ON "Ticket"("userId");
