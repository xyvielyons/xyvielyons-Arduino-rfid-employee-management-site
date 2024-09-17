import React from 'react'
import { steps } from '@/constants'
import { useAppSelector } from '@/redux/hooks';
const Steps = () => {
    const currentStep = useAppSelector((state)=>state.AddEmployee.currentStep);
    const stepsLength = steps.length;
    function StepIndicator(step:Number | String){
        if(step === 1){
            return (
                <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                </div>
            )
        }else if(step === 2){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                </div>)

        }else if(step === 3){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="w-[81px] h-[10px] border-gray-600 border-[1px] rounded-md"></div>
                </div>)

        }else if(step === 4){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                    <div className="bg-gray-800 w-[81px] h-[10px] border-gray-800 rounded-md"></div>
                </div>)

        }
    }
  return (
    <div className='space-y-2'>
        <div className="">
            {StepIndicator(currentStep)}
        </div>
        <div className="">
            {steps.map((step,i)=>{
            if(currentStep === step.number){
                return(
                    <div className="">
                        <h1 className='headingfive text-gray-800'>{step.title}</h1>
                        <p className='bodysmall text-gray-600 font-light'>{step.subtitle}</p>
                    </div>
                )
            }
        })}
        </div>
        
    </div>
  )
}

export default Steps