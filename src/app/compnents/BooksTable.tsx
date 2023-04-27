import React, { useEffect } from "react";


async function getBooks() {
  const res = await fetch("http://localhost:3000/api/book");
  if (!res.ok) throw new Error("Unable to fetch books");
  return res.json();
}

export default async function BooksTable() {

  useEffect = () => {

  }
  
  const books = await getBooks();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Edit</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book: any) => (
          <tr key={book.id}>
            <td className="border px-4 py-2">{book.title}</td>
            <td className="border px-4 py-2">{book.description}</td>
            <td className="border px-4 py-2">{book.created_at}</td>
            <td className="border px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Edit
              </button>
            </td>
            <td className="border px-4 py-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
