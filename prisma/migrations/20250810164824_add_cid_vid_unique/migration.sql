/*
  Warnings:

  - A unique constraint covering the columns `[v_id]` on the table `ContactInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[c_id,v_id]` on the table `ContactInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[v_id]` on the table `EmergencyContactInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_a_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_v_id_key" ON "ContactInfo"("v_id");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_c_id_v_id_key" ON "ContactInfo"("c_id", "v_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContactInfo_v_id_key" ON "EmergencyContactInfo"("v_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "ContactInfo"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;
