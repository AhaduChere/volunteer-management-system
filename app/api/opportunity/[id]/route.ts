import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function findOpportunity(id:number){
    try{
        const opportunity = await prisma.opportunity.findUnique(
            {
                where: {opp_id: id}
            }
        );

        return opportunity? opportunity: null;   
    }catch(err){
        console.error(err);
        return NextResponse.json({error: 'Something went Wrong'},{status: 500});
    }
}

export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const opportunity = await findOpportunity(Number(id));

        if(opportunity == null){
            return NextResponse.json({error: 'Opportunity not found'},{status: 404});
        }
    
        return NextResponse.json({opportunity},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
        
}

export async function DELETE(req:NextRequest,  context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    const opportunity = await findOpportunity(Number(id));

    if(opportunity == null){
        return NextResponse.json({error: 'Opportunity not found'},{status: 404});
    }
    

    try{
        const deletedOpportunity = await prisma.opportunity.delete({
            where: {
                opp_id: Number(id)
            }
        });

        if(deletedOpportunity){
            return NextResponse.json({ message: 'Deleted successfully', deletedOpportunity });
        }else {
            return NextResponse.json({ error: 'Failed to delete opportunity' },{ status: 400 });
        }

        
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
}

export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { centerName } = body;
    const params = await context.params;
    const id = params.id

    const opportunity = await findOpportunity(Number(id));

    if(opportunity == null){
        return NextResponse.json({error: 'Opportunity not found'},{status: 404});
    }

    let updateData: any = {};

    if(centerName !== undefined){
        updateData.center_name = centerName;
    }

    if(Reflect.ownKeys(updateData).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 400 });
    }

    console.log(updateData);

    try{
        const updatedOpportunity = await prisma.opportunity.update({
            where: {
                opp_id: Number(id)
            },
            data: updateData   
        });

        if(updatedOpportunity){
            return NextResponse.json({ updatedOpportunity },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update opportunity' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }


}