"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import type { InvestmentRecommendation } from "@/lib/types"
import { PieChart } from "@/components/pie-chart"
import { InvestmentCard } from "@/components/investment-card"

export default function DashboardPage() {
  const [recommendations, setRecommendations] = useState<InvestmentRecommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this from your API
    const storedRecommendations = localStorage.getItem("investmentRecommendations")
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#800080] border-r-[#800080] border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#800080] font-medium">Generating your personalized investment plan...</p>
        </div>
      </div>
    )
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h2 className="text-2xl font-bold text-[#800080] mb-4">No recommendations found</h2>
          <p className="text-gray-600 mb-6">
            Please complete the onboarding process to get your personalized investment recommendations.
          </p>
          <a href="/onboarding" className="bg-[#800080] hover:bg-[#600060] text-white px-4 py-2 rounded-md">
            Go to Onboarding
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#800080] mb-6">Your Investment Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Recommended Monthly Investment"
            value={`$${recommendations.monthlyInvestment}`}
            description="Based on your income and expenses"
          />
          <SummaryCard
            title="Expected Annual Return"
            value={`${recommendations.expectedReturn}%`}
            description="Based on historical performance"
          />
          <SummaryCard
            title="Risk Level"
            value={recommendations.riskLevel}
            description="Based on your risk tolerance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#800080]">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PieChart data={recommendations.allocation} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#800080]">Investment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.goals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-gray-500">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="recommendations">Recommended Investments</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.investments.map((investment, index) => (
                <InvestmentCard key={index} investment={investment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.insights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-[#800080]">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function SummaryCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold text-[#800080] mb-2">{value}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

