import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log(username + password);
  return NextResponse.json({ UserID: 1 }, { headers: { "Content-Type": "application/json" } });
}
