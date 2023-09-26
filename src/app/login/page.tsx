"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const router = useRouter();

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            router.push(`/profile/${response.data.user.username}`)
        } catch (error : any) {
            console.log("error while signup", error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    };

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-white'>{loading?"Processing...":"Login"}</h1>
            <hr />
            <label htmlFor='email' className='text-white'>Email</label>
            <input
                type="email"
                placeholder='Email'
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <label htmlFor='password' className='text-white'>Password</label>
            <input
                type="password"
                placeholder='Password'
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button className='border border-gray-700 m-2 p-1 rounded-xl text-white' onClick={onLogin}>Login</button>
            <Link href={'/signup'} className='text-white'>Visit SignUp Page</Link>
        </div>
    )
}

export default LoginPage