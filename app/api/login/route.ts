// app/api/login/route.ts
import { NextResponse } from "next/server"
import { db } from "@/app/db"
import { usersTable } from "@/app/db/schema"

export async function POST(req: Request) {
	const { email, password } = await req.json()
	const result = await db.insert(usersTable).values({ email, password }).returning()
	return NextResponse.json(result)
}