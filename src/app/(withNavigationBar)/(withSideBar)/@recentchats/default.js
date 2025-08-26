// import { getChats } from "@/app/actions/rooms";
// import React from "react";
// import UserCard from "../UserCard";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function Default() {
//     console.log("recentchats default.js entered");
//     try {
//         let cookieStore = await cookies();
//         if(!cookieStore.get("id"))redirect('/signup')
//         let id = Number(cookieStore.get("id").value);
//         let rooms = await getChats();
//         if (rooms.status == 500) rooms = [];
//         else {
//             rooms = rooms.rooms;
//         }

//         return (
//             <div className="h-full">
//                 {rooms.length > 0 ? (
//                     rooms.map((r) =>
//                         r.messages.length > 0 ? (
//                             <UserCard
//                                 id1={r.id1}
//                                 id2={r.id2}
//                                 content={r.content}
//                                 contactName={r.contactName}
//                                 isSender={id == r.senderId}
//                                 key={r.id}
//                             />
//                         ) : (
//                             ""
//                         )
//                     )
//                 ) : (
//                     <div className="text-gray-500 text-center mt-50">No Recent Chats</div>
//                 )}
//             </div>
//         );
//     } catch (error) {
//         console.error("Error in recentchats default.js:", error);
//         return <div className="text-red-500">Error loading recent chats</div>;
//     }
// } 
import { getChats } from "@/app/actions/rooms";
import React from "react";
import UserCard from "../UserCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const RecentChats = async () => {
  console.log("entered");
  let cookieStore = await cookies();
  let id = Number(cookieStore.get("id").value);
  if(!cookieStore.get("id"))redirect('/signup')
  let rooms = await getChats();
  let i = 0;
  if (rooms.status == 500) rooms = [];
  else {
    rooms = rooms.rooms;
  }
  return (
    <div className="h-full">
      {rooms.length > 0 ? (
        rooms.map((r) => {
          if (r.messages.length > 0) {
            i++;
            console.log(i);
            return (
              <UserCard
                id1={r.id1}
                id2={r.id2}
                content={r.content}
                contactName={r.contactName}
                isSender={id == r.senderId}
                key={r.id}
              />
            );
          } else {
            return "";
          }
        })
      ) : (
        <div className="text-gray-500 text-center mt-50">No Recent Chats</div>
      )}
      {rooms.length > 0 && i == 0 && (
        <div className="text-gray-500 text-center mt-50">No Recent Chats</div>
      )}
    </div>
  );
};

export default RecentChats;
