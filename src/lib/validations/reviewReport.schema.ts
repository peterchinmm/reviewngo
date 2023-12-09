import REVIEW_SCORE from "@/constants/REVIEW_SCORE";
import PAPER_RESULT from "@/constants/PAPER_RESULT";
import { z } from "zod";

export const ReviewReportSchema = z.object({
    titleScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Title Score is required"
    }),
    objectiveScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Objective Score is required"
    }),
    problemStatementScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Problem Statement Score is required"
    }),
    projectScopeScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Project Scope Score is required"
    }),
    methodologyScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Methodology Score is required"
    }),
    projectPlanScore: z.nativeEnum(REVIEW_SCORE, {
        required_error: "Project Plan Score is required"
    }),
    remarks: z.string({
        required_error: "Remarks is required"
    }),
    overallScore: z.nativeEnum(PAPER_RESULT, {
        required_error: "Please provide a grading to this paper"
    })
});

export type ReviewReportInput = z.infer<typeof ReviewReportSchema>;