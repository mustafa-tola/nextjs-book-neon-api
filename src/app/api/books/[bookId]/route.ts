import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: {
        bookId: string;
    }
}
export async function GET(req: NextRequest, { params: { bookId } }: Props): Promise<NextResponse> {
    let query = `select * from books where id = ${bookId}`;
    const books = await sql.unsafe(query);
    if (books.length <= 0) {
        return NextResponse.json({ message: `No book with id ${bookId} available` })
    }
    else {
        return NextResponse.json(books);
    }
}