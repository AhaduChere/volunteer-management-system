import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function findContactInfo(id:number){
    try{
        const contactInfo = await prisma.contactInfo.findUnique(
            {
                where: {v_id: Number(id)},
                include: {
                    Address: true
                }
            }
        );

        return contactInfo? contactInfo: null;   
    }catch(err){
        console.error(err);
        return null;
    }
}

export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const contactInfo = await findContactInfo(Number(id));

        if(contactInfo == null){
            return NextResponse.json({error: 'Contact info not found'},{status: 404});
        }
    
        return NextResponse.json({contactInfo},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
        
}

export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { phone, email, address, city, state, zip } = body;
    const params = await context.params;
    const id = params.id;
    let contactId: Number = 0;

    const contactInfo = await findContactInfo(Number(id));

    if(contactInfo == null){
        return NextResponse.json({error: 'Contact Info not found'},{status: 404});
    }else {
        contactId = contactInfo.c_id
    }

    let updateData: any = {};
    let updateAddress: any = {};

    if(phone !== undefined){
        updateData.phone = phone;
    }if(email !== undefined){
        updateData.email = email;
    }if(address !== undefined){
        updateAddress.address = address;
    }if(city !== undefined){
        updateAddress.city = city;
    }if(state !== undefined){
        updateAddress.state = state;
    }if(zip !== undefined){
        updateAddress.zip = zip;
    }

    if(Reflect.ownKeys(updateData).length === 0 || Reflect.ownKeys(updateAddress).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 400 });
    }

    try{
        const updatedContactInfo = await prisma.contactInfo.update({
            where: {
              v_id: Number(id)
            },
            data: {
              ...updateData,
              Address: {
                update: {
                  where: { c_id: contactId }, 
                  data: {
                    ...updateAddress
                  }
                }
              }
            }
          });

        if(updatedContactInfo){
            return NextResponse.json({ updatedContactInfo },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update contact info' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }


}