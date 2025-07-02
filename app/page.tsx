import HomeNavbar from "@/components/navigation/home-navbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[1000px]">
      <HomeNavbar />
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background image */}
        <Image
          fill
          src="/homeimg.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay biru */}
        <div className="absolute inset-0 bg-chart-2 opacity-86" />
        {/* Konten hero */}
        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <span className="text-white text-sm mb-2">Blog genzet</span>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-2">
            The Journal : Design Resources,
            <br />
            Interviews, and Industry News
          </h1>
          <p className="text-white text-lg mb-6 text-center">
            Your daily dose of design insights!
          </p>

          <div className="w-full max-w-xl bg-primary p-2 rounded-xl">
            <div className="w-full mx-auto flex gap-2 items-center">
              <div className="flex-shrink-0">
                <Select>
                  <SelectTrigger className="w-[200px] bg-white border-0 font-medium">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="getting-started">
                      Getting Started
                    </SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                    <SelectItem value="troubleshooting">
                      Troubleshooting
                    </SelectItem>
                    <SelectItem value="api">API Documentation</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles"
                  className="pl-10 bg-white border-0 text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
