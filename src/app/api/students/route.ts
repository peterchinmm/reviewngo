import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { RegisterStudentInput, RegisterStudentSchema } from "@/lib/validations/student.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as RegisterStudentInput;
		const data = RegisterStudentSchema.parse(body);

		const student = await prisma.student.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				matricNo: data.matricNo,
				phoneNo: data.phoneNo,
				userId: data.userId,
				programCodeId: data.programCodeId
			},
		});

		const user = await prisma.user.update({
			where: {id: data.userId},
			data: {profileCompleted: true}
		})

		return new NextResponse(
			JSON.stringify({
				status: "success",
				data: { student, user },
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