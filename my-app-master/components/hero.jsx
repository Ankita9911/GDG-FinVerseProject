
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
    const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
<section className="pt-40 pb-20 px-4">
<div className="container mx-auto text-center">
  <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
  Smart Financial <br /> Management with AI
  </h1>
  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
  Empower your FinVerse journey with our AI-driven platform. Get personalized budget planning with FinBot, tailored learning video recommendations, smart investment suggestions (stocks, SIPs, and more), profit predictions, and optimized tax and savings strategies—all in one place.
  </p>
  <div className="flex justify-center space-x-4">
    {/* <Link href="/dashboard">
      <Button size="lg" className="px-8">
        Get Started
      </Button>
    </Link>
    <Link href="https://www.youtube.com/roadsidecoder">
      <Button size="lg" variant="outline" className="px-8">
        Watch Demo
      </Button>
    </Link> */}
    <Link href="/dashboard">
  <Button size="lg" className="px-8 bg-[#800080] text-white hover:bg-purple-700">
    Get Started
  </Button>
</Link>
<Link href="https://www.youtube.com/roadsidecoder">
  <Button size="lg" variant="outline" className="px-8 text-[#800080] border-[#800080] hover:bg-[#800080] hover:text-white">
    Watch Demo
  </Button>
</Link>

  </div>
  <div className="hero-image-wrapper mt-5 md:mt-0">
    <div ref={imageRef} className="hero-image">
      <Image
        src="/Landingimg.jpeg"
        width={1200}
        height={600}
        alt="Dashboard Preview"
        className="rounded-lg shadow-2xl border mx-auto"
        priority
      />
    </div>
  </div>
</div>
</section>
  );
};

export default HeroSection;

