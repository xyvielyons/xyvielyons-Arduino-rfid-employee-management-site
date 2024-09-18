'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useAppSelector,useAppDispatch } from '@/redux/hooks'
import { setCurrentStep,deleteFormData } from '@/redux/slices/AddEmployeeSlice'
import { MdOutlineNavigateNext } from "react-icons/md";
import axios from 'axios';
import { toast } from "sonner"



const EmployeeNavButtons = ({closeTrigger}:{closeTrigger?:any}) => {
    const currentStep:any = useAppSelector((state)=>state.AddEmployee.currentStep)
    const dispatch = useAppDispatch()
    const formData = useAppSelector((state)=>state.AddEmployee.formData)
    console.log(typeof formData)
    
    async function SubmitFormData(){
      try {
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            // Add any other required headers here
            Authorization: 'Bearer your-token', // Example for authentication
          },
      };
    
      const resp = await axios.post('http://127.0.0.1:3001/api/arduino/employee/createOrganization',formData,config)
      console.log(resp)
        toast("Employee has beed successfully created")
        dispatch(deleteFormData())
      } catch (error) {
        console.log(error)
        throw new Error("failed to send data to server")
      }
      closeTrigger();
      
    }
  return (
    <div className='space-x-2'>

        <Button className='' onClick={()=>dispatch(setCurrentStep(currentStep - 1))} variant="secondary" disabled ={currentStep <= 1 ? true : false}>Previous</Button>
        {/* {currentStep <= 3 && (
            <Button onClick={()=>dispatch(setCurrentStep(currentStep + 1))} disabled={currentStep === 4 } type='submit'>Next
            <MdOutlineNavigateNext className='w-[24px] h-[24px] text-white'/>
            </Button>
        )} */}
        {currentStep === 4 && (
            <Button onClick={SubmitFormData}>Submit
            <MdOutlineNavigateNext className='w-[24px] h-[24px] text-white'/>
            </Button>
        )}

       
    </div>
  )
}

export default EmployeeNavButtons