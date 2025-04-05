import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Investment } from "@/lib/types"

export function InvestmentCard({ investment }: { investment: Investment }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-[#800080]"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{investment.name}</CardTitle>
          <Badge
            variant={
              investment.riskLevel === "Low"
                ? "outline"
                : investment.riskLevel === "Medium"
                  ? "secondary"
                  : "destructive"
            }
          >
            {investment.riskLevel} Risk
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{investment.type}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Expected Return</p>
              <p className="font-medium">{investment.expectedReturn}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Recommended Allocation</p>
              <p className="font-medium">{investment.allocation}%</p>
            </div>
          </div>

          <p className="text-sm text-gray-600">{investment.description}</p>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              Learn More
            </Button>
            <Button size="sm" className="flex-1 bg-[#800080] hover:bg-[#600060]">
              Invest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

