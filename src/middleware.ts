// middleware.ts
import { NextResponse } from 'next/server'

const allowedOrigins = ['http://localhost:3001', 'https://www.google.com']
// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
  const origin = request.headers.get('origin');
  console.log('!allowedOrigins.includes', allowedOrigins.includes('origin'))
  if(origin && !allowedOrigins.includes('origin')){
    console.log('origin', origin)
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request!",
      headers: {
        "Content-type": "text/plain"
      }
    })
  }
  // return NextResponse.redirect(new URL('/book', request.url))
  // return NextResponse.json({Error: 'Middleware Applied!'})
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}