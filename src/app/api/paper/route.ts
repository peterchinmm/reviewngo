import { NewPaperInput, NewPaperSchema } from "@/lib/validations/paper.schema";
import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";

// ADMIN GET ALL PAPERS
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  try {
    const papers = await prisma.paper.findMany({
      where: {
        ...(studentId ? { studentId: studentId as string } : {}),
      },
    });

    return new NextResponse(JSON.stringify(papers), { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

// STUDENT CREATE NEW PAPER
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewPaperInput;
    const data = NewPaperSchema.parse(body);

    const paper = await prisma.paper.create({
      data: {
        title: data.title,
        studentId: data.studentId,
        lecturerId: data.lecturerId,
        file: data.file,
        keywords: data.keywords,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { paper },
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
