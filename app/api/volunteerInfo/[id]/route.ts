import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

//Gets all volunteer info of a specific volunteer
//Params: The volunteer's id
export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const volunteerInfo = await prisma.volunteerInfo.findUnique(
            {
                where: {v_id: Number(id)}
            }
        );

        if(volunteerInfo == null){
            return NextResponse.json({error: 'Volunteer Information not found'},{status: 404});
        }
    
        return NextResponse.json({volunteerInfo},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
        
}


//Updates the skills, licenses, and avail_times array. No other attributes can be updated
//Params: The volunteer's id
export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { skills, availTimes, licenses } = body;
    const params = await context.params;
    const id = params.id

    const volunteerInfo = await prisma.volunteerInfo.findUnique(
        {
            where: {v_id: Number(id)},
            select: {
                skills: true,
                avail_times: true,
                licenses: true
            }
        }
    );

    if(volunteerInfo == null){
        return NextResponse.json({error: 'Volunteer Information not found'},{status: 404});
    }

    let updateData: any = {};

    if (skills !== undefined) {
        updateData.skills = Array.from(new Set([...(volunteerInfo.skills ?? []), ...skills]));
      }
      
      if (availTimes !== undefined) {
        updateData.avail_times = Array.from(new Set([...(volunteerInfo.avail_times ?? []), ...availTimes]));
      }
      
      if (licenses !== undefined) {
        updateData.licenses = Array.from(new Set([...(volunteerInfo.licenses ?? []), ...licenses]));
      }

    if(Reflect.ownKeys(updateData).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 404 });
    }

    try{
        const updatedVolunteerInfo = await prisma.volunteerInfo.update({
            where: {
                v_id: Number(id)
            },
            data: updateData   
        });

        if(updatedVolunteerInfo){
            return NextResponse.json({ updatedVolunteerInfo },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update volunteer' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }
}