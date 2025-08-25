"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const LinkButton = ({children,href}) => {
  let pathName=usePathname()
  let extraStyles= (pathName==href) ?
   "bg-gray-600 cursor-default":
   "bg-blue-500 hover:bg-blue-400 cursor-pointer"
  return (
      <Link href={href} className={`rounded-sm w-[30vw] text-white p-2 text-center ${extraStyles}`}>
        {children}
      </Link>
  )
}

export default LinkButton
