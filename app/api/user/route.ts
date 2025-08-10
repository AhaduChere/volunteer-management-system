import {prisma} from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){
        const users = await prisma.user.findMany({
            include: {
                Volunteer: true
            }
        });
        if(users){
            return NextResponse.json({users},{status: 200});
        }else {
            return NextResponse.json({error: 'Something went wrong'},{status: 500});
        }
}
        
    

export async function POST(req: NextRequest){
    const body = await req.json();
    const { username, password, role } = body;

    if(!username || !password || !role){
        return NextResponse.json({error: 'Variable(s) not found'},{status: 404});
    }

    const user = await prisma.user.create({
        data: {
            role: role,
            username: username,
            pass: password
        }
    });

    if(user){
        return NextResponse.json({user},{status: 200});
    }else {
        return NextResponse.json({error: 'Something went wrong'},{status: 500});
    }
}