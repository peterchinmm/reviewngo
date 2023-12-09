import { z } from "zod";

export const CreateForumSchema = z.object({
    title: z.string({
        required_error: "Forum title is required"
    }),
    
    message: z.string({
        required_error: "Plese write your first message"
    }),

    userId: z.string({
        required_error: "User is required"
    })
});

export type CreateForumInput = z.infer<typeof CreateForumSchema>;