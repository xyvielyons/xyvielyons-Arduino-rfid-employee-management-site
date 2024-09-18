"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TagsFormSchema } from "@/Zod/EmployeeFormSchema"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import EmployeeNavButtons from '@/components/shared/EmployeeNavButtons'
import { useAppDispatch,useAppSelector } from "@/redux/hooks"
import { setCurrentStep,updateFormData } from "@/redux/slices/AddEmployeeSlice"
import React from 'react'

const RegisterTagForm = () => {
const dispatch = useAppDispatch()
const currentStep:any = useAppSelector((state)=>state.AddEmployee.currentStep)
const formData = useAppSelector((state)=>state.AddEmployee.formData)

  // 1. Define your form.
  const form = useForm<z.infer<typeof TagsFormSchema>>({
    resolver: zodResolver(TagsFormSchema),
    defaultValues: {
      ...formData
    },
  })



 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof TagsFormSchema>) {
    
    console.log(values)
    dispatch(updateFormData(values))
    dispatch(setCurrentStep(currentStep + 1));
    console.log(formData)

  }


  return (

      <div className="">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          
          <FormField
            control={form.control}
            name="tagNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag number</FormLabel>
                <FormControl>
                  <Input placeholder="BA 22 34 45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-row space-x-2 pt-4">
          <EmployeeNavButtons></EmployeeNavButtons>
          <Button type='submit'>Next</Button>
          </div>
          
          
        </form>
      </Form>

      </div>

  )
}

export default RegisterTagForm