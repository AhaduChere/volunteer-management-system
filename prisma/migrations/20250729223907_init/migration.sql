/*
  Warnings:

  - You are about to drop the `Oppurtunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VolunteerOppurtunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VolunteerOppurtunity" DROP CONSTRAINT "VolunteerOppurtunity_o_id_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerOppurtunity" DROP CONSTRAINT "VolunteerOppurtunity_v_id_fkey";

-- DropTable
DROP TABLE "Oppurtunity";

-- DropTable
DROP TABLE "VolunteerOppurtunity";

-- CreateTable
CREATE TABLE "Opportunity" (
    "opp_id" SERIAL NOT NULL,
    "center_name" TEXT NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("opp_id")
);

-- CreateTable
CREATE TABLE "VolunteerOpportunity" (
    "vo_id" SERIAL NOT NULL,
    "v_id" INTEGER NOT NULL,
    "o_id" INTEGER NOT NULL,

    CONSTRAINT "VolunteerOpportunity_pkey" PRIMARY KEY ("vo_id")
);

-- AddForeignKey
ALTER TABLE "VolunteerOpportunity" ADD CONSTRAINT "VolunteerOpportunity_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerOpportunity" ADD CONSTRAINT "VolunteerOpportunity_o_id_fkey" FOREIGN KEY ("o_id") REFERENCES "Opportunity"("opp_id") ON DELETE CASCADE ON UPDATE CASCADE;
