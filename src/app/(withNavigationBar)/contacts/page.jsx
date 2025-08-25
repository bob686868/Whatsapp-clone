import React from "react";
import ContactsSection from "./ContactsSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Contacts = async () => {
  return (
    <div className="flex flex-col gap-y-10 px-5">
      <ContactsSection></ContactsSection>
      {/* <h1 className="font-bold text-lg border-b-2 w-fit mx-auto p-2 mb-5 ">
        All users
      </h1>
      <div className="grid grid-cols-9 gap-3">
        {users.map((u) => (
        <SquareUserCard
        key={u.id}
          contactId={u.id}
          name={u.name}
          bio={u.bio}
          phoneNumber={u.phoneNumber}
           isContact={contactIds.has(u.id)}        />
      ))}
      </div> */}
    </div>
  );
};

export default Contacts;
