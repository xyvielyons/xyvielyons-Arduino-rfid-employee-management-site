import TableComponent from '@/components/checkoutTable/TableComponent'
import React from 'react'

const page = () => {
  return (
    <div className='pl-[16px] pr-[16px] space-y-2'>
      <header>
        <h1 className='headingfour font-bold text-gray-800'>Checkout</h1>
        <p className='bodysmall text-gray-600'>A list of all the employees who checked out</p>
      </header>
      <main>
        <TableComponent callToAction='Add employee'/>
      </main>
    </div>
  )
}

export default page