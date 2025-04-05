import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
  
    <div className="min-h-screen bg-white">
  <main className="container mx-auto px-4 py-16">
    <div className="flex flex-col items-center text-center mb-16">
      <a
  href="https://my-app-im5d-ankitas-projects-ceef2db6.vercel.app/"
  className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
>
  Home
</a>

      <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8">
        Your personalized financial advisor that helps you make smarter investment decisions based on your unique
        financial profile.
      </p>
          <Link href="/onboarding">
            <Button className="bg-[#800080] hover:bg-[#600060] text-white px-8 py-6 text-lg rounded-lg">
              Start Your Investment Journey
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Personalized Recommendations"
            description="Get investment recommendations tailored to your financial goals, risk appetite, and preferences."
            icon="📊"
          />
          <FeatureCard
            title="Optimal Asset Allocation"
            description="Discover the ideal mix of investment products to maximize returns while managing risk."
            icon="⚖️"
          />
          <FeatureCard
            title="Real-time Insights"
            description="Access up-to-date market information and insights to make informed decisions."
            icon="📈"
          />
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-[#800080] mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard
              number="1"
              title="Share Your Profile"
              description="Tell us about your income, age, and financial situation."
            />
            <StepCard number="2" title="Define Your Goals" description="Set clear financial objectives and timeline." />
            <StepCard
              number="3"
              title="Assess Risk Tolerance"
              description="Determine how much risk you're comfortable with."
            />
            <StepCard number="4" title="Get Recommendations" description="Receive AI-powered investment strategies." />
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card className="border border-gray-200 hover:border-[#800080] transition-all">
      <CardContent className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-[#800080] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#800080] text-white flex items-center justify-center text-xl font-bold mb-3">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

