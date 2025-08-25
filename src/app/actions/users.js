"use server"
import prisma from './prisma.js'
import { cookies } from "next/headers"


export async function signupUser(name,phoneNumber){
    let cookieStore=await cookies()

    try{
        let user=await prisma.user.create({data:{name,phoneNumber}})
        cookieStore.set({name:"id",value:user.id})
        return {user,
                status:200}
    }
    catch(e){
        console.error(e.message)
        if(e.code=="P2002")
        return {message:"a user exitst with this number",
                status:500}
        else{
            return {message:"an error happened while signing you up, please try again later",
                    status:500}
        }
    
    }
}
export async function logOutUser(){
    let cookieStore=await cookies()
    let id=cookieStore.get('id').value
    id=Number(id)
    try{
          cookieStore.set({
            name: "id",      
            value: "",     
            maxAge: 0         
        });
        return {user,
                status:200}
    }
    catch(e){
        return {message:"error happened while logging you out",
                status:500}
    }
}

export async function getAllUsers(){
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try{
        let users=await prisma.user.findMany({
            where:{id:{not:id}}
        })
        if(users.length==0){
           users=await seeder()
        }
        return {users,
                status:200}
    }
    catch(e){
        console.error("error details :",e)

        return {message:"error happened fetching users",
            status:500}
    }
}

export async function getUser(phoneNumber,name){
    let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try{
        let users=await prisma.user.findFirst({where:
            {phoneNumber:{
                startsWith:phoneNumber
            },
                name:{
                    startsWith:name
                }
            },
            id:{not:id}
        })
        return {users,
            status:200}
    }
    catch(e){
        return {message:"user not found",
                status:404
        }
    }
}


export async function seeder(){
const usersData = [
  { name: "Alice Smith", phoneNumber: '1111111111', bio: "This user has no bio" },
  { name: "Bob Johnson", phoneNumber: '2222222222', bio: "This user has no bio" },
  { name: "Charlie Brown", phoneNumber: '3333333333', bio: "This user has no bio" },
  { name: "Diana Prince", phoneNumber: '4444444444', bio: "This user has no bio" },
  { name: "Ethan Hunt", phoneNumber: '5555555555', bio: "This user has no bio" },
  { name: "Fiona Gallagher", phoneNumber: '6666666666', bio: "This user has no bio" },
  { name: "George Miller", phoneNumber: '7777777777', bio: "This user has no bio" },
  { name: "Hannah Davis", phoneNumber: '8888888888', bio: "This user has no bio" },
  { name: "Ian Wright", phoneNumber: '9999999999', bio: "This user has no bio" },
  { name: "Julia Roberts", phoneNumber: '1010101010', bio: "This user has no bio" },
];

    try{
        const users = [];

    for (const userData of usersData) {
        const user = await prisma.user.create({ data: userData });
        users.push(user);
    }
        return users
        }
    
    catch(e){
        return {message:"failed to seed users",
                status:500
        }
    }
}

export async function getUsersByName(name){
   let cookieStore=await cookies()
    let id=cookieStore.get("id").value
    id=Number(id)
    try {
        let contacts=await prisma.user.findMany({where:{
            name:{contains:name},
            NOT:[{
                id
            }]
        }})        
        return {status:200,contacts}
    } catch (error) {
        console.error(error.message)
       return {status:500}
   }
}


