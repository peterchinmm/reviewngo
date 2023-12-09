import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { paper: string } }
) {
  try {
    const paper = await prisma.paper.findUnique({ where: { id: params.paper } });

    return new NextResponse(
      JSON.stringify(paper),
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
