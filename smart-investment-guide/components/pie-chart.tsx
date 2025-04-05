"use client"

import { useEffect, useRef } from "react"
import type { PortfolioAllocation } from "@/lib/types"

export function PieChart({ data }: { data: PortfolioAllocation[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Colors for different asset classes
    const colors = [
      "#800080", // Primary purple
      "#9932CC", // Darker purple
      "#BA55D3", // Medium purple
      "#DA70D6", // Orchid
      "#DDA0DD", // Plum
      "#EE82EE", // Violet
    ]

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.percentage, 0)

    // Draw pie chart
    let startAngle = 0

    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.percentage) / total

      ctx.fillStyle = colors[index % colors.length]
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2 - 10,
        startAngle,
        startAngle + sliceAngle,
      )
      ctx.closePath()
      ctx.fill()

      startAngle += sliceAngle
    })

    // Add legend
    const legendY = canvas.height - data.length * 25

    data.forEach((item, index) => {
      const y = legendY + index * 25

      // Draw color box
      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(20, y, 15, 15)

      // Draw text
      ctx.fillStyle = "#333"
      ctx.font = "14px Arial"
      ctx.fillText(`${item.assetClass} (${item.percentage}%)`, 45, y + 12)
    })
  }, [data])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

