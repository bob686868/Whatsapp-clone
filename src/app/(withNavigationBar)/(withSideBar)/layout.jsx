import React from "react";
import RecentChats from "./@recentchats/page";

const layout = async ({ children, recentchats }) => {
  console.log("recentchats prop:", recentchats);

  return (
    <div className="grid grid-cols-12  text-white border border-gray-300 rounded-sm">
      <aside className="col-span-4 bg-white min-h-[100vh] border-3 border-gray-200">
        <h1 className="text-black font-bold text-xl mt-2 text-center pb-2 border-b border-b-gray-200">
          Recent Chats :
        </h1>
      
        <div>{recentchats || <RecentChats />}</div>
      </aside>

      {children}
    </div>
  );
};

export default layout;
