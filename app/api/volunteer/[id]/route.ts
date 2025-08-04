import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function findVolunteer(id:number){
    try{
        const volunteer = await prisma.volunteer.findUnique(
            {
                where: {v_id: id}
            }
        );

        return volunteer? volunteer: null;   
    }catch(err){
        console.error(err);
        return NextResponse.json({error: 'Something went Wrong'},{status: 500});
    }
}

export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const volunteer = await findVolunteer(Number(id));

        if(volunteer == null){
            return NextResponse.json({error: 'Volunteer not found'},{status: 404});
        }
    
        return NextResponse.json({volunteer},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
        
}

export async function DELETE(req:NextRequest,  context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    const volunteer = await findVolunteer(Number(id));

    if(volunteer == null){
        return NextResponse.json({error: 'Volunteer not found'},{status: 404});
    }
    

    try{
        const deletedVolunteer = await prisma.volunteer.delete({
            where: {
                v_id: Number(id)
            }
        });

        if(deletedVolunteer){
            return NextResponse.json({ message: 'Deleted successfully', deletedVolunteer });
        }else {
            return NextResponse.json({ error: 'Failed to delete volunteer' },{ status: 400 });
        }

        
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
}

export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { userId, fName, lName, approvalStatus } = body;
    const params = await context.params;
    const id = params.id

    const volunteer = await findVolunteer(Number(id));

    if(volunteer == null){
        return NextResponse.json({error: 'Volunteer not found'},{status: 404});
    }

    let updateData: any = {};

    console.log(userId + ' ' + fName + ' ' + lName + ' ' + approvalStatus);

    if(userId !== undefined){
        updateData.user_id = userId;
    }if(fName !== undefined){
        updateData.f_name = fName;
    }if(lName !== undefined){
        updateData.l_name = lName;
    }if(approvalStatus !== undefined){
        updateData.approval_status = approvalStatus;
    }

    if(Reflect.ownKeys(updateData).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 400 });
    }

    console.log(updateData);

    try{
        const updatedVolunteer = await prisma.volunteer.update({
            where: {
                v_id: Number(id)
            },
            data: updateData   
        });

        if(updatedVolunteer){
            return NextResponse.json({ updatedVolunteer },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update volunteer' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }


}