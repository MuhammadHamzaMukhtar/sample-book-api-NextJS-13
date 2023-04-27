import currentDateTime from "@/Helper/currentDate";
import generateRandomString from "@/Helper/generateRandomString";
import query from "@/app/neondb";
import { NextRequest, NextResponse } from "next/server";

const accessToken = generateRandomString(16);
const currentDate = currentDateTime;

export async function POST(request: NextRequest){
    const req = await request.json();
    if(req.username && req.password){
        await query(`INSERT INTO users(username, password, accessToken, created_at) VALUES('${req.username}', '${req.password}', '${accessToken}', '${currentDate}')`);
        return NextResponse.json({
            Message: 'User Added Successfully!',
            username: req.username,
            accessToken: accessToken,
        })  
    } else {
        return NextResponse.json('Missing Email or Password', {
            status: 403,
            statusText: 'Validation Error!'
        })
    }
}