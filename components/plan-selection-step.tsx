import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const planSelectionSchema = z.object({
  plan: z.enum(['basic', 'pro', 'enterprise'], {
    required_error: "You need to select a plan",
  }),
})

type PlanSelectionData = z.infer<typeof planSelectionSchema>

export function PlanSelectionStep({ onNext, data }: StepProps) {
  const form = useForm<PlanSelectionData>({
    resolver: zodResolver(planSelectionSchema),
    defaultValues: data,
  })

  const onSubmit = (values: PlanSelectionData) => {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Plan</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="basic" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Basic - $9.99/month
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="pro" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Pro - $19.99/month
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="enterprise" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Enterprise - Contact Sales
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

PlanSelectionStep.handleSubmit = () => {
  document.querySelector('form')?.requestSubmit()
}

