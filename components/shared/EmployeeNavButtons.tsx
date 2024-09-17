import React from 'react'
import { Button } from '../ui/button'
import { useAppSelector,useAppDispatch } from '@/redux/hooks'
import { setCurrentStep } from '@/redux/slices/AddEmployeeSlice'
import { MdOutlineNavigateNext } from "react-icons/md";
const EmployeeNavButtons = ({closeTrigger}:{closeTrigger?:any}) => {
    const currentStep:any = useAppSelector((state)=>state.AddEmployee.currentStep)
    const dispatch = useAppDispatch()

    function SubmitFormData(){
      closeTrigger();
    }
  return (
    <div className='space-x-2'>

        <Button className='' onClick={()=>dispatch(setCurrentStep(currentStep - 1))} variant="secondary" disabled ={currentStep <= 1 ? true : false}>Previous</Button>
        {currentStep <= 3 && (
            <Button onClick={()=>dispatch(setCurrentStep(currentStep + 1))} disabled={currentStep === 4 }>Next
            <MdOutlineNavigateNext className='w-[24px] h-[24px] text-white'/>
            </Button>
        )}
        {currentStep === 4 && (
            <Button onClick={SubmitFormData}>Submit
            <MdOutlineNavigateNext className='w-[24px] h-[24px] text-white'/>
            </Button>
        )}

       
    </div>
  )
}

export default EmployeeNavButtons