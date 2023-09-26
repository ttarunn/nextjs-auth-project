"use client"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"


const ProfilePage = () => { 
  const [data, setData] = useState('')
  const getUserDetails = async ()=> {
    const res = await axios.get('/api/users/token');
    console.log(res.data);
    setData(res.data.data._id)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-2xl text-white'>Profile</h1>
        <hr/>
        <h1 className='text-xl text-white'>Profile Page</h1>
        <h2 className="rounded p-2 m-2 bg-green-400 font-semibold text-white">{data === "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className="border border-gray-700 m-2 p-2 rounded-xl text-white mt-4 bg-green-800 hover:bg-red-400" onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}

export default ProfilePage;