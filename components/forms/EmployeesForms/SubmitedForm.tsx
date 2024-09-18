import React from 'react'
import EmployeeNavButtons from '@/components/shared/EmployeeNavButtons'
import { useAppSelector } from '@/redux/hooks'
const SubmitedForm = ({closeTrigger}:{closeTrigger:any}) => {
  const FormData = useAppSelector((state)=>state.AddEmployee.formData)
  const data = JSON.stringify(FormData,null,2)

  return (
    <div>
      <div className="">
      <code>
            <pre>{data}</pre>
          </code>
      </div>
      <div className="">
        <EmployeeNavButtons closeTrigger={closeTrigger}/>
      </div>
    </div>
  )
}

export default SubmitedForm