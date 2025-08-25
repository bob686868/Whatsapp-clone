"use client"
import React, { startTransition } from 'react'
import { useTransition } from "react";
import { redirect, usePathname ,useRouter} from 'next/navigation'

const ErrorPage = () => {
    const router=useRouter()
    const pathname=usePathname()

    const handleRecover=({error,reset})=>{
    startTransition(()=>{
        router.refresh()
        reset()
        redirect("/home")
    })
}
  return (
    <div>
      Page {pathname} not found
      <button className='bg-green-500 text-white p-2 border-sm' onClick={handleRecover}>recover</button>
    </div>
  )
}

export default ErrorPage
