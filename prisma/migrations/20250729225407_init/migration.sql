/*
  Warnings:

  - You are about to drop the `VolunteerOpportunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VolunteerOpportunity" DROP CONSTRAINT "VolunteerOpportunity_o_id_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerOpportunity" DROP CONSTRAINT "VolunteerOpportunity_v_id_fkey";

-- DropTable
DROP TABLE "VolunteerOpportunity";

-- CreateTable
CREATE TABLE "_OpportunityToVolunteer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OpportunityToVolunteer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OpportunityToVolunteer_B_index" ON "_OpportunityToVolunteer"("B");

-- AddForeignKey
ALTER TABLE "_OpportunityToVolunteer" ADD CONSTRAINT "_OpportunityToVolunteer_A_fkey" FOREIGN KEY ("A") REFERENCES "Opportunity"("opp_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpportunityToVolunteer" ADD CONSTRAINT "_OpportunityToVolunteer_B_fkey" FOREIGN KEY ("B") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;
