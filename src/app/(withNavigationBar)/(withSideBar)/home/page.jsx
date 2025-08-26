import React from "react";
import Button from "@/app/components/Button";
import RecentChats from "../@recentchats/page";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
const layout = async () => {
  return (
    <main className="col-span-8 text-black">
      <Link
        href="/contacts"
        className="bg-blue-500 block w-fit mt-40 mb-8 mx-auto text-white rounded-sm p-4 text-2xl hover:bg-blue-400"
      >
        go to contacts
      </Link>
      <Image src="/add-contacts.svg" width={300} height={300} className="mx-auto" alt="add-contacts"></Image>
    </main>
  );
};

export default layout;
