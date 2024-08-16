import sitesService from "@/service/sitesService";
import { NextResponse } from "next/server";

export async function GET(request: Request, resonse: Response) {
  try {
    const data = await sitesService.getAll();
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
