// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";

export async function GET() {
	const users = await db.select().from(usersTable);
	return NextResponse.json(users);
}