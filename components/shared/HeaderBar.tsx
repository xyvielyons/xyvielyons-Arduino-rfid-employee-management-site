import React from 'react'
import Image from 'next/image'
const HeaderBar = () => {
  return (
    <div className='flex flex-row pl-[8px] pr-[8px]'>
        <div className=" flex flex-row space-x-2 items-center">
            <div className="w-[50px] h-[50px] rounded-full">
            <Image src="/mypic.jpg" 
            alt="mypicture" 
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-full"/>

            </div>
        
            <div className="flex flex-col">
                <p className='subtitlesmall text-gray-800'>xyvie lyons</p>
                <p className='bodyextrasmall text-gray-600'>Admin</p>
            </div>
        </div>
        
    </div>
  )
}

export default HeaderBar