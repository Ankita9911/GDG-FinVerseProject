import { OnboardingForm } from "@/components/onboarding-form"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#800080] mb-6 text-center">Tell Us About Your Financial Profile</h1>
          <p className="text-gray-600 mb-8 text-center">
            We'll use this information to create personalized investment recommendations tailored to your unique
            situation.
          </p>

          <OnboardingForm />
        </div>
      </main>
    </div>
  )
}

