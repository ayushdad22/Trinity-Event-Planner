import { NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/users-store"

export async function POST(req: NextRequest) {
  const { name, email, password, accountType } = await req.json()

  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 })
  }

  users.push({ name, email, password, accountType })
  return NextResponse.json({ success: true })
}