import React from "react";
import Button from "@/app/components/Button";
import RecentChats from "../@recentchats/page";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const layout = async () => {
  return (
    <main className="col-span-8 text-black">
      <Link
        href="/contacts"
        className="bg-blue-500 block w-fit mt-60 mx-auto text-white rounded-sm p-4 text-xl hover:bg-blue-400"
      >
        go to contacts
      </Link>
    </main>
  );
};

export default layout;
