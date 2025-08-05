import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { action, username, password, token } = await req.json();
    const tokenkey = process.env.JWT!;
    if (action === "login") {
      const user = await prisma.user.findFirst({
        where: {
          username,
          pass: password,
        },
      });
      if (!user || user.pass !== password || user.role !== 1) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      const jwtToken = jwt.sign({ userId: user.u_id }, tokenkey, { expiresIn: "7d" });
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
