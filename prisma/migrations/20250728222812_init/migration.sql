-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_user_id_fkey";

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("u_id") ON DELETE SET NULL ON UPDATE CASCADE;
