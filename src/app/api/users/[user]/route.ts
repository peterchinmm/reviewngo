import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    const user = await prisma.user.findUnique({ where: { id: params.user } });

    return new NextResponse(
      JSON.stringify(user),
      {status: 200}
    );
  } catch(err) {
    console.error(err);

    return new NextResponse(
      JSON.stringify({message: "Something went wrong!"}),
      {status: 500}
    )
  }
}
