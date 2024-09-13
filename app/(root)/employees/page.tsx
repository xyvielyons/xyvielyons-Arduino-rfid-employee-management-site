import TableComponent from '@/components/table/TableComponent'
import React from 'react'

const page = () => {
  return (
    <div className='pl-[16px] pr-[16px] space-y-2'>
      <header>
        <h1 className='headingfour font-bold text-gray-800'>Employees</h1>
        <p className='bodysmall text-gray-600'>A list of all the registered employees</p>
      </header>
      <main>
        <TableComponent callToAction='Add employee'/>
      </main>
    </div>
  )
}

export default page