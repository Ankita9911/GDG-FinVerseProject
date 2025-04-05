"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateRecommendations } from "@/lib/recommendations"

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    age: "",
    income: "",
    expenses: "",
    savings: "",

    // Financial Goals
    goals: [] as string[],
    timeHorizon: "medium", // short, medium, long

    // Risk Profile
    riskTolerance: 50, // 0-100

    // Investment Preferences
    preferences: {
      stocks: true,
      bonds: true,
      realEstate: false,
      crypto: false,
      commodities: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRiskChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, riskTolerance: value[0] }))
  }

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => {
      const goals = [...prev.goals]
      if (goals.includes(goal)) {
        return { ...prev, goals: goals.filter((g) => g !== goal) }
      } else {
        return { ...prev, goals: [...goals, goal] }
      }
    })
  }

  const handlePreferenceToggle = (preference: keyof typeof formData.preferences) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference],
      },
    }))
  }

  const handleTimeHorizonChange = (value: string) => {
    setFormData((prev) => ({ ...prev, timeHorizon: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    // For now, we'll simulate generating recommendations
    const recommendations = generateRecommendations(formData)

    // Store recommendations in localStorage for the dashboard to use
    localStorage.setItem("investmentRecommendations", JSON.stringify(recommendations))

    // Navigate to the dashboard
    router.push("/dashboard")
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <Card className="p-6 shadow-lg border-t-4 border-t-[#800080]">
      <Tabs value={`step-${currentStep}`} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger
            value="step-1"
            onClick={() => setCurrentStep(1)}
            className={currentStep >= 1 ? "text-[#800080]" : ""}
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="step-2"
            onClick={() => setCurrentStep(2)}
            className={currentStep >= 2 ? "text-[#800080]" : ""}
          >
            Financial Goals
          </TabsTrigger>
          <TabsTrigger
            value="step-3"
            onClick={() => setCurrentStep(3)}
            className={currentStep >= 3 ? "text-[#800080]" : ""}
          >
            Risk Profile
          </TabsTrigger>
          <TabsTrigger
            value="step-4"
            onClick={() => setCurrentStep(4)}
            className={currentStep >= 4 ? "text-[#800080]" : ""}
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="step-1">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="income">Annual Income (USD)</Label>
                <Input
                  id="income"
                  name="income"
                  type="number"
                  placeholder="Enter your annual income"
                  value={formData.income}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expenses">Monthly Expenses (USD)</Label>
                <Input
                  id="expenses"
                  name="expenses"
                  type="number"
                  placeholder="Enter your monthly expenses"
                  value={formData.expenses}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="savings">Current Savings (USD)</Label>
                <Input
                  id="savings"
                  name="savings"
                  type="number"
                  placeholder="Enter your current savings"
                  value={formData.savings}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={nextStep} className="bg-[#800080] hover:bg-[#600060]">
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">What are your financial goals?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Retirement",
                    "Buying a Home",
                    "Education",
                    "Emergency Fund",
                    "Wealth Building",
                    "Starting a Business",
                  ].map((goal) => (
                    <div
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-3 border rounded-md cursor-pointer transition-all ${
                        formData.goals.includes(goal)
                          ? "border-[#800080] bg-purple-50"
                          : "border-gray-200 hover:border-[#800080]"
                      }`}
                    >
                      {goal}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Investment Time Horizon</h3>
                <RadioGroup
                  value={formData.timeHorizon}
                  onValueChange={handleTimeHorizonChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short">Short-term (1-3 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium-term (3-7 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="long" />
                    <Label htmlFor="long">Long-term (7+ years)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} className="bg-[#800080] hover:bg-[#600060]">
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-3">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Risk Tolerance</h3>
                <p className="text-gray-600 mb-6">
                  How comfortable are you with investment volatility? Higher risk may lead to higher returns but also
                  greater potential losses.
                </p>

                <div className="space-y-6">
                  <Slider
                    value={[formData.riskTolerance]}
                    onValueChange={handleRiskChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-md">
                    {formData.riskTolerance < 33 ? (
                      <p>
                        You prefer stable investments with lower risk and are willing to accept potentially lower
                        returns.
                      </p>
                    ) : formData.riskTolerance < 66 ? (
                      <p>
                        You're comfortable with moderate risk for the potential of better returns, while still
                        maintaining some stability.
                      </p>
                    ) : (
                      <p>You're willing to accept higher volatility and risk for the potential of maximum returns.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} className="bg-[#800080] hover:bg-[#600060]">
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Investment Preferences</h3>
                <p className="text-gray-600 mb-4">Select the types of investments you're interested in:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "stocks", label: "Stocks & ETFs" },
                    { id: "bonds", label: "Bonds & Fixed Income" },
                    { id: "realEstate", label: "Real Estate" },
                    { id: "crypto", label: "Cryptocurrency" },
                    { id: "commodities", label: "Commodities" },
                  ].map(({ id, label }) => (
                    <div
                      key={id}
                      onClick={() => handlePreferenceToggle(id as keyof typeof formData.preferences)}
                      className={`p-3 border rounded-md cursor-pointer transition-all ${
                        formData.preferences[id as keyof typeof formData.preferences]
                          ? "border-[#800080] bg-purple-50"
                          : "border-gray-200 hover:border-[#800080]"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
                <Button type="submit" className="bg-[#800080] hover:bg-[#600060]">
                  Generate Recommendations
                </Button>
              </div>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </Card>
  )
}

