// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: { id: string } }) {
	const { email, password } = await request.json();
	const params = await Promise.resolve(context.params);
	const id = Number(params.id);
	const result = await db
		.update(usersTable)
		.set({ email, password })
		.where(eq(usersTable.id, id))
		.returning();
	return NextResponse.json(result);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
	const params = await Promise.resolve(context.params);
	const id = Number(params.id);
	const result = await db
		.delete(usersTable)
		.where(eq(usersTable.id, id))
		.returning();
	return NextResponse.json(result);
}