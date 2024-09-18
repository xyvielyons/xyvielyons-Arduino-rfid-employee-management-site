"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { EmployeeFormSchema } from "@/Zod/EmployeeFormSchema"
 
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

const AddEmployeeForm = () => {
const dispatch = useAppDispatch()
const currentStep:any = useAppSelector((state)=>state.AddEmployee.currentStep)
const formData = useAppSelector((state)=>state.AddEmployee.formData)

  // 1. Define your form.
  const form = useForm<z.infer<typeof EmployeeFormSchema>>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      ...formData,
      status:"active"
    },
  })



 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EmployeeFormSchema>) {
    
    console.log(values)
    dispatch(updateFormData(values))
    dispatch(setCurrentStep(currentStep + 1));

  }


  return (

      <div className="">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LastName</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+254728****683" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id number</FormLabel>
                <FormControl>
                  <Input placeholder="1457**56" {...field} />
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

export default AddEmployeeForm