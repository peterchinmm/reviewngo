import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { UpdateLecturerInput, UpdateLecturerSchema } from "@/lib/validations/lecturer.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: NextRequest, { params }: { params: { lecturer: string } }) {
	try {
		const lecturerId = params.lecturer;
		const body = (await req.json()) as UpdateLecturerInput;
		const data = UpdateLecturerSchema.parse(body);

		const lecturer = await prisma.lecturer.update({
			where: {id: lecturerId},
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNo: data.phoneNo,
				expertise: data.expertise
			},
		});

		return new NextResponse(
			JSON.stringify({
				status: "success",
				data: {lecturer},
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