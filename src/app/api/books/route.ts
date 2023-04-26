import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest):Promise<NextResponse> {
    let query = "select * from books";
    if (req.nextUrl.searchParams.has("bookType")) {
        query += ` where type = '`
        const type = (req.nextUrl.searchParams.get("bookType") as string).split(" ");
        type.map((word) => query += word.charAt(0).toUpperCase() + word.slice(1) + " ");
        query = query.slice(0,query.length - 1) + "'"
        console.log(query);
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
    if (books.length <= 0) {
        return NextResponse.json({ message: `No books available` })
    }
    else {
        return NextResponse.json(books);
    }
}