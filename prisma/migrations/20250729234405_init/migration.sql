/*
  Warnings:

  - You are about to drop the column `a_id` on the `ContactInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[c_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `c_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_a_id_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "c_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "a_id";

-- CreateIndex
CREATE UNIQUE INDEX "Address_c_id_key" ON "Address"("c_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_a_id_fkey" FOREIGN KEY ("a_id") REFERENCES "ContactInfo"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;
