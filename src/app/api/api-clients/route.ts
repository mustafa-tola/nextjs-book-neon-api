import { SignJWT } from "jose";
import { BookRequest } from "../../../../types/request";
import { NextResponse } from "next/server";
import sql from "@/app/dbConn";

export async function POST(req: Request) {
    const {clientName, clientEmail}: Partial<BookRequest> = await req.json();
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 604800; // seven days

    await sql.unsafe(`insert into customers (name,email) values ('${clientName}','${clientEmail}')`)

    let token = await new SignJWT({clientName,clientEmail})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode('secret'));
    return NextResponse.json({token});
}