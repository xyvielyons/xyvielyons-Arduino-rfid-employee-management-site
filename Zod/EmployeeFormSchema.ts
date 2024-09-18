"use client"
 import { z } from "zod"
 
export const EmployeeFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email:z.string().email(),
  phoneNumber:z.string().min(6).max(50),
  idNumber:z.string()
})

export const TagsFormSchema = z.object({
    tagNumber:z.string().min(2).max(50)
})
export const PhotoFormSchema =z.object({
  imageUrl:z.string()
})