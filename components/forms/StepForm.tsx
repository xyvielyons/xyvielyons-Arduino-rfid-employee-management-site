import React from 'react'
import AddEmployeeForm from './EmployeesForms/AddEmployeeForm';
import RegisterTagForm from './EmployeesForms/RegisterTagForm';
import UploadPhotoForm from './EmployeesForms/UploadPhotoForm';
import SubmitedForm from './EmployeesForms/SubmitedForm';
import { useAppSelector } from '@/redux/hooks';
const StepForm = ({closeTrigger}:{closeTrigger:any}) => {
    const currentStep = useAppSelector((state)=>state.AddEmployee.currentStep);
    function currentStepFormRender(step:Number | String){
        if(currentStep === 1){
            return <AddEmployeeForm/>
        }else if(currentStep === 2){
            return <RegisterTagForm/>
        }else if(currentStep === 3){
            return <UploadPhotoForm/>
        }else if(currentStep === 4){
            return <SubmitedForm closeTrigger={closeTrigger}/>
        }
    }
  return (
    <div>
        <div className="">{currentStepFormRender(currentStep)}</div>
    </div>
  )
}

export default StepForm