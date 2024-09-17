import React from 'react'
import EmployeeNavButtons from '@/components/shared/EmployeeNavButtons'
const SubmitedForm = ({closeTrigger}:{closeTrigger:any}) => {
  return (
    <div>
      <div className=""></div>
      <div className="">
        <EmployeeNavButtons closeTrigger={closeTrigger}/>
      </div>
    </div>
  )
}

export default SubmitedForm