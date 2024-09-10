import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
const HeaderBar = async () => {
  const user = await currentUser()
  return (
    <div className='flex flex-row pl-[8px] pr-[8px]'>
        <div className=" flex flex-row items-center">
            <div className="w-[50px] h-[50px] flex items-center justify-center">
            {/* <Image src="/mypic.jpg" 
            alt="mypicture" 
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-full"/> */}
            <UserButton></UserButton>

            </div>
        
            <div className="flex flex-col">
                <p className='subtitlesmall text-gray-800'>{user?.username}</p>
                <p className='bodyextrasmall text-gray-600'>Client</p>
            </div>
        </div>
        
    </div>
  )
}

export default HeaderBar