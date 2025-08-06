import {prisma} from '@/../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

    export async function GET(){
            const contactInfo = await prisma.contactInfo.findMany({
                include: {
                    Address: true
                }
            });
            if(contactInfo){
                return NextResponse.json({contactInfo},{status: 200});
            }else {
                return NextResponse.json({error: 'Something went wrong'},{status: 500});
            }
    }