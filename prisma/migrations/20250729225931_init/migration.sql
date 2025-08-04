/*
  Warnings:

  - You are about to drop the `_OpportunityToVolunteer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OpportunityToVolunteer" DROP CONSTRAINT "_OpportunityToVolunteer_A_fkey";

-- DropForeignKey
ALTER TABLE "_OpportunityToVolunteer" DROP CONSTRAINT "_OpportunityToVolunteer_B_fkey";

-- DropTable
DROP TABLE "_OpportunityToVolunteer";

-- CreateTable
CREATE TABLE "_VolunteerOpportunities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VolunteerOpportunities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VolunteerOpportunities_B_index" ON "_VolunteerOpportunities"("B");

-- AddForeignKey
ALTER TABLE "_VolunteerOpportunities" ADD CONSTRAINT "_VolunteerOpportunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Opportunity"("opp_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VolunteerOpportunities" ADD CONSTRAINT "_VolunteerOpportunities_B_fkey" FOREIGN KEY ("B") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;
