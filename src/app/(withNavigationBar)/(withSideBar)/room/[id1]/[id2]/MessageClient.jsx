"use client";
import React, { useEffect, useState, useOptimistic } from "react";
import {
  addMessage,
  deleteMessage,
  getMessages,
} from "@/app/actions/message.js";
import { addNewMessage } from "./formActions.js";
import DeleteButton from "@/app/(withNavigationBar)/(withSideBar)/room/[id1]/[id2]/DeleteButton";
import Header from "./Header.jsx";

const MessageClient = ({ messages, id, contactId, users }) => {
  function extraStyles(senderId) {
    if (senderId == id) return "ml-auto bg-blue-500 text-white";
    return "mr-auto bg-gray-100 text-black";
  }
  async function addHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("content");

    setOptimisticMessages({ type: "add", content, senderId: id });

    await addNewMessage(content, contactId);
    e.target.reset();
  }

  function optimisticHandler(prevMessages, action) {
    switch (action.type) {
      case "add":
        return [
          ...prevMessages,
          {
            id: `temp-${Date.now()}`,
            content: action.content,
            senderId: action.senderId,
          },
        ];
      case "delete":
        return prevMessages.filter((m) => m.id !== action.id);
      default:
        return prevMessages;
    }
  }
  let [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    optimisticHandler
  );

  const getContactName = () =>
    users && users.filter((m) => m.id == contactId)[0].name;
  return (
    <div className="min-h-[90vh] flex flex-col overflow-y-hidden ">
      <Header contactId={contactId} name={getContactName()}></Header>

      <div className="flex flex-col min-h-[68.5vh] max-h-[68.5vh] mt-2">
        <section className="flex-1 overflow-y-auto min-h-full">
          {optimisticMessages ? (
            optimisticMessages.map((m) => (
              <div key={m.id} className="mb-2">
                <div
                  className={`px-4 py-1 max-w-[70%] w-fit rounded-md ${extraStyles(
                    m.senderId
                  )}`}
                >
                  <p>{m.content}</p>
                </div>
                {m.senderId == id && (
                  <DeleteButton
                    messageId={m.id}
                    contactId={contactId}
                    setOptimisticMessages={setOptimisticMessages}
                  />
                )}
              </div>
            ))
          ) : (
            <div>No messages available</div>
          )}
        </section>
      </div>
      <form
        onSubmit={addHandler}
        className="bg-blue-200 border-b-2 border-b-gray-200 flex"
      >
        <input
          type="text"
          name="content"
          className="focus:outline-none min-w-[55%] rounded-sm  bg-blue-500  text-white p-1 px-2 placeholder-white "
          placeholder="Type ..."
          required
        />
        <button
          type="submit"
          className=" bg-blue-500 ml-auto text-white w-[20vw] lg:w-[17vw] p-2 px-3 rounded-sm hover:bg-blue-400 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageClient;
