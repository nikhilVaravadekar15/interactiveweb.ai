import messageService from "@/service/messageService";
import sitesService from "@/service/sitesService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, resonse: Response) {
  try {
    const url: URL = new URL(request.url);
    const id: string | null = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const data = await messageService.getAllMessageBySid(id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
