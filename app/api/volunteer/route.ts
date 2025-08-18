import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const volunteers = await prisma.volunteer.findMany();
  if (volunteers) {
    return NextResponse.json({ volunteers }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, fName, lName, approvalStatus, skills, availTimes, edBackground, licenses, ssNumber, driverLicense, phone, email, ecPhone, ecEmail, ecFirstName, ecLastName, address, city, state, zip } = body;

  if (
    !fName ||
    !lName ||
    !approvalStatus ||
    !edBackground ||
    !phone ||
    !email ||
    !ecPhone ||
    !ecEmail ||
    !ecFirstName ||
    !ecLastName ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !skills?.length ||
    !availTimes?.length ||
    !licenses?.length ||
    ssNumber === undefined ||
    driverLicense === undefined
  ) {
    return NextResponse.json(
      { error: "Variable(s) not found" },
      { status: 404 }
    );
  }

  const volunteer = await prisma.volunteer.create({
    data: {
      user_id: userId ? userId : null,
      f_name: fName,
      l_name: lName,
      approval_status: approvalStatus,
      VolunteerInfo: {
        create: {
          skills: skills,
          avail_times: availTimes,
          ed_background: edBackground,
          licenses: licenses,
          ss_number: ssNumber,
          driver_license: driverLicense
        }
      },
      ContactInfo: {
        create: {
          phone: phone,
          email: email,
          Address: {
            create: [{
              address: address,
              city: city,
              state: state,
              zip: zip
            }]
          }
        }
      },
      EmergencyContactInfo: {
        create: {
          first_name: ecFirstName,
          last_name: ecLastName,
          phone: ecPhone,
          email: ecEmail
        }
      }
    },
    include: {
      VolunteerInfo: true,
      ContactInfo: {
        include: {
          Address: true
        }
      },
      EmergencyContactInfo: true
    }
  });

  if (volunteer) {
    return NextResponse.json({ volunteer }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
