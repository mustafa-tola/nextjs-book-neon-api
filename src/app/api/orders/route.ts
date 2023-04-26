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
    await sql.unsafe(`insert into orders (bookId,custId,orderedAt,quantity) values (${bookId},${custId[0].id},'${formatted}',1)`);
    const orderId = await sql.unsafe(`select id from orders where bookId = ${bookId} and custId = ${custId[0].id} and orderedat = '${formatted}'`)
    return NextResponse.json({message: "Order Successfully Created",orderId: orderId[0].id},{status:200})
}

export async function GET(req: NextRequest) {
    let query = `select * from orders`;
    const orders = await sql.unsafe(query);
    if (orders.length <= 0) {
        return NextResponse.json({ message: `No orders available` })
    }
    else {
        return NextResponse.json(orders);
    }
}