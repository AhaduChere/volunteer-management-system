import {prisma} from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
//TODO: Need to figure out how to connect oppurtunities, volunteer info,and contact info

    export async function GET(){
            const volunteers = await prisma.volunteer.findMany({
                include: {
                    Opportunity: true,
                    VolunteerInfo: true,
                    ContactInfo: true
                }
            });
            if(volunteers){
                return NextResponse.json({volunteers},{status: 200});
            }else {
                return NextResponse.json({error: 'Something went wrong'},{status: 500});
            }
    }
        
    

    export async function POST(req: NextRequest){
        const body = await req.json();
        const { userId, fName, lName, approvalStatus, skills, availTimes, edBackground, licenses, ssNumber, driverLicense, phone, email } = body;

        if(!fName || !lName || !approvalStatus || !skills || !availTimes || !edBackground || !licenses || !ssNumber || !driverLicense || !phone || !email){
            return NextResponse.json({error: 'Variable(s) not found'},{status: 404});
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
                        email: email
                    }
                }
            },
            include: {
                VolunteerInfo: true,
                ContactInfo: true
            }
        });

        if(volunteer){
            return NextResponse.json({volunteer},{status: 200});
        }else {
            return NextResponse.json({error: 'Something went wrong'},{status: 500});
        }
    }