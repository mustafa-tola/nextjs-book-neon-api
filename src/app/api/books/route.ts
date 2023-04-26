import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let query = "select * from books";
    if (req.nextUrl.searchParams.has("bookType")) {
        const type = req.nextUrl.searchParams.get("bookType") as string;
        const upperedType = (type.charAt(0)).toUpperCase() + (type.slice(1));
        query += ` where type = '${upperedType}'`
    }
    if (req.nextUrl.searchParams.has("bookLimit")) {
        const limit = parseInt(req.nextUrl.searchParams.get("bookLimit") as string);
        if (limit >= 1 && limit <= 20) {
            query += ` limit ${limit}`
        }
        else {
            return NextResponse.json({message: "Books Request limit should be between 1 and 20"},{status: 400});
        }
    }
    const books = await sql.unsafe(query);
    return NextResponse.json(books);
}