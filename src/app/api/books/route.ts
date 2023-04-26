import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest):Promise<NextResponse> {
    const books = await sql.unsafe("select * from books");
    return NextResponse.json(books);
}