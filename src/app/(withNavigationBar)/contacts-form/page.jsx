"use client";
import React from "react";
import { useActionState } from "react";
import { addContact } from "./actions";
const page = () => {
  let [state, formAction, isPending] = useActionState(addContact, {
    error: "",
  });
  console.log(state);
  let extraStyles = () => {
    return isPending
      ? "bg-gray-500 cursor-none"
      : " bg-blue-500 hover:bg-blue-300 ";
  };

  return (
    <>
      <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[60%] mx-auto rounded-md shadow-gray-800 p-5 py-7 bg-white">
        <form action={formAction} className="flex flex-col gap-y-2">
          <h1 className="font-bold text-center text-2xl mb-10">Add contacts</h1>
          <label htmlFor="num" className="block">
            Phone Number :
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="num"
            placeholder="123-456-789"
            className="mb-3 rounded-sm p-2 focus:outline-none border border-gray-200"
            required
          />
          <label htmlFor="name" className="block">
            Name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            className="mb-3 rounded-sm p-2 focus:outline-none  border border-gray-200"
            required
          />
          <button
            type="submit"
            className={`p-3 rounded-md text-white cursor-pointer mx-auto mb-1 ${extraStyles}`}
            disabled={isPending}
          >
            {isPending ? "Loading ..." : "Add Contact"}
          </button>
          {state.error && (
            <p className="text-red-500 text-sm text-center">{state.error}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default page;
