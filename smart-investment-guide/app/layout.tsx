import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Smart Investment Guide",
  description: "Your personalized financial advisor for smarter investment decisions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="min-h-screen bg-white">
            <header className="border-b border-gray-200">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-xl font-bold text-[#800080]">
                  
                </a>
               

                <a href="/onboarding" className="bg-[#800080] hover:bg-[#600060] text-white px-4 py-2 rounded-md">
                  Start Now
                </a>
              </div>
            </header>
            {children}
            <footer className="bg-gray-50 border-t border-gray-200 mt-12">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">© 2023 Smart Investment Guide. All rights reserved.</p>
                  <p className="text-sm text-gray-500">
                    This is a demo application. Investment information is simulated and not financial advice.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'