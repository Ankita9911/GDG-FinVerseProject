"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameCardProps {
  title: string
  description: string
  imageUrl: string
  status: "live" | "coming-soon"
  link?: string
}

export function GameCard({ title, description, imageUrl, status, link }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-xl transform -translate-y-2" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </CardContent>

      <CardFooter className="pb-6">
        {status === "live" && link ? (
          <Link href={link} className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700">Play Now</Button>
          </Link>
        ) : (
          <Button className="w-full" variant="outline" disabled>
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

