import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const programCode = await prisma.programCode.findMany()
	
		return new NextResponse(
			JSON.stringify(programCode),
			{status: 200}
		);
	} catch(err){
		console.error(err);

		return new NextResponse(
			JSON.stringify({message: "Something went wrong!"}),
			{status: 500}
		)
	}
};



