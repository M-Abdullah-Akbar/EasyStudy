'use client'
import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

function WelcomeBanner() {
    const {user} = useUser();
  return ( 
    <div className=' p-5 w-full text-white bg-gray-900 rounded-lg flex items-center gap-6'>
        <Image src = {'/laptop.png'} alt='laptop' width={100} height={100} />
        <div>
            <h2 className='text-3xl font-bold'>Hello, {user?.firstName}!</h2>
            <p className='text-gray-400 mt-2'>Welcome Back, Its time to get back and start learning new courses</p>
        </div>
    </div>
  )
}

export default WelcomeBanner