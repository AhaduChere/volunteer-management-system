import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // DB CHECK

  if (!user) { //user not found in DB
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ success: true, userId: user.id });
}
