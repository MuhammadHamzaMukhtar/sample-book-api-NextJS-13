import currentDateTime from "@/Helper/currentDate";
// import generateRandomString from "@/Helper/generateRandomString";
import query from "@/app/neondb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
// import { signIn } from "next-auth/react";
// const accessToken = generateRandomString(16);
const currentDate = currentDateTime;

export async function POST(request: NextRequest) {
  const req = await request.json();
  if (req.username && req.password) {
    const dbUser = await query(
      `SELECT * FROM users WHERE username='${req.username}'`
    );
    if (dbUser.length > 0) {
      return new NextResponse("Username already exists!", {
        status: 403,
        statusText: "Validation Error!",
      });
    } else {
      const token = jwt.sign(
        {
          username: req.username,
          password: req.password,
        },
        process.env.JWT_SECRET_KEY || "jwtsecretkey",
        {
          expiresIn: "2h",
        }
      );
      hash(req.password, 10, async function (err, hash) {
        if (!err && hash) {
          await query(
            `INSERT INTO users(username, password, created_at, accessToken) VALUES('${req.username}', '${hash}', '${currentDate}', '${token}')`
          );
        } else {
          return NextResponse.json(
            {
              Message: "Oops! Something went wrong",
            },
            {
              status: 401,
              statusText: "Validation Error!",
            }
          );
        }
      });
      return NextResponse.json({
        Message: "User Logged In Successfully!",
        username: req.username,
        token: token,
      });
    }
  } else {
    return new NextResponse("Missing Email or Password", {
      status: 403,
      statusText: "Validation Error!",
    });
  }
}
