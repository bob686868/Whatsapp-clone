"use client";

import React from "react";
import SquareUserCard from "@/app/components/SquareUserCard";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { getContactsByName } from "@/app/actions/contacts.js";
import Link from "next/link";
const ContactsSection = () => {
  let [query, setQuery] = useState("");
  let [isPending, setIsPending] = useState(false);
  let [contacts, setContacts] = useState([]);
  let [hasFinished, setHasFinished] = useState(true);
  useEffect(() => {
    let id = setTimeout(async () => {
      const fetchData = async () => {
        setIsPending(true);
        const res = await getContactsByName(query);
        setContacts(res.contacts || []);
        setIsPending(false);
      };
      fetchData();
    }, 300);
    return () => clearTimeout(id);
  }, [query]);
  return (
    <>
      <h1 className="font-bold text-2xl lg:text-3xl mt-3 border-b-2 w-fit mx-auto p-2 mb-5">
        My Contacts
      </h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        setHasFinished={setHasFinished}
      />

      {isPending && (
        <div className="mt-2 text-center font-bold">Searching...</div>
      )}
      <div className="grid grid-cols-9 gap-3">
        {contacts.length > 0 ? (
          contacts.map((u) => (
            <SquareUserCard
              key={u.id}
              contactId={u.id}
              name={u.name}
              bio={u.bio}
              phoneNumber={u.phoneNumber}
              isContact={true}
            />
          ))
        ) : !isPending ? (
          <div className="text-xl col-span-9 font-bold text-center">
            No contacts found
            {query == "" && hasFinished && (
              <Link
                href="/contacts-form"
                className="block w-fit mx-auto text-white rounded-sm p-2 mt-3 hover:bg-blue-400 bg-blue-500 "
              >
                Add Contacts
              </Link>
            )}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default ContactsSection;
