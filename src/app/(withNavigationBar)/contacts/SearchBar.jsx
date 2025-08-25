"use client"
import React from 'react'

const SearchBar = ({query,setQuery}) => {
  return (
    <>
        <label htmlFor="name" className="block">
          Name :
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          className="mb-3 rounded-sm p-2 focus:outline-none  border border-gray-200"
          required
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
    </>
  )
}

export default SearchBar
