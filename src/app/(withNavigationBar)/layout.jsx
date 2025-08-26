import React from "react";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import Link from "next/link";
import { cookies } from "next/headers";
import { logOutUser } from "../actions/users.js";
import { redirect } from "next/navigation";
const layout = async ({ children }) => {
  let cookieStore = await cookies();
  let id = cookieStore.get("id")
  if(!id)redirect("/signup")
  id=id.value
  return (
    <>
      <nav className="flex justify-between p-4 bg-blue-200 border-b-3 border-gray-200">
        <span className="flex items-center text-blue-500 font-bold text-xl">
          Whatsapp Clone
        </span>
            <form action={logOutUser}>
              <button type="submit" className={`rounded-sm w-[30vw] text-white p-2 text-center bg-blue-500 hover:bg-blue-400 cursor-pointer`}>Log Out</button>
            </form>
      </nav>
      <div className="overflow-y-hidden h-[90vh]">
        <div className="lg:mx-10">{children}</div>
        <nav className="flex justify-around fixed bottom-0 left-0 w-full bg-blue-200">
          <LinkButton href="/home">Home</LinkButton>
          <LinkButton href="/contacts">contacts</LinkButton>
          <LinkButton href="/contacts-form">Add contacts</LinkButton>
        </nav>
      </div>
    </>
  );
};

export default layout;
