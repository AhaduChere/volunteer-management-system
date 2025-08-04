-- DropForeignKey
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_a_id_fkey";

-- DropForeignKey
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_v_id_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContactInfo" DROP CONSTRAINT "EmergencyContactInfo_v_id_fkey";

-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerInfo" DROP CONSTRAINT "VolunteerInfo_v_id_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerOppurtunity" DROP CONSTRAINT "VolunteerOppurtunity_o_id_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerOppurtunity" DROP CONSTRAINT "VolunteerOppurtunity_v_id_fkey";

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("u_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerInfo" ADD CONSTRAINT "VolunteerInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerOppurtunity" ADD CONSTRAINT "VolunteerOppurtunity_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerOppurtunity" ADD CONSTRAINT "VolunteerOppurtunity_o_id_fkey" FOREIGN KEY ("o_id") REFERENCES "Oppurtunity"("opp_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_a_id_fkey" FOREIGN KEY ("a_id") REFERENCES "Address"("a_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE CASCADE ON UPDATE CASCADE;
