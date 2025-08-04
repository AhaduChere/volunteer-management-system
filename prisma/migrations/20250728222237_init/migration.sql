-- CreateTable
CREATE TABLE "User" (
    "u_id" SERIAL NOT NULL,
    "role" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "v_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "f_name" TEXT NOT NULL,
    "l_name" TEXT NOT NULL,
    "approval_status" BOOLEAN NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("v_id")
);

-- CreateTable
CREATE TABLE "VolunteerInfo" (
    "i_id" SERIAL NOT NULL,
    "v_id" INTEGER NOT NULL,
    "skills" TEXT[],
    "avail_times" TEXT[],
    "ed_background" TEXT NOT NULL,
    "licenses" TEXT[],
    "ss_number" BOOLEAN NOT NULL,
    "driver_license" BOOLEAN NOT NULL,

    CONSTRAINT "VolunteerInfo_pkey" PRIMARY KEY ("i_id")
);

-- CreateTable
CREATE TABLE "Oppurtunity" (
    "opp_id" SERIAL NOT NULL,
    "center_name" TEXT NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oppurtunity_pkey" PRIMARY KEY ("opp_id")
);

-- CreateTable
CREATE TABLE "VolunteerOppurtunity" (
    "vo_id" SERIAL NOT NULL,
    "v_id" INTEGER NOT NULL,
    "o_id" INTEGER NOT NULL,

    CONSTRAINT "VolunteerOppurtunity_pkey" PRIMARY KEY ("vo_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "a_id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("a_id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "c_id" SERIAL NOT NULL,
    "v_id" INTEGER NOT NULL,
    "a_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "EmergencyContactInfo" (
    "ec_id" SERIAL NOT NULL,
    "v_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmergencyContactInfo_pkey" PRIMARY KEY ("ec_id")
);

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerInfo" ADD CONSTRAINT "VolunteerInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerOppurtunity" ADD CONSTRAINT "VolunteerOppurtunity_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerOppurtunity" ADD CONSTRAINT "VolunteerOppurtunity_o_id_fkey" FOREIGN KEY ("o_id") REFERENCES "Oppurtunity"("opp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_a_id_fkey" FOREIGN KEY ("a_id") REFERENCES "Address"("a_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_v_id_fkey" FOREIGN KEY ("v_id") REFERENCES "Volunteer"("v_id") ON DELETE RESTRICT ON UPDATE CASCADE;
