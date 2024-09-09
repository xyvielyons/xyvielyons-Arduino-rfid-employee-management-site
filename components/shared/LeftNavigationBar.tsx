'use client'
import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import { LeftNavigationConstants } from '@/constants'
import { useRouter } from 'next/navigation'
import { RxDashboard } from "react-icons/rx";
import { PiUsersThreeLight } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { BiShieldPlus } from "react-icons/bi";
import { usePathname } from 'next/navigation'
function LeftNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<string>("");

  useEffect(()=>{
    setPath(pathname);
  },[pathname])
  
  
  console.log(pathname);
  return (
    <div className='flex flex-col p-2'>
      <div className="w-full h-[40px] p-4 mb-[72px]">
        <Image 
          src="/logo.png" 
          alt='logo' 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <div className="">
        <nav className="">
        {LeftNavigationConstants.map((navs)=>(
          <div className={`h-[40px] w-full hover:bg-[#F9F9F9] flex items-center mb-2 ${path == navs.route ? 'bg-gray-100' :''}`}>
            <button onClick={()=>router.push(navs.route)} className={`font-light bodymedium text-gray-600 w-full h-full items-center flex p-2 ${path == navs.route ? 'text-gray-800' :''}`}>
                <div className="">
                    {navs.label === 'Dashboard'?
                    <RxDashboard className='w-[24px] h-[24px]' />
                    :navs.label === 'Employees'?
                    <PiUsersThreeLight className='w-[24px] h-[24px]'/>
                    :navs.label === 'Checkins'?
                    <CiLogin className='w-[24px] h-[24px]'/>
                    :navs.label === 'Checkouts'?
                    <CiLogout className='w-[24px] h-[24px]'/>
                    :navs.label === 'Health Check'?
                    <BiShieldPlus className='w-[24px] h-[24px]'/> :''
                  }
                </div>
              
                <p className='ml-2'>{navs.label}</p>
              
            </button>
          </div>
        ))}
        </nav>
      </div>

      
    </div>
  )
}

export default LeftNavigationBar