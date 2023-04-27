import sql from "@/app/dbConn";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const customer = await sql.unsafe(`select * from customers where name = '${req.nextUrl.searchParams.get("name")}' and email = '${req.nextUrl.searchParams.get("email")}'`);
    if (customer.length <= 0) {
        return NextResponse.json({result: false});
    }
    return NextResponse.json({result: true});
}