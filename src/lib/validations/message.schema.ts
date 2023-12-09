import { z } from "zod";

export const CreateMessageSchema = z.object({
    forumId: z.string({
        required_error: "Forum ID is required"
    }),
    
    message: z.string({
        required_error: "Plese write your first message"
    }),

    userId: z.string({
        required_error: "User is required"
    })
});

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;