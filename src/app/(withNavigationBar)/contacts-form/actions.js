"use server"
import { redirect } from "next/navigation";
import { addToContacts } from "@/app/actions/contacts";
import { revalidatePath } from "next/cache";

export async function addContact(prevState,formData) {
    let phoneNumber = formData.get("phoneNumber");
    let name = formData.get("name");
    let user = await addToContacts(name, phoneNumber);
    if (user.status==200) {
        revalidatePath('/contacts')
        redirect("/contacts");
    }
    else{
        return { error: "no user exists with those credentials" }
    };
}