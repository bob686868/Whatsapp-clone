// import React from 'react'
// import SquareUserCard from '@/app/components/SquareUserCard'
// import SearchBar from './SearchBar'
// import { useActionState,useState,useEffect } from 'react'

// const UsersSection = () => {
//   let [query,setQuery]=useState("")
//   const [results, setResults] = useState([]);
//   let [state,formAction,isPending] =useActionState(getContactsByName,{})
//   let users=[]

//   useEffect(()=>{
//       let id=setTimeout(async ()=>{
//             users = await getContactsByName(query);
//             formData.set("query", query);
//             const res = await formAction(formData);
//             setResults(res || []);
//         },300)
//         return ()=>clearTimeout(id)
//     },[query])
//   return (
//     <>
//      <h1 className="font-bold text-lg border-b-2 w-fit mx-auto p-2 mb-5">
//         My users
//       </h1>
//       <SearchBar query={contactsQuery} setQuery={setContactsQuery}/>

//           {isPending &&<div className='mt-2 text-center font-bold'>Searching...</div>}
//       <div className="grid grid-cols-9 gap-3">
//         {users ? users.map((u) => (
//         <SquareUserCard
//           key={u.id}
//           contactId={u.id}
//           name={u.name}
//           bio={u.bio}
//           phoneNumber={u.phoneNumber}
//           isContact={true}
//         />))
//         :<div className="text-xl col-span-9 font-bold text-center">No users found</div>
//     }
//       </div>
//     </>
//   )
// }

// export default ContactsSection
