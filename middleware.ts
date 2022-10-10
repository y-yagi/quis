import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  if (
    process.env.BASIC_AUTH_USER === undefined ||
    process.env.BASIC_AUTH_PASSWORD === undefined
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue).toString("base64").split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl;
  url.pathname = "/api/auth";
  return NextResponse.rewrite(url);
};
