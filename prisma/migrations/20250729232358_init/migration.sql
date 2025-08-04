/*
  Warnings:

  - A unique constraint covering the columns `[v_id]` on the table `VolunteerInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VolunteerInfo_v_id_key" ON "VolunteerInfo"("v_id");
