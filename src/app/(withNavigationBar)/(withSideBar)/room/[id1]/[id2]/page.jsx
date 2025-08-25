import React from "react";
import MessageClient from "./MessageClient";
import { getMessages } from "@/app/actions/message.js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { manageRoom } from "./formActions.js";
const page = async ({ params }) => {
  let cookieStore = await cookies();
  if (!cookieStore.get("id")) redirect("/");

  let id = Number(cookieStore.get("id").value);
  let contactId;
  let { id1, id2 } = await params;
  id1=Number(id1)
  id2=Number(id2)
  if (id == id1) contactId = id2;
  else {
    contactId = id1;
  }
  manageRoom(contactId);

  let { messages, users } = await getMessages(contactId);

  return (
    <div className="col-span-8">
      <MessageClient
        messages={messages}
        id={id}
        contactId={contactId}
        users={users}
      />
    </div>
  );
};

export default page;
