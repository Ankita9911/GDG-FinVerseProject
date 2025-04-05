import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import FeatureButton from "@/app/(main)/FeatureButton/page";
const Header =async () => {
  await checkUser();
 
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
        <Image
        src={'/image.png'} alt="website logo" height={100} width={800}
        className="h-18 w-auto object-contain"
        />
        </Link>
        <div className="flex items-center space-x-4">  
        <SignedIn>
            {/* <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link> */}
            <Link
  href="/dashboard"
  className="text-[#800080] hover:text-purple-700 flex items-center gap-2"
>
  <Button variant="outline" className="text-[#800080] border-[#800080] hover:bg-[#800080] hover:text-white">
    <LayoutDashboard size={18} />
    <span className="hidden md:inline">Dashboard</span>
  </Button>
</Link>

            {/* <Link href="/transaction/create">
              <Button  className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link> */}
           <Link href="/transaction/create">
  <Button className="flex items-center gap-2 bg-[#800080] text-white hover:bg-purple-700">
    <PenBox size={18} />
    <span className="hidden md:inline">Add Transaction</span>
  </Button>
</Link>
<Link href="">
                   <span className="hidden md:inline ">   <FeatureButton /></span>
              
            </Link>
          </SignedIn>

       <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
              <Button variant='outline' className="text-[#800080] border-[#800080] hover:bg-[#800080] hover:text-white">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
               appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              />
            </SignedIn>
            </div>
            </nav>
    </div>
  )
}

export default Header;
