// middleware.ts
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// const allowedOrigins = ["http://localhost:3002", "https://www.google.com"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const origin = request.headers.get("origin");
  // console.log("!allowedOrigins.includes", allowedOrigins.includes("origin"));
  // if (origin && !allowedOrigins.includes("origin")) {
  //   console.log("origin", origin);
  const accessToken = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");
  if (accessToken) {
    verify(
      accessToken,
      process.env.JWT_SECRET_KEY || "jwtsecret",
      function (err, decoded) {
        if (!err && decoded) {
          return NextResponse.next();
        } else {
          return NextResponse.json(
            {
              message: "Oops, something went wrong",
            },
            {
              status: 401,
              statusText: "Unauthorized",
            }
          );
        }
      }
    );
  }
  return NextResponse.json(
    {
      message: "Bad Request!",
    },
    {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-type": "text/plain",
      },
    }
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/book/:path*",
};
