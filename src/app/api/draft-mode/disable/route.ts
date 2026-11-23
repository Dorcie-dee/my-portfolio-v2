import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/** Turns draft mode off and returns to the homepage (used by the "Exit preview" link). */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
