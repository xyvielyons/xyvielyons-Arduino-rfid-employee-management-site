"use client"

import React,{useEffect,useState} from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "react-query"
import axios from "axios"
import { useUser } from '@clerk/clerk-react'

export const description = "A donut chart with text"



const chartConfig = {
  employees: {
    label: "employees",
    color: "#2563eb"
    
  },
  
} satisfies ChartConfig

export default function Donut() {
    const [employees, setEmployees] = useState<any>([]);
 
  const {user} = useUser()

  const {isLoading,data} = useQuery('getemployeesdonut',()=>{
    return axios.post('http://127.0.0.1:3001/api/arduino/employee/getemployees',{
      organizationId:user?.publicMetadata.organizationId
    })
  },//this is where we set the default caching duration 
  {
    cacheTime:5000,//this is in (ms)
    refetchInterval:5000
  })
  useEffect(() => {
    if(!isLoading && data){
      const employeeData = data.data
      setEmployees(employeeData)
    }

  }, [isLoading,data])
  console.log(employees.length)
  const chartData = [
    { id: "employees", employees: employees.length,fill: "#424242" },

  ]
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.employees, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>No of registered employees</CardTitle>
        <CardDescription>chart showing number of registered employees in the organization</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="employees"
              nameKey="id"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {employees.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
