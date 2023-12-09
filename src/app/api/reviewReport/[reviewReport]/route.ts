import { getErrorResponse } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import {
  ReviewReportInput,
  ReviewReportSchema,
} from "@/lib/validations/reviewReport.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { reviewReport: string } }
) {
  try {
    const reviewReportId = params.reviewReport;
    const body = (await req.json()) as ReviewReportInput;
    const data = ReviewReportSchema.parse(body);

    const reviewReport = await prisma.reviewReport.update({
      where: { id: reviewReportId },
      data: {
        titleScore: data.titleScore,
        objectiveScore: data.objectiveScore,
        problemStatementScore: data.problemStatementScore,
        projectScopeScore: data.projectScopeScore,
        methodologyScore: data.methodologyScore,
        projectPlanScore: data.projectPlanScore,
        remarks: data.remarks,
        overallScore: data.overallScore,
        reviewed: true,
      },
    });

    if (reviewReport) {
      const check = await prisma.reviewReport.findMany({
        where: { paperId: reviewReport.paperId },
      });

      if (check[0].reviewed && check[1].reviewed) {
        const status1 = check[0].overallScore;
        const status2 = check[1].overallScore;

        if (
          status1 === "MAJOR_REVISION" ||
          status1 === "RESUBMISSION_REQUIRED" ||
          status2 === "MAJOR_REVISION" ||
          status2 === "RESUBMISSION_REQUIRED"
        ) {
          const paper = await prisma.paper.update({
            where: { id: reviewReport.paperId },
            data: {
              status: "RESUBMISSION",
            },
          });
        } else {
          const paper = await prisma.paper.update({
            where: { id: reviewReport.paperId },
            data: {
              status: "ACCEPTED",
            },
          });
        }
      } else {
        const paper = await prisma.paper.update({
          where: { id: reviewReport.paperId },
          data: {
            status: "REVIEWING",
          },
        });
      }

      return new NextResponse(
        JSON.stringify({
          status: "success",
          data: { reviewReport },
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
