import {prisma} from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
//TODO: Add User Authentication

async function findUser(id:number){
    try{
        const user = await prisma.user.findUnique(
            {
                where: {u_id: id}
            }
        );

        return user? user: null;   
    }catch(err){
        console.error(err);
        return NextResponse.json({error: 'Something went Wrong'},{status: 500});
    }
}

export async function GET(req:NextRequest, context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    try{
        const user = await findUser(Number(id));

        if(user == null){
            return NextResponse.json({error: 'User not found'},{status: 404});
        }
    
        return NextResponse.json({user},{status: 200});
    }catch(err){
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
        
}

export async function DELETE(req:NextRequest,  context: { params: { id: string } }){
    const params = await context.params;
    const id = params.id

    const user = await findUser(Number(id));

    if(user == null){
        return NextResponse.json({error: 'User not found'},{status: 404});
    }
    

    try{
        const deletedUser = await prisma.user.delete({
            where: {
                u_id: Number(id)
            }
        });

        if(deletedUser){
            return NextResponse.json({ message: 'Deleted successfully', deletedUser });
        }else {
            return NextResponse.json({ error: 'Failed to delete user' },{ status: 400 });
        }

        
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry somthing went wrong' },{ status: 500 });
    }
}

export async function PATCH(req:NextRequest, context: { params: { id: string } }){
    const body = await req.json();
    const { username } = body;
    const params = await context.params;
    const id = params.id

    const user = await findUser(Number(id));

    if(user == null){
        return NextResponse.json({error: 'User not found'},{status: 404});
    }

    let updateData: any = {};

    if(username !== undefined){
        updateData.username = username;
    }

    if(Reflect.ownKeys(updateData).length === 0){
        return NextResponse.json({ error: 'Missing Input' },{ status: 400 });
    }

    try{
        const updatedUser = await prisma.user.update({
            where: {
                u_id: Number(id)
            },
            data: updateData   
        });

        if(updatedUser){
            return NextResponse.json({ updatedUser },{ status: 200 });
        }else {
            return NextResponse.json({ error: 'Failed to update user' },{ status: 400 });
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Sorry something went wrong' },{ status: 500 });
    }


}