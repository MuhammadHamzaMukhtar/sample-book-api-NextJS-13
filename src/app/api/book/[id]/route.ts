import query from "@/app/neondb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const id = url.pathname.split("/")[3];

  const result = await query(
    `SELECT id,name,type,available FROM  book WHERE id=${id}`
  );

  if(!result) throw new Error('Unable to find book');
  return NextResponse.json(result);
}
