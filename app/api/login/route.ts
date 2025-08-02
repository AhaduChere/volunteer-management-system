import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log(username + password);
  const secret = process.env.JWT;
  if (!secret) throw new Error('JWT is not defined');
  const UserID = 1;
  const token = jwt.sign({ userId: UserID }, secret, { expiresIn: '7d' });
  return NextResponse.json({ token: token }, { headers: { "Content-Type": "application/json" } });
}
