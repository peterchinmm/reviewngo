import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { RegisterLecturerInput, RegisterLecturerSchema } from "@/lib/validations/lecturer.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as RegisterLecturerInput;
		const data = RegisterLecturerSchema.parse(body);

		const lecturer = await prisma.lecturer.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNo: data.phoneNo,
				expertise: data.expertise,
				userId: data.userId,
				googleScholarLink: data.googleScholarLink
			},
		});

		const user = await prisma.user.update({
			where: {id: data.userId},
			data: {profileCompleted: true}
		})

		return new NextResponse(
			JSON.stringify({
				status: "success",
				data: { lecturer, user },
			}),
			{
				status: 201,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error: any) {
		if (error instanceof ZodError) {
			return getErrorResponse(400, "Failed validation", error);
		}

		return getErrorResponse(500, error.message);
	}
}

export async function GET() {
	try {
		const lecturers = await prisma.lecturer.findMany()
	
		return new NextResponse(
			JSON.stringify(lecturers),
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