'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoStep } from '@/components/personal-info-step';
import { CompanyInfoStep } from '@/components/company-info-step';
import { PlanSelectionStep } from '@/components/plan-selection-step';
import { ConfirmationStep } from '@/components/confirmation-step';
import { db, collection, doc, setDoc } from '@/firebase';

export type StepProps = {
  onNext: (data: Record<string, unknown>) => void
  onPrevious?: () => void
  data?: Record<string, unknown>
}

const steps = [
  { title: "Personal Information", component: PersonalInfoStep, color: "from-purple-500 to-pink-500" },
  { title: "Company Information", component: CompanyInfoStep, color: "from-blue-500 to-teal-500" },
  { title: "Plan Selection", component: PlanSelectionStep, color: "from-green-500 to-emerald-500" },
  { title: "Confirmation", component: ConfirmationStep, color: "from-orange-500 to-yellow-500" }
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleNext = (stepData: Record<string, unknown>) => {
    if (Object.values(stepData).every(value => value !== undefined && value !== '')) {
      setFormData({ ...formData, ...stepData });
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  const handleStepSubmit = () => {
    setIsSubmitting(true);
    CurrentStepComponent.handleSubmit();
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      const submissionId = `submission-${Date.now()}`;
      const submissionRef = doc(collection(db, 'form-submissions'), submissionId);
      
      await setDoc(submissionRef, {
        ...formData,
        submittedAt: new Date().toISOString()
      });

      setSubmissionSuccess(true);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-600 p-8">
  <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
    Welcome to Our SaaS Mini Website!
  </h1>
  <Card className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/90 shadow-2xl rounded-lg border border-purple-300">
    <div className={`h-2 w-full bg-gradient-to-r ${steps[currentStep].color} rounded-t-lg`} />
    <CardHeader className="text-center p-6">
      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        {steps[currentStep].title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 px-1">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  index <= currentStep
                    ? `bg-gradient-to-r ${step.color} shadow-md`
                    : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="text-center text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      <CurrentStepComponent
        onNext={handleNext}
        onPrevious={handlePrevious}
        data={formData}
      />
    </CardContent>
    <CardFooter className="flex justify-between gap-4 p-6">
      <Button
        onClick={handlePrevious}
        disabled={currentStep === 0 || isSubmitting}
        variant="outline"
        className="w-full border-2 border-purple-500 text-purple-500 bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
      >
        Previous
      </Button>
      {currentStep < steps.length - 1 ? (
        <Button
          onClick={handleStepSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300"
        >
          Next
        </Button>
      ) : (
        <Button
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg transition-all duration-300"
        >
          Submit
        </Button>
      )}
    </CardFooter>
    {submissionSuccess && (
      <div className="text-center p-6">
        <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-md animate-bounce">
          🎉 Your form has been successfully submitted!
        </div>
      </div>
    )}
  </Card>
</div>

    </>
  );
}

export default OnboardingWizard;