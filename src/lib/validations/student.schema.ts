import { z } from "zod";

const phoneRegex = new RegExp(
	/^(0)(1)[0-46-9]*[0-9]{7,8}$/g
);

export const RegisterStudentSchema = z.object({
	firstName: z.string({
		required_error: "First Name is required",
	})
	.min(1, "First Name is required"),

	lastName: z.string({
		required_error: "Last Name is required",
	})
	.min(1, "Last Name is required"),

	phoneNo: z.string({
		required_error: "Phone Number is required",
	})
	.min(1, "Phone Number is required")
	.regex(phoneRegex, "Invalid Phone Number"),

	matricNo: z.string({
		required_error: "Matric Number is required",
	})
	.min(1, "Matric Number is required"),
	
	userId: z.string({
		required_error: "User ID is required",
	})
	.min(1, "User ID is required"), 

	programCodeId: z.string({
		required_error: "Program Code is required",
	})
	.min(1, "Program Code is required")
})

export const UpdateStudentSchema = z.object({
	firstName: z.string()
	.min(1, "First Name is required"),

	lastName: z.string()
	.min(1, "Last Name is required"),

	phoneNo: z.string()
	.min(1, "Phone Number is required")
	.regex(phoneRegex, "Invalid Phone Number"),

})

export const UpdateStudentImageSchema = z.object({
	img: z.string(),
})

export type RegisterStudentInput = z.infer<typeof RegisterStudentSchema>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
export type UpdateStudentImageInput = z.infer<typeof UpdateStudentImageSchema>;