"use server"
import prisma from "./prisma.js";
import { cookies } from "next/headers";

export async function getMessages(contactId){
    contactId=Number(contactId)
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try {
        let room=await prisma.room.findFirst({
            where:{
                users:{
                    every:{
                    OR:[
                        {id},
                        {id:contactId}
                    ]
                }
            },
    
            },
        include: {
        messages: {
          orderBy: { createdAt: 'asc' },
     
        },
           users:{
            select:{id:true,name:true}
          }},
        
      }
        )

        return {messages:room.messages,users:room.users,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function addMessage(content, contactId) {
  contactId=Number(contactId)

    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try {
      const room = await prisma.room.findFirst({
        where: {
          users: {
            every: {
              OR: [
                { id},
                { id: contactId }
              ]
            }
          }
        }
      });
      if (!room) {
        return { status: 404, error: "Room not found" };
      }
      
      await prisma.message.create({
        data: {
          content,
          room: { connect: { id: room.id } },
          sender: { connect: { id } }
        }
    });
    return { status: 200 };
  } catch (error) {
    console.error(error.message);
    return { status: 500, error: error.message };
  }
}


export async function editMessage(content,messageId){
    try {
        await prisma.message.update({data:{
            content
        },where:{
            id:messageId
        }})
        return {status:200}
    } catch (error) {
            console.error(error.message)
            return {status:500,message:error.message}
    }
}

export async function deleteMessage(messageId,contactId){
      contactId=Number(contactId)
      messageId=Number(messageId)

    try {
        await prisma.message.delete({where:{id:messageId}})
        return {status:200}
    } catch (error) {
        console.error(error);
        return {status:500,message:error.message}
    }
}