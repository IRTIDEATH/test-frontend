"use client"

import { Computer } from "lucide-react";
import Link from "next/link";
import { HomeUserMenu } from "./home-user-menu";
import { useEffect, useState } from "react";

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 px-14 py-6 ${
        scrolled
          ? "bg-white/40 backdrop-blur-xs text-secondary-foreground"
          : "bg-transparent text-primary-foreground"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <Link href="/" className={`flex items-center gap-2`}>
          <Computer />
          <span className="text-xl font-semibold">Logoipsum</span>
        </Link>
        {/* Right side */}
        <HomeUserMenu scrolled={scrolled} />
      </div>
    </header>
  );
};

export default HomeNavbar;
