export interface PortfolioAllocation {
  assetClass: string
  percentage: number
}

export interface Goal {
  name: string
  progress: number
}

export interface Investment {
  name: string
  type: string
  riskLevel: "Low" | "Medium" | "High"
  expectedReturn: number
  allocation: number
  description: string
}

export interface Insight {
  title: string
  description: string
}

export interface InvestmentRecommendation {
  monthlyInvestment: number
  expectedReturn: number
  riskLevel: string
  allocation: PortfolioAllocation[]
  goals: Goal[]
  investments: Investment[]
  insights: Insight[]
}

export interface UserFinancialData {
  age: string
  income: string
  expenses: string
  savings: string
  goals: string[]
  timeHorizon: string
  riskTolerance: number
  preferences: {
    stocks: boolean
    bonds: boolean
    realEstate: boolean
    crypto: boolean
    commodities: boolean
  }
}

