"use client"
import React from 'react'

const Button = ({children}) => {
  return (
    <button  className="rounded-sm cursor-pointer  mx-auto bg-blue-500 hover:bg-blue-400 border-sm w-[80%]  p-2 text-white">
      {children}
    </button>
  )
}

export default Button
