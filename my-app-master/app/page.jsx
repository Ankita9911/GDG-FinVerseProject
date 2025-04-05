"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const injectScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    injectScript("https://cdn.botpress.cloud/webchat/v2.3/inject.js");
    injectScript("https://files.bpcontent.cloud/2025/04/05/20/20250405203350-YUI4KOAD.js");
  }, []);
  return (
    <div className="mt-40">
       <HeroSection/> 
      <section className="py-20 bg-[#C27AC2]"> 
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData,index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-black-600 mb-2">{statsData.value}</div>
                <div className="text-gray-600">{statsData.label}</div>

              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-[#800080] mb-12">
      Explore Our Features
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Link href="https://financeytpath.vercel.app/">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          AI Financial Learning Path
        </button>
      </Link>
      <Link href="https://v0-new-project-oltqdc2avbx-06vpwz.vercel.app/">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          InvestMate
        </button>
      </Link>
      <Link href="http://127.0.0.1:5000/">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          AI FinPlanner
        </button>
        </Link>
      <Link href="http://127.0.0.1:5000/chatbot">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          FinBot
        </button>
      </Link>
      <Link href="http://127.0.0.1:5000/simulation">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          ProfitPredict
        </button>
      </Link>
      <Link href="http://127.0.0.1:5000/tax_savings">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          SmartSave
        </button>
      </Link>
      <Link href="https://v0-new-project-fug8e0mtfxy.vercel.app/">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          FinZone
        </button>
      </Link>
      <Link href="/dashboard">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          Dashboard
        </button>
      </Link>
      <Link href="/transaction/create">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          Add Transactions
        </button>
      </Link>
      <Link href="http://127.0.0.1:5000/followup">
        <button className="w-full bg-white border-2 border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white font-semibold py-3 px-5 rounded-2xl shadow transition duration-300">
          Contact Us
        </button>
      </Link>
    </div>
  </div>
</section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to manage your finances and make investment decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            { featuresData.map((feature,index)=>(
              <Card key={index} className="p-6">
              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className=" text-gray-600">{feature.description}</p>
              </CardContent>
              
            </Card>
            
            ))}
          </div>
        </div>
   
      </section>

      <section className="py-20 bg-[#C27AC2]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index)=>(
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex item-center justify-center mx-auto mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-800">{step.description}</p>
              </div>
            
            ))}
          </div>
        </div>
   
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            { testimonialsData.map((testimonial, index)=>(
              <Card key={index} className="p-6">
              <CardContent className="pt-4">
                <div className="flex items-centre mb-4">
                 <Image 
                 src={testimonial.image}
                 alt={testimonial.name}
                 width={40}
                 height={40}
                 className="rounded-full"
                 />
                 <div className="ml-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                 </div>
                </div>
                <p className="text-gray-600">{testimonial.quote}</p>
                 </CardContent>
              
            </Card>
            
            ))}
          </div>
        </div>
   
      </section>
      <section className="py-20 bg-[#800080]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take Control of Your Financial and Investment Decision decisions?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              
             We are here to help you, Join thousands of users who are already managing and investing their finances
              smarter with FinVerse
            </p>
            <Link href="/dashboard">
              <Button
                 size="lg"
                 className="bg-white text-[#800080] hover:bg-blue-50 animate-bounce"
               >
                  Get Started Now
             </Button>
            </Link>
          
        </div>
   
      </section>

    </div>
   
     );
}
