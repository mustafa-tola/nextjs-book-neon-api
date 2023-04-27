import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";
import { BookRequest } from "../../../../../types/request";

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

export async function PATCH(req: NextRequest,{params:{orderId}}:Props) {
    // const body = await req.json();
    // if(Object.keys(body).length == 0) {
    //     return NextResponse.json({ message: `No order with id ${orderId} available` }, { status: 400 });
    // }
    const { customerName }: Partial<BookRequest> = await req.json();
    const order = await sql.unsafe(`select * from orders where id = ${orderId}`);
    if (order.length <= 0) {
        return NextResponse.json({ message: `No order with id ${orderId} available` }, { status: 400 });
    }
    const custId = await sql.unsafe(`select id from customers where name = '${customerName}'`);
    await sql.unsafe(`update orders set custId = ${custId[0].id} where id = ${orderId}`)
    return NextResponse.json({message: "Order updated successfully"},{status: 200}); 
}

export async function DELETE(req: NextRequest,{params:{orderId}}:Props) {
    const order = await sql.unsafe(`select * from orders where id = ${orderId}`);
    if(order.length <= 0) {
        return NextResponse.json({message: "No order available"},{status: 400})
    }
    await sql.unsafe(`delete from orders where id = ${orderId}`);
    return NextResponse.json({message: "Order Deleted Successfully"},{status: 200})
}