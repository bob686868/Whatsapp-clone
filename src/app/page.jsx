import React from "react";
import Link from "next/link";
import LinkButton from "./components/LinkButton";
import Image from "next/image";
const Home = () => {
  return (
    <main className="bg-blue-200 h-[100vh] relative top-0 pt-15">
      <h1 className=" mb-12 text-blue-500 text-4xl flex justify-center font-bold ">
        Welcome To WhatsUp!
      </h1>
      <Image width={350} height={350} src="/app-icon.jpg" alt="wp-clone-icon"
      className="rounded-md mx-auto mb-4"/>
      <section className="p-2  mx-auto bg-blue-500 text-white mb-3 rounded-md w-fit">
        <div className="flex flex-col h-full justify-center rounded-md ">
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span>Connect instantly with your friends and contacts.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span>Add people to your network and manage your contacts easily.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span>Start private conversations and send messages in real time.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span>Stay connected and communicate seamlessly anytime, anywhere.</span>
            </li>
          </ul>
        </div>

      </section>
      <div className="w-fit mx-auto mt-6">
      <Link href="signup" className={`rounded-sm w-[40vw] text-lg text-white p-4 text-center bg-blue-500 hover:bg-blue-400`}>
        Get Started
      </Link>
      </div>
    </main>
  );
};

export default Home;
