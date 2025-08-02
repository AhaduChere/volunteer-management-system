import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { action, username, password, token } = await req.json();
  const tokenkey = process.env.JWT;
  if (!tokenkey) throw new Error("JWT key not found");

  if (action === "login") {
    console.log(username + password);
    // Replace UserID with real DB check
    const UserID = 1;
    const jwtToken = jwt.sign({ userId: UserID }, tokenkey, { expiresIn: "7d" });
    return NextResponse.json({ token: jwtToken });
  }

  if (action === "verify") {
    try {
      jwt.verify(token, tokenkey);
      return NextResponse.json({ valid: true });
    } catch {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
