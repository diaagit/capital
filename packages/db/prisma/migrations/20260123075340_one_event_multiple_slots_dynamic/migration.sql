/*
  Warnings:

  - You are about to drop the column `location_name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location_url` on the `Event` table. All the data in the column will be lost.
  - Added the required column `event_date` to the `EventSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_name` to the `EventSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location_name",
DROP COLUMN "location_url",
ADD COLUMN     "hero_image_url" TEXT;

-- AlterTable
ALTER TABLE "EventSlot" ADD COLUMN     "event_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location_name" TEXT NOT NULL,
ADD COLUMN     "location_url" TEXT;
