import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: {
        orderId: string;
    }
}
export async function GET(req: NextRequest,{params: {orderId}}:Props) {
    let query = `select * from orders where id = ${orderId}`;
    const books = await sql.unsafe(query);
    if (books.length <= 0) {
        return NextResponse.json({ message: `No order with id ${orderId} available` })
    }
    else {
        return NextResponse.json(books);
    }
}