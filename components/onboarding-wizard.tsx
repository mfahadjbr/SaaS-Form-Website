"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoStep } from '@/components/personal-info-step'
import { CompanyInfoStep } from '@/components/company-info-step'
import { PlanSelectionStep } from '@/components/plan-selection-step'
import { ConfirmationStep } from '@/components/confirmation-step'
import { db, collection, doc, setDoc } from '@/firebase'

export type StepProps = {
  onNext: (data: any) => void
  onPrevious?: () => void
  data?: any
}

const steps = [
  { title: "Personal Information", component: PersonalInfoStep },
  { title: "Company Information", component: CompanyInfoStep },
  { title: "Plan Selection", component: PlanSelectionStep },
  { title: "Confirmation", component: ConfirmationStep },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const handleNext = (stepData: any) => {
    if (Object.values(stepData).every(value => value !== undefined && value !== '')) {
      setFormData({ ...formData, ...stepData })
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      setIsSubmitting(false)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const CurrentStepComponent = steps[currentStep].component

  const handleStepSubmit = () => {
    setIsSubmitting(true)
    CurrentStepComponent.handleSubmit()
  }

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      const submissionId = `submission-${Date.now()}`
      const submissionRef = doc(collection(db, 'form-submissions'), submissionId)
      
      await setDoc(submissionRef, {
        ...formData,
        submittedAt: new Date().toISOString()
      })

      console.log('Form submitted to Firestore:', formData)
      setSubmissionSuccess(true)
      // Refresh the page after successful submission
      window.location.reload()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-full h-2 ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                } ${index < steps.length - 1 ? 'mr-1' : ''}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <CurrentStepComponent
          onNext={handleNext}
          onPrevious={handlePrevious}
          data={formData}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
          variant="outline"
        >
          Previous
        </Button>
        {currentStep < steps.length - 1 && (
          <Button 
            onClick={handleStepSubmit}
            disabled={isSubmitting}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button 
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        )}
      </CardFooter>
      {submissionSuccess && (
        <div className="text-center text-green-500 mt-4">
          Your form has been successfully submitted!
        </div>
      )}
    </Card>
  )
}
