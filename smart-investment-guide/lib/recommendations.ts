import type { InvestmentRecommendation, UserFinancialData } from "./types"

export function generateRecommendations(userData: UserFinancialData): InvestmentRecommendation {
  // In a real application, this would be a complex algorithm or AI model
  // For this demo, we'll create some sample recommendations based on the user data

  const income = Number.parseInt(userData.income) || 0
  const expenses = Number.parseInt(userData.expenses) || 0
  const savings = Number.parseInt(userData.savings) || 0
  const age = Number.parseInt(userData.age) || 30

  // Calculate monthly investment capacity (simplified)
  const monthlyInvestment = Math.round((income / 12) * 0.2) // Assume 20% of monthly income

  // Determine risk level based on risk tolerance and age
  let riskLevel = "Moderate"
  if (userData.riskTolerance < 30) {
    riskLevel = "Conservative"
  } else if (userData.riskTolerance > 70) {
    riskLevel = "Aggressive"
  }

  // Adjust expected return based on risk level
  let expectedReturn = 7 // Default moderate return
  if (riskLevel === "Conservative") {
    expectedReturn = 5
  } else if (riskLevel === "Aggressive") {
    expectedReturn = 10
  }

  // Create portfolio allocation based on risk level and preferences
  const allocation = createAllocation(userData, riskLevel)

  // Generate recommended investments
  const investments = generateInvestments(userData, riskLevel)

  // Create sample goals with random progress
  const goals = userData.goals.map((goal) => ({
    name: goal,
    progress: Math.floor(Math.random() * 100),
  }))

  // Generate market insights
  const insights = [
    {
      title: "Market Trend Analysis",
      description:
        "Current market indicators suggest a cautiously optimistic outlook for equities in the coming quarter, with potential volatility in tech sectors.",
    },
    {
      title: "Interest Rate Impact",
      description:
        "Recent central bank policies may affect fixed-income investments. Consider adjusting bond allocations to shorter durations.",
    },
    {
      title: "Sector Spotlight",
      description:
        "Healthcare and renewable energy sectors show promising growth potential based on current economic and policy trends.",
    },
    {
      title: "Global Market Opportunities",
      description:
        "Emerging markets in Southeast Asia present interesting diversification opportunities for growth-oriented investors.",
    },
  ]

  return {
    monthlyInvestment,
    expectedReturn,
    riskLevel,
    allocation,
    goals,
    investments,
    insights,
  }
}

function createAllocation(
  userData: UserFinancialData,
  riskLevel: string,
): Array<{ assetClass: string; percentage: number }> {
  // Base allocations adjusted by risk level
  let stocks = 40
  let bonds = 30
  let realEstate = 15
  let alternatives = 10
  let cash = 5

  if (riskLevel === "Conservative") {
    stocks = 25
    bonds = 45
    realEstate = 10
    alternatives = 5
    cash = 15
  } else if (riskLevel === "Aggressive") {
    stocks = 60
    bonds = 15
    realEstate = 15
    alternatives = 10
    cash = 0
  }

  // Adjust based on user preferences
  const allocation = []

  if (userData.preferences.stocks) {
    allocation.push({ assetClass: "Stocks", percentage: stocks })
  } else {
    // Redistribute stocks allocation
    bonds += stocks / 2
    realEstate += stocks / 2
  }

  if (userData.preferences.bonds) {
    allocation.push({ assetClass: "Bonds", percentage: bonds })
  } else {
    // Redistribute bonds allocation
    stocks += bonds / 2
    cash += bonds / 2
  }

  if (userData.preferences.realEstate) {
    allocation.push({ assetClass: "Real Estate", percentage: realEstate })
  } else {
    // Redistribute real estate allocation
    stocks += realEstate / 2
    bonds += realEstate / 2
  }

  if (userData.preferences.crypto || userData.preferences.commodities) {
    allocation.push({ assetClass: "Alternative Assets", percentage: alternatives })
  } else {
    // Redistribute alternatives allocation
    stocks += alternatives / 2
    bonds += alternatives / 2
  }

  allocation.push({ assetClass: "Cash", percentage: cash })

  return allocation
}

function generateInvestments(userData: UserFinancialData, riskLevel: string): Array<any> {
  const investments = []

  // Stocks
  if (userData.preferences.stocks) {
    if (riskLevel === "Conservative") {
      investments.push({
        name: "Dividend ETF",
        type: "Exchange Traded Fund",
        riskLevel: "Low",
        expectedReturn: 5,
        allocation: 15,
        description: "A diversified ETF focusing on stable companies with consistent dividend payments.",
      })
    } else if (riskLevel === "Moderate") {
      investments.push({
        name: "S&P 500 Index Fund",
        type: "Index Fund",
        riskLevel: "Medium",
        expectedReturn: 8,
        allocation: 25,
        description: "Broad market exposure to the largest 500 US companies.",
      })
    } else {
      investments.push({
        name: "Growth Stock ETF",
        type: "Exchange Traded Fund",
        riskLevel: "High",
        expectedReturn: 12,
        allocation: 35,
        description: "Focused on high-growth companies with potential for significant capital appreciation.",
      })
    }
  }

  // Bonds
  if (userData.preferences.bonds) {
    if (riskLevel === "Conservative") {
      investments.push({
        name: "Government Bond Fund",
        type: "Bond Fund",
        riskLevel: "Low",
        expectedReturn: 3,
        allocation: 30,
        description: "Invests primarily in government securities with high credit quality.",
      })
    } else if (riskLevel === "Moderate") {
      investments.push({
        name: "Corporate Bond Fund",
        type: "Bond Fund",
        riskLevel: "Medium",
        expectedReturn: 5,
        allocation: 20,
        description: "Diversified exposure to investment-grade corporate bonds.",
      })
    } else {
      investments.push({
        name: "High Yield Bond Fund",
        type: "Bond Fund",
        riskLevel: "Medium",
        expectedReturn: 7,
        allocation: 10,
        description: "Invests in higher-yielding, lower-rated corporate bonds for increased income potential.",
      })
    }
  }

  // Real Estate
  if (userData.preferences.realEstate) {
    investments.push({
      name: "REIT Index Fund",
      type: "Real Estate Investment Trust",
      riskLevel: "Medium",
      expectedReturn: 6,
      allocation: 15,
      description: "Provides exposure to a diversified portfolio of real estate assets across various sectors.",
    })
  }

  // Crypto
  if (userData.preferences.crypto) {
    investments.push({
      name: "Cryptocurrency ETF",
      type: "Alternative Investment",
      riskLevel: "High",
      expectedReturn: 15,
      allocation: 5,
      description: "Regulated fund providing exposure to a basket of established cryptocurrencies.",
    })
  }

  // Commodities
  if (userData.preferences.commodities) {
    investments.push({
      name: "Commodities Fund",
      type: "Alternative Investment",
      riskLevel: "Medium",
      expectedReturn: 6,
      allocation: 5,
      description: "Diversified exposure to various commodities including precious metals, energy, and agriculture.",
    })
  }

  // Add a cash/money market option for all profiles
  investments.push({
    name: "Money Market Fund",
    type: "Cash Equivalent",
    riskLevel: "Low",
    expectedReturn: 2,
    allocation: 5,
    description: "Highly liquid investment for emergency funds and short-term goals.",
  })

  return investments
}

