import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const emergencyContactInfo = await prisma.emergencyContactInfo.findUnique(
            {
                where: {v_id: Number(id)}
            }
        );

        if(emergencyContactInfo == null){
            return NextResponse.json({error: 'Emergency Contact Information not found'},{status: 404});
        }
    
        return NextResponse.json({emergencyContactInfo},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }     
}

export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { first_name, last_name, phone, email } = body;
    const params = await context.params;
    const id = params.id

    const emergencyContactInfo = await prisma.emergencyContactInfo.findUnique(
        {
            where: {v_id: Number(id)},
        }
    );


    let updateData: any = {};

    if (first_name !== undefined) {
        updateData.first_name = first_name;
      }
      
      if (last_name !== undefined) {
        updateData.last_name = last_name;
      }
      
      if (phone !== undefined) {
        updateData.phone = phone;
      }

      if (email !== undefined) {
        updateData.email = email;
      }

    if(Reflect.ownKeys(updateData).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 400 });
    }

    try{
        const updatedEmergencyContactInfo = await prisma.emergencyContactInfo.upsert({
            where: {
                v_id: Number(id)
            },
            update: updateData,
            create:  {
                ...updateData,
                volunteer: {
                connect: { v_id: Number(id) }
                }  
            }
        });

        if(updatedEmergencyContactInfo){
            return NextResponse.json({ updatedEmergencyContactInfo },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update Emergency Contact' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }
}