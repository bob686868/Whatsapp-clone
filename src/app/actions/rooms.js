"use server"
import { message } from "../components/serverActions";
import prisma from "./prisma";
import { cookies } from "next/headers";
export async function getRoom(contactId){
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    contactId=Number(contactId)
    try {
        let room=await prisma.room.findFirst({
            where:{
                users:{
                    every:{
                        OR:[
                            {id:contactId},
                            {id}
                        ]
                    }
                }
            }
        })
        if(!room)return {status:500}
        return {room,status:200}       
    } catch (error) {
        console.error(error.message)
        return {status:500}       
    }
}



export async function createRoom(contactId){
    contactId=Number(contactId)
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try {
        let u1Promise=prisma.user.findUnique({where:{id}})
        let u2Promise=prisma.user.findUnique({where:{id:contactId}})
        
        let [u1,u2]=await Promise.all([u1Promise,u2Promise])
        let room=await prisma.room.create({
            data:{
                users:{
                    connect:[
                        {id},
                        {id:contactId},
                    ]
                }  
            }
        })
        return {status:200}
    } catch (error) {
        return {status:500}
        
    }
}

export async function getChats(){
    console.log("getChats function called");
    let cookieStore=await cookies()
    let id=cookieStore.get('id').value
    id=Number(id)
    console.log("User ID:", id);
    try {
        let rooms=await prisma.room.findMany({where:{
            users:{
                some:{id}
            },
        },
    orderBy:{
        updatedAt:"desc"
    },
    include:{
        messages:{
            orderBy:{createdAt:"desc"},
            take:1,
            include:{sender:true}
        },
        users:true
    }},
    
)   
    console.log("Found rooms:", rooms.length);
    for(let r of rooms){
        let roomMessages=r.messages
        if(roomMessages.length>0){
            r.id1=r.users[0].id
            r.id2=r.users[1].id
            let senderId=roomMessages[0].senderId
            r.senderId=senderId
            r.senderName=roomMessages[0].sender.name
            r.content=roomMessages[0].content
            r.contactName=(r.id1 == id ? r.users[1].name : r.users[0].name)
        }
    }
        return {status:200,rooms}
    } catch (error) {
        console.error("getChats error:", error.message)
        return {status:500}
    }
}

// export async function getRoom(contactId){
//     let cookieStore=await cookies()
//     let id=cookieStore.get("id").value
//     id=Number(id)
//     try {
//         let room=await prisma.room.findUnique({
//             where:{
//                 users:{
//                     every:{id:{in:[id,contactId]}},
//                     some:{id},
//                     some:{id:contactId}
//                 }
//             }
//         })

//         if(room)return {status:200}

        
//         await prisma.room.create({
//                 data:{
//                     users:{
//                         connect:[
//                             {id},
//                             {id:contactId}
//                         ]
//                     }
//                 }
//             })
//         return {status:200}
        
//     } catch (error) {
//         return {status:404}
//     }
// }