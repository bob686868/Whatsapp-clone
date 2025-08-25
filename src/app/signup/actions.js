"use server"
import { signupUser } from "../actions/users.js";
import { redirect } from "next/navigation";


export async function addUser(prevState,formData) {
    let phoneNumber = formData.get("phoneNumber");
    let name = formData.get("name");
    let user = await signupUser(name, phoneNumber);
    if (user.status==200) {
        redirect("/home");
        return {error:""}
    }
    else{
        return { error: "credentials taken" }
    };
}