"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PhotoFormSchema } from "@/Zod/EmployeeFormSchema"
 
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
import React,{useState} from 'react'
import { ImageUploader } from "@/components/shared/ImageUploader"
import { uploadFiles, useUploadThing } from "@/lib/uploadthing"

const RegisterTagForm = () => {
const dispatch = useAppDispatch()
const [files,setFiles] = useState<File[]>([])
const [loading, setLoading] = useState(false)
const currentStep:any = useAppSelector((state)=>state.AddEmployee.currentStep)
const formData = useAppSelector((state)=>state.AddEmployee.formData)

  // 1. Define your form.
  const form = useForm<z.infer<typeof PhotoFormSchema>>({
    resolver: zodResolver(PhotoFormSchema),
    defaultValues: {
      ...formData
    },
  })
  const {startUpload} = useUploadThing('imageUploader')


 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PhotoFormSchema>) {
    
    console.log(values)
    console.log("uploading")
    try {
      const uploadedImages = await startUpload(files)
      setLoading(true)
      if(!uploadedImages){
        return 
      }
      
      dispatch(updateFormData({
        imageUrl:uploadedImages[0].url
      }))
      setLoading(false);
      dispatch(setCurrentStep(currentStep + 1));
      console.log(formData)

    } catch (error) {
      console.log(error)
    }
      
  
     
    console.log(formData)
    
      
   
    }
  
    

  


  return (

      <div className="">
        <div className="">
        {loading === true && (
              <div className="flex items-center justify-start text-gray-600 bg-gray-100 w-full h-[30px] mb-5 p-2 rounded-md">
                <h1>please wait as we upload your image......</h1>
              </div>
        )}
        </div>
        
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <ImageUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}></ImageUploader>
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