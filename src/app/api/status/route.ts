import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export function GET(req: NextRequest):NextResponse {
    return NextResponse.json({
        message: "Welcome to Simple Neon Books API"
    }, {
        status: 200
    })
}