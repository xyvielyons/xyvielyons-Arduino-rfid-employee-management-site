import React from 'react'
import Donut from '@/components/cards/Donut'
import DonutCheckinChart from '@/components/cards/DonutCheckinChart'
import DonutCheckoutChart from '@/components/cards/DonutCheckoutChart'
const page = async() => {
 
  return (
    <div className='pl-[16px] pr-[16px] space-y-2'>
      <header>
        <h1 className='headingfour font-bold text-gray-800'>Dashboard</h1>

      </header>
      <main className='space-y-2'>
        <div className="">
          <Donut/>
        </div> 
        <div className="flex flex-row w-full space-x-2">
          <div className="w-full">
            <DonutCheckinChart></DonutCheckinChart>
          </div>
          <div className="w-full">
            <DonutCheckoutChart></DonutCheckoutChart>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page