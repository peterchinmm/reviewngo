import { CreateMessageInput, CreateMessageSchema } from "@/lib/validations/message.schema";
import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getErrorResponse } from "@/lib/helpers";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const forumId = searchParams.get("forumId");
  try {
    const messages = await prisma.message.findMany({
      where: {
        ...(forumId ? { forumId: forumId as string } : {}),
      },
      include: {
        forum: {
          include: {
            createdBy: {
              include: {
                student: true,
                lecturer: true,
              },
            },
          },
        },
        sentBy: {
          include: {
            student: true,
            lecturer: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as CreateMessageInput;
		const data = CreateMessageSchema.parse(body);

		const message = await prisma.message.create({
			data: {
				forumId: data.forumId,
				message: data.message,
				userId: data.userId
			},
		});

		if (message) {
			return new NextResponse(
				JSON.stringify({
					status: "Message sent",
					data: { message },
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
