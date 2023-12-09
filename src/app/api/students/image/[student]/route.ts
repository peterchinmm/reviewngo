import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import {
  UpdateStudentImageInput,
  UpdateStudentImageSchema,
} from "@/lib/validations/student.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { student: string } }
) {
  try {
    const studentId = params.student;
    const body = (await req.json()) as UpdateStudentImageInput;
    const data = UpdateStudentImageSchema.parse(body);

    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        img: data.img,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { student },
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
