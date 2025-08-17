import {prisma} from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

    export async function GET(){
            const opportunities = await prisma.opportunity.findMany();
            if(opportunities){
                return NextResponse.json({opportunities},{status: 200});
            }else {
                return NextResponse.json({error: 'Something went wrong'},{status: 500});
            }
    }
        
    

    export async function POST(req: NextRequest){
        const body = await req.json();
        const { centerName, title } = body;

        if(!centerName || !title ){
            return NextResponse.json({error: 'Variable not found'},{status: 404});
        }

        const oppurtunity = await prisma.opportunity.create({
            data: {
                center_name: centerName ? centerName : null,
                title: title
            }
        });

        if(oppurtunity){
            return NextResponse.json({oppurtunity},{status: 200});
        }else {
            return NextResponse.json({error: 'Something went wrong'},{status: 500});
        }
    }