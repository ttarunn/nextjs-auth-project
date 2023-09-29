"use client"

import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const SignupPage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        if(user.email.length && user.password.length && user.username.length){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);
            console.log('Signup Successfully', response.data);

            router.push("/login");

        } catch (error : any) {
            console.log("error while signup", error)
            toast.error(error.message)
        }finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-white'>{loading?"Processing...":"Create An Account"}</h1>
            <hr />
            <label htmlFor='username' className='text-white'>Username</label>
            <input 
                type="text"
                placeholder='username'
                className='hover:border border-white rounded-lg px-2'
                id='username'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} />

            <label htmlFor='email' className='text-white'>Email</label>
            <input
                type="email"
                className='hover:border border-white rounded-lg px-2'
                placeholder='Email'
                id='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <label htmlFor='password' className='text-white'>Password</label>
            <input
                type="password"
                className='hover:border border-white rounded-lg px-2'
                placeholder='Password'
                id='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button className='border border-gray-700 m-2 p-1 rounded-xl text-white' onClick={onSignup}>{buttonDisabled?"Fill All Details":"Sign Up"}</button>
            <Link href={'/login'} className='text-white'>Visit Login Page</Link>
        </div>
    )
}

export default SignupPage