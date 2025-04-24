import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL
    const searchParams = req.nextUrl.searchParams;
    const nik = searchParams.get("nik");
    const cookie = searchParams.get("cookie");
    const apiUrl = `${baseURL}/api/get/user?nik=${nik}`;
    const response = await fetch(apiUrl, {
      headers: {
        Cookie: `${cookie}`,
      },
    });
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.message || "Something went wrong.");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
