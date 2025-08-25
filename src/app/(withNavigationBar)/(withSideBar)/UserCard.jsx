'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const UserCard = ({content,isSender,contactName,id1,id2}) => {
  if(content && content.length>20)content=content.slice(0,20)+"..."
  let pathName=usePathname()
  let extraStyles="";
  if(pathName==`/room/${id1}/${id2}` || pathName==`/room/${id1}/${id2}`){
      extraStyles='bg-gray-200'
  }
  return (
    <Link href={`/room/${id1}/${id2}`} className='block mb-2'>
      <div className={`flex  py-1 bg-blue-200   hover:bg-blue-100 ${extraStyles}`}>
        <Image width={50} height={50} src="/avatar.jpg" alt="avatar"
        className='rounded-full'/>
 
          <div className='ml-3'>
              <div className='text-xl mt-[2px] font-bold text-black'>{contactName}</div>
              <div className=''>
                <span className='text-black text-[16px] mr-2'>{isSender ? "You :" : contactName+":"}</span>
                <span className='text-gray-600 text-[14px]'>{content}</span>
              </div>
          </div>

      </div>
    </Link>
  )
}

export default UserCard
