"use client";
import React, { useReducer } from "react";

function reducer(state: any, action: any){
  if(action.type === 'changeTitle'){

  }
}

export default function AddForm() {
  const [state, dispatch] = useReducer(reducer, {title: '', description: ''})
  return (
    <form className="w-full justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-center items-center">
        <p className="text-3xl items-center"> Add new Book </p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" name="title" onChange={() => {
            dispatch({ type: 'changeTitle' })
          }}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Desription
        </label>
        <input
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add
        </button>
      </div>
    </form>
  );
}
