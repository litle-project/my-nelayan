import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL
    const body = await req.json(); // assuming JSON body
    const apiUrl = `${baseURL}/web/session/authenticate`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
          db: process.env.NEXT_PUBLIC_DB,
          login: body.email,
          password: body.password,
        },
      }),
    });

    const res = await response.json();
    if (res.error) throw new Error("Something went wrong.");

    const data = response.headers.getSetCookie();
    
    return NextResponse.json({
      result: {
        cookies: data[0],
        email: res.result.username,
        name: res.result.name,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
