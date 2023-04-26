import sql from "@/app/dbConn";
import { BookRequest } from "../../../../types/request";
import { NextRequest, NextResponse } from "next/server";
import * as dateTime from "node-datetime";

export async function POST(req: NextRequest) {
    const { bookId, customerName }: Partial<BookRequest> = await req.json();
    const book = await sql.unsafe(`select * from books where id = ${bookId}`);
    if (book.length <= 0) {
        return NextResponse.json({ message: `No book with id ${bookId} available` }, { status: 400 });
    }
    const custId = await sql.unsafe(`select id from customers where name = '${customerName}'`);
    let dt = dateTime.create();
    let formatted = dt.format('Y-m-d H:M:S');
    const order = await sql.unsafe(`insert into orders (bookId,custId,orderedAt,quantity) values (${bookId},${custId[0].id},'${formatted}',1)`)
    return NextResponse.json({message: "Order Successfully Created"},{status:200})
}