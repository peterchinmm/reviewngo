import USERTYPE from "@/constants/USERTYPE";
import { z } from "zod";

export const RegisterUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),

    password: z.string({
        required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
    
    confirmPassword: z.string({
        required_error: "Confirm your password",
    })
    .min(1, "Confirm your password"), 

    userType: z.nativeEnum(USERTYPE)
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const LoginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),

    password: z.string({
        required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),

    userType: z.nativeEnum(USERTYPE)
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;