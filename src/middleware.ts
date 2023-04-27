import { NextRequest, NextResponse } from "next/server";
import sql from "./app/dbConn";
import { jwtVerify } from "jose";
import { BookRequest } from "../types/request";

export async function middleware(req: NextRequest) {
    const token = req.headers.get("x-auth-token");
    // await gettingCustomers(token as string);
    if(await gettingCustomers(token as string)) {
        return NextResponse.next();
    }
    else {
        return NextResponse.json({message: "You are not registered in our server"},{status: 400})
    };
}

async function gettingCustomers(token: string):Promise<boolean> {
    let data;
    try {
        data = await jwtVerify(token,new TextEncoder().encode('secret'));
    }
    catch(err) {
        return false;
    }
    const isAvailable = await fetch(`http://localhost:3000/api/customers?name=${data.payload.clientName}&email=${data.payload.clientEmail}`,{
        method: "GET"
    });
    return (await isAvailable.json()).result;
}

export const config = {
    matcher: ["/api/orders/:path*"]
}