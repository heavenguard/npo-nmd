// Create a new file: src/app/api/test-connection/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://api.pawapay.io/", {
            method: "HEAD",
            signal: AbortSignal.timeout(10000),
        });

        return NextResponse.json({
            status: "SUCCESS",
            message: "Can connect to Pawapay API",
            statusCode: response.status
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "FAILED",
            message: "Cannot connect to Pawapay API",
            error: error.message,
            code: error.cause?.code
        }, { status: 500 });
    }
}