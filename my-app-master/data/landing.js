import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
    BookOpen,
    TrendingUpIcon,
    Gamepad,
  } from "lucide-react";
  
  // Stats Data
  export const statsData = [
    {
      value: "50K+",
      label: "Active Users",
    },
    {
      value: "$2B+",
      label: "Transactions Tracked",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
    {
      value: "4.9/5",
      label: "User Rating",
    },
  ];
  
  // Features Data
  export const featuresData = [
    {
      icon: <BarChart3 className="h-8 w-8 text-[#800080]" />,
      title: "Smart Budgeting",
      description:
        "Effortlessly plan and manage your monthly expenses with AI-driven budgeting tools.",
    },
    {
      icon: <TrendingUpIcon className="h-8 w-8 text-[#800080]" />,
      title: "Investment Suggestion",
      description: "Get personalized investment ideas based on your goals and risk profile with AI-backed recommendations.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-[#800080]" />,
      title: "AI Financial Learning Path",
      description: "Answer a few questions and unlock a personalized journey to master finance and investing.",
    },
    {
      icon: <Receipt className="h-8 w-8 text-[#800080]" />,
      title: "Investment Insights",
      description:
        "Receive personalized stock recommendations and portfolio optimization strategies.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-[#800080]" />,
      title: "AI Financial Assistant",
      description: "Get real-time financial guidance through our AI-powered chatbot.  ",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-[#800080]" />,
      title: "Tax Optimization",
      description: "Maximize savings with automated tax planning and smart deduction strategies.",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#800080]" />,
      title: "Future Planning",
      description: "Prepare for a secure future with tailored financial and retirement planning tools.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#800080]" />,
      title: "Smart Expense Tracking",
      description: "Track your income and expenses in real-time, categorized for better financial clarity.  ",
    },
    {
      icon: <Gamepad className="h-8 w-8 text-[#800080]" />,
      title: "Financial Games & Challenges",
      description: "Learn finance the fun way! Play interactive games to improve budgeting, investing, and saving skills.",
    },
  ];
  

  export const howItWorksData = [
    {
      icon: (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#800080]">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
      ),
      title: "1. Set Up Your Smart Finance Hub",
      description:
        "Get started in minutes with our secure sign-up — access personalized tools for budgeting, saving, investing, and more.",
    },
    {
      icon: (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#800080]">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
      ),
      title: "2. Track, Plan & Grow",
      description:
        "Monitor your expenses, set budgets, and track investments in real-time. Get smart tax-saving suggestions and future planning support.",
    },
    {
      icon: (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#800080]">
          <PieChart className="h-8 w-8 text-white" />
        </div>
      ),
      title: "3. Learn & Get Expert Recommendations",
      description:
        "Receive AI-powered insights, curated stock recommendations, and tax optimization strategies — plus boost your financial literacy with bite-sized lessons and tools.",
    },
  ];
  
  
  // Testimonials Data
  export const testimonialsData = [
    {
      name: "Ankita Thakur",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      quote:
        "FinVerse has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
    },
    {
      name: "David Mathew",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "Tax optimization made simple: Navigating the Indian tax system always felt daunting. FinVerse clearly laid out my options for saving tax, suggesting relevant schemes like ELSS and PPF. It took the complexity out of the process and helped me make informed decisions to save more.",
    },
    {
      name: "Aanya Singh",
      role: "Financial Advisor",
      image: "https://randomuser.me/api/portraits/women/74.jpg",
      quote:
        "The chatbot is incredibly helpful! I had so many quick questions about tax deductions relevant here in India, and the chatbot provided clear and instant answers. It's like having a knowledgeable assistant available 24/7.",
    },
  ];