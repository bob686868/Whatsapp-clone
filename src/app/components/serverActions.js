"use server";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { addToContacts } from './../actions/contacts.js';
import { getRoom,createRoom } from './../actions/rooms.js';
import { revalidatePath } from 'next/cache';

export async function message(formData) {
    let cookieStore=await cookies()
    if(!cookieStore.get('id'))redirect('/signup')
    let id=Number(cookieStore.get('id').value)
    const contactId = formData.get("contactId");
    return redirect(`/room/${id}/${contactId}`);
}


export async function manageRoom(contactId){
    let room=await getRoom(contactId)
    if(room.status==500)createRoom(contactId)
}

export async function addContact(formData) {
    const phoneNumber = formData.get("phoneNumber");
    const name = formData.get("name");
    console.log(phoneNumber,name)
    let result = await addToContacts(name,phoneNumber);
    if (result.status != 200) {
       
        console.error("An error happened");
        return { status: "error" };
    }
    revalidatePath("/contacts");
    return { status: "success" };
}