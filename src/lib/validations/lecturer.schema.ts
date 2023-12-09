import { z } from "zod";

const phoneRegex = new RegExp(/^(0)(1)[0-46-9]*[0-9]{7,8}$/g);

export const RegisterLecturerSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(1, "First Name is required"),

  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .min(1, "Last Name is required"),

  phoneNo: z
    .string({
      required_error: "Phone Number is required",
    })
    .min(1, "Phone Number is required")
    .regex(phoneRegex, "Invalid Phone Number"),

  expertise: z
    .array(
      z
        .string({
          required_error: "Expertise is required",
        })
        .min(1, "Expertise is required")
    )
    .min(1, "Expertise is required"),

  userId: z
    .string({
      required_error: "User ID is required",
    })
    .min(1, "User ID is required"),

  googleScholarLink: z
    .string({
      required_error: "Google Scholar Profile Link is required",
    })
    .min(1, "Google Scholar Profile Link is required"),
});

export const UpdateLecturerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required"),

  lastName: z
    .string()
    .min(1, "Last Name is required"),

  phoneNo: z
    .string()
    .min(1, "Phone Number is required")
    .regex(phoneRegex, "Invalid Phone Number"),

  expertise: z
    .array(
      z
        .string()
        .min(1, "Expertise is required")
    )
    .min(1, "Expertise is required"),
});

export const UpdateLecturerImageSchema = z.object({
  img: z.string(),
})

export type RegisterLecturerInput = z.infer<typeof RegisterLecturerSchema>;
export type UpdateLecturerInput = z.infer<typeof UpdateLecturerSchema>;
export type UpdateLecturerImageInput = z.infer<typeof UpdateLecturerImageSchema>;
