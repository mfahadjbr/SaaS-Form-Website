import { OnboardingWizard } from '@/components/onboarding-wizard'

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Our SaaS!</h1>
      <OnboardingWizard />
    </div>
  )
}
