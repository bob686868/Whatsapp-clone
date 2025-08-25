"use server"
import prisma from './prisma.js'
import { cookies } from "next/headers"


export async function addToContacts(name,phoneNumber){
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try{
        let user=await prisma.user.update({
            where:{id},
            data:{
                contacts:{
                    connect:{phoneNumber,name}
                }
            },
        })
        await prisma.user.update({where:{
            name,phoneNumber,},
            data: { contacts: { connect: { id } } }
        })
        return {status:200}
    }
    catch(e){
        return {message:"failed to add to contact",
                status:500
        }
    }
}

export async function getMyContacts(){

    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
        try {
        let user=await prisma.user.findUnique({where:{id},
        select:{contacts:true}})
        return {contacts:user.contacts,status:200}
    } catch (error) {
        return {status:500}
    }
}

export async function getSingleContact(contactId){
    let cookieStore=await cookies()
    let id =cookieStore.get("id")
    try {
        let user=await prisma.user.findUnique({
            where:{contactId}
        })
        if(!user)throw new Error("not found")
        if(!user.contacts.include({id}))throw new Error("not found")
        return {id:user.id,status:200}
    } catch (error) {
        return {status:404}
    }
}



export async function getContactsByName(name){
   let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try {
        let contacts=await prisma.user.findMany({where:{
            name:{contains:name},
            NOT:[{
                id
            }],
            contacts:{
                some:{id}
            }
        }})        
        return {status:200,contacts}
    } catch (error) {
        console.error(error.message)
       return {status:500}
   }
}