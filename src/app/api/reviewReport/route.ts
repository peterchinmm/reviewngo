import { NewPaperInput, NewPaperSchema } from "@/lib/validations/paper.schema";
import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";

// ADMIN GET ALL PAPERS
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lecturerId = searchParams.get("lecturerId");
  const paperId = searchParams.get("paperId");
  try {
    const papers = await prisma.reviewReport.findMany({
      where: {
        ...(lecturerId ? { lecturerId: lecturerId as string } : {}),
        ...(paperId ? { paperId: paperId as string } : {}),
      },
      include: {
        papers: {
          include: {
            submittedBy: true,
          },
        },
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
