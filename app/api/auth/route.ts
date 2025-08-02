import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { token } = await req.json();
  const secret = process.env.JWT;
  if (!secret) throw new Error("JWT is not defined");

  try {
    jwt.verify(token, secret);
    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
