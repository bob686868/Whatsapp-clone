"use server";
import { deleteMessage,addMessage } from "@/app/actions/message.js";
import { revalidatePath } from "next/cache";
import { getRoom,createRoom } from "@/app/actions/rooms.js";
import { cookies } from "next/headers";


export async function addNewMessage(content,contactId) {
  let cookieStore=await cookies()
  let id=Number(cookieStore.get('id').value)
  let result = await addMessage(content,contactId);
  revalidatePath(`/room/${id}/${contactId}`);
}
export async function handleDeleteMessage(messageId,contactId) {
  let cookieStore=await cookies()
  let id=Number(cookieStore.get('id').value)
  await deleteMessage(messageId,contactId);
  revalidatePath(`room/${id}/${contactId}`);
}

export async function manageRoom(contactId){
    let room=await getRoom(contactId)
    if(room.status==500)createRoom(contactId)
}
