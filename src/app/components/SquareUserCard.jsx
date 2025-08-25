import React from "react";
import Button from "./Button";
import { redirect } from "next/navigation";
import { addToContacts } from "../actions/contacts";
import Image from "next/image";
import { message, addContact } from "./serverActions";
// let cookieStore=await cookies()
// let id=cookieStore.get("id")
// async function message(contactId) {
//   "use server";
//   return redirect(`/room/${id}/${contactId}`);
// }
// async function addContact(contactId) {
//   "use server"
//   let result = await addToContacts(contactId);
//   if (!result.status == 200) return alert("an error happened");
//   revalidatePath("/contacts");
// }
const SquareUserCard = ({ contactId, name, bio, phoneNumber, isContact }) => {
  return (
    <div className="col-span-3 bg-blue-100 rounded-sm p-3">
      <Image
        src="/avatar.jpg"
        alt="avatar image"
        width={80}
        height={80}
        className="rounded-full mx-auto mb-3 border-b-2 "
      />
      <h1 className="font-bold text-teal-500 text-center p-2">{name}</h1>
      <p className="text-center text-gray-500 mb-1">{bio}</p>
      {isContact ? (
        <form action={message} className="text-center mt-3 flex flex-col ">
          <input type="hidden" name="contactId" value={contactId} />
          <Button>Message</Button>
        </form>
      ) : (
        <form action={addContact} className="flex justify-center ">
          <input type="hidden" name="phoneNumber" value={phoneNumber} />
          <input type="hidden" name="name" value={name} />
          <Button>Add to contacts</Button>
        </form>
      )}
      <div className="text-center mt-3 flex flex-col ">
        <span className="text-gray-500 text-sm">phone number:</span>
        {phoneNumber}
      </div>
    </div>
  );
};

export default SquareUserCard;
