import query from "@/app/neondb";
import { NextRequest, NextResponse } from "next/server";
import { limiter } from "../config/limiter";

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');

  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests!",
    });
  }

  const url = request.nextUrl;
  if (url.searchParams.has("id")) {
    const book_id = url.searchParams.get("id");
    const result = await query(
      `SELECT id,name,type,available FROM  book WHERE id=${book_id}`
    );
    return NextResponse.json(result);
  }
  
  const result = await query("SELECT * FROM book  ");

  // return NextResponse.json(result);
  return new NextResponse(JSON.stringify(result), {
    headers: {
      "Access-Control-Allow-Origin" : origin || '*'
    }
  })
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  if (req.title && req.description && req.created_at) {
    const result = await query(
      `INSERT INTO books(title, description, created_at) VALUES('${req.title}', '${req.description}','${req.created_at}')`
    );
    return NextResponse.json({
      Message: "Your book has been stored",
      data: result,
      RequestType: "POST",
    });
  } else {
    return NextResponse.json({
      Error: "Title is required",
    });
  }
}

export async function PUT(request: NextRequest) {
  const req = await request.json();
  if (req.id) {
    const result = await query(
      `UPDATE books SET title = '${req.title}', description = '${req.description}', updated_at = '${req.updated_at}' WHERE id=${req.id}`
    );
    if (!result) {
      return NextResponse.json({
        Message: "No Book find with this ID",
      });
    }
    return NextResponse.json({
      Message: `Updated ${req.title} successfully!`,
      RequestType: "PUT",
    });
  } else {
    return NextResponse.json({
      Message: "Missing Book ID",
    });
  }
}

// INSERT INTO orders (book_id, created_at) VALUES ('${req['book_id']}', '${req['created_at']}');

// SELECT * FROM orders INNER JOIN books ON orders . book_id === books . id;

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  if (url.searchParams.has("id")) {
    const book_id = url.searchParams.get("id");
    console.log(book_id);
    await query(`DELETE FROM books WHERE id = ${book_id}`);
    return NextResponse.json({
      Message: "Book deleted successfully!",
      RequestType: "DELETE",
    });
  } else {
    return NextResponse.json({
      Message: "Missing Book ID!",
    });
  }
}
