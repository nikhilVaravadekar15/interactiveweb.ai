import { inputFormSchema } from "@/zod";
import { TInputFormSchema } from "@/types";
import sitesService from "@/service/sitesService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request, resonse: Response) {
  try {
    const res: TInputFormSchema = await request.json();
    if (!res || !res?.url) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const status = inputFormSchema.safeParse({
      url: res?.url,
    });
    if (!res || !status.success) {
      return NextResponse.json({ error: "Invalid Url" }, { status: 400 });
    }

    // const { id } = await sitesService.create({ url: res.url });
    // if (!id) {
    //   throw new Error();
    // }

    return NextResponse.json(
      {
        id: "id",
        message: "Created",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

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

    const data = await sitesService.getUrlById(id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, resonse: Response) {
  try {
    const url: URL = new URL(request.url);
    const id: string | null = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const data = await sitesService.delete(id);
    console.info(data);
    if (!data || data.affectedRows != 1) {
      throw new Error();
    }

    return NextResponse.json(
      {
        id: id,
        message: "Successfully deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
