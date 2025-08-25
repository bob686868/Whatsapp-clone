import { getChats } from "@/app/actions/rooms";
import React from "react";
import UserCard from "../UserCard";
import { cookies } from "next/headers";

export default async function Default() {
    console.log("recentchats default.js entered");
    try {
        let cookieStore = await cookies();
        let id = Number(cookieStore.get("id").value);
        let rooms = await getChats();
        if (rooms.status == 500) rooms = [];
        else {
            rooms = rooms.rooms;
        }

        return (
            <div className="h-full">
                {rooms.length > 0 ? (
                    rooms.map((r) =>
                        r.messages.length > 0 ? (
                            <UserCard
                                id1={r.id1}
                                id2={r.id2}
                                content={r.content}
                                contactName={r.contactName}
                                isSender={id == r.senderId}
                                key={r.id}
                            />
                        ) : (
                            ""
                        )
                    )
                ) : (
                    <div className="text-gray-500 text-center mt-50">No Recent Chats</div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error in recentchats default.js:", error);
        return <div className="text-red-500">Error loading recent chats</div>;
    }
} 