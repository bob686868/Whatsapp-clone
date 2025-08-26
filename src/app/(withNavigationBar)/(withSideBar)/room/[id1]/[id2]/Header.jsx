import React from "react";
import Image from "next/image";
const Header = ({ name }) => {
  return (
    <div className="p-2  bg-blue-200  border-3 border-l-0 border-gray-200">
      <Image
        src="/avatar.jpg"
        width={50}
        height={50}
        className="rounded-full mr-3 inline-block"
        alt="avatar"
      />
      <span className="text-black text-lg ">{name}</span>
    </div>
  );
};

export default Header;
