import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QuizGame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg border border-purple-300 p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">Finance Quiz Game</h1>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-800 mb-4">
            Welcome to the Finance Quiz Game! Test your knowledge about personal finance, investing, and money
            management.
          </p>
          <p className="text-gray-600 mb-8">
            This is where the actual quiz game would be implemented. For now, this is a placeholder.
          </p>

          <div className="space-y-4">
            <Button className="w-full max-w-md bg-purple-600 text-white hover:bg-purple-700">
              Start Quiz
            </Button>

            <Link href="/">
              <Button variant="outline" className="w-full max-w-md border-purple-600 text-purple-700 hover:bg-purple-100">
                Back to Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

