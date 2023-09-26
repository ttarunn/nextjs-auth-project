"use client"
import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ProfilePage = ({params}:any) => {

  const router = useRouter()

  const logout = async ()=> {
    console.log("in")
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Successfully');
      router.push('/login')
    } catch (error: any) {
        console.log(error)
        toast.error(error.mesage)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='inline text-white text-2xl'>Hello <span className='text-white text-2xl inline ml-2 bg-orange-500 border p-2 rounded-lg'>{params.id}</span></h1>
        <hr/>
        <button className="border border-gray-700 m-2 p-2 rounded-xl text-white mt-4" onClick={()=> logout()}>Logout</button>
        
    </div>
  )
}

export default ProfilePage;