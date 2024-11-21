import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { StepProps } from './onboarding-wizard'

const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  employeeCount: z.coerce.number().min(1, "Employee count must be at least 1"),
})

type CompanyInfoData = z.infer<typeof companyInfoSchema>

export function CompanyInfoStep({ onNext, data }: StepProps) {
  const form = useForm<CompanyInfoData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: data,
  })

  const onSubmit = (values: CompanyInfoData) => {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeeCount"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  onChange={(e) => onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
      </form>
    </Form>
  )
}

CompanyInfoStep.handleSubmit = () => {
  document.querySelector('form')?.requestSubmit()
}
