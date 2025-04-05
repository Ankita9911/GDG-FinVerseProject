import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Link from "next/link";
export default function FeatureButton() {
    return (
      <Popover>
        {/* Button that triggers the pop-up */}
        <PopoverTrigger asChild>
          {/* <Button className="flex items-center gap-2 px-4 py-2 text-white" style={{ backgroundColor: "#800080" }}>
            Financial Hub
          </Button> */}
          <Button className="flex items-center gap-2 px-4 py-2 text-[#800080] bg-white border border-[#800080] hover:bg-[#800080] hover:text-white">
  Financial Hub
</Button>

        </PopoverTrigger>
  
        {/* Pop-up content */}
        <PopoverContent className="w-48 bg-white shadow-md rounded-md p-2">
          <div className="flex flex-col space-y-2">
            <Link href="https://financeytpath.vercel.app/">
              <Button variant="ghost" className="w-full text-[#800080]" >AI FinLearn Path</Button>
            </Link>
            <Link href="https://v0-new-project-oltqdc2avbx-06vpwz.vercel.app/">
              <Button variant="ghost" className="w-full text-[#800080]">InvestMate</Button>
            </Link>
            <Link href="http://127.0.0.1:5000/">
              <Button variant="ghost" className="w-full text-[#800080]">Personalised AI FinPlanner</Button>
            </Link>
            <Link href="http://127.0.0.1:5000/chatbot">
              <Button variant="ghost" className="w-full text-[#800080]">FinBot</Button>
            </Link>
            <Link href="http://127.0.0.1:5000/simulation">
              <Button variant="ghost" className="w-full text-[#800080]">ProfitPredict</Button>
            </Link>
            <Link href="http://127.0.0.1:5000/tax_savings">
              <Button variant="ghost" className="w-full text-[#800080]">SmartSave</Button>
            </Link>
            <Link href="https://v0-new-project-fug8e0mtfxy.vercel.app/">
              <Button variant="ghost" className="w-full text-[#800080]">FinZone</Button>
            </Link>
            <Link href="http://127.0.0.1:5000/followup">
              <Button variant="ghost" className="w-full text-[#800080]">Contact Us</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  


  