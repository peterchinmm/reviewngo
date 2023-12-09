import { z } from "zod";

export const NewPaperSchema = z.object({
  title: z
	.string({
	  required_error: "Paper Title is required",
	})
	.min(1, "Paper Title is required"),

  studentId: z
	.string({
	  required_error: "Student ID is required",
	})
	.min(1, "Student ID is required"),

  lecturerId: z
	.string({
	  required_error: "Supervisor is required",
	})
	.min(1, "Supervisor is required"),

	file: z
	.string({
		required_error: "Supervisor is required",
	  })
	  .min(1, "Supervisor is required"),
  keywords: z
	.array(
	  z
		.string({
		  required_error: "Keywords are required",
		})
		.min(1, "Keywords are required")
	)
	.min(1, "Keywords are required"),
});

export type NewPaperInput = z.infer<typeof NewPaperSchema>;
