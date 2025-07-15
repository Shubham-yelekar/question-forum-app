import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error in waiting",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
