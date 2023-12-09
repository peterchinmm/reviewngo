import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { CreateForumInput, CreateForumSchema } from "@/lib/validations/forum.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as CreateForumInput;
		const data = CreateForumSchema.parse(body);

		const forum = await prisma.forum.create({
			data: {
				title: data.title,
				userId: data.userId
			},
		});

		if (forum) {
			const message = await prisma.message.create({
				data: {
					forumId: forum.id,
					message: data.message,
					userId: data.userId
				}
			})

			return new NextResponse(
				JSON.stringify({
					status: "Forum created",
					data: { forum, message },
				}),
				{
					status: 201,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

	} catch (error: any) {
		if (error instanceof ZodError) {
			return getErrorResponse(400, "Failed validation", error);
		}

		return getErrorResponse(500, error.message);
	}
}

export async function GET() {
	try {
		const forums = await prisma.forum.findMany({
			include: {
				createdBy: {
					include: {
						student: true,
						lecturer: true
					}
				}
			}
		})
	
		return new NextResponse(
			JSON.stringify(forums),
			{status: 200}
		);
	} catch(err){
		console.error(err);

		return new NextResponse(
			JSON.stringify({message: "Something went wrong!"}),
			{status: 500}
		)
	}
};