"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/70 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2" 
          : "bg-transparent border-b border-transparent py-4"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex h-12 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center text-black font-bold text-xs transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              TQ
            </div>
            <span className="hidden font-bold sm:inline-block font-headline tracking-tight text-white transition-opacity group-hover:opacity-80 text-lg">
              ThinQnique
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/problem-statements" className="text-white/60 hover:text-white transition-colors tracking-wide">
              Themes
            </Link>
            <Link href="/instructions" className="text-white/60 hover:text-white transition-colors tracking-wide">
              Instructions
            </Link>
          </nav>
        </div>
        
        <div className="flex md:hidden justify-end">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/95 border-white/10 text-white backdrop-blur-xl">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                      <div className="h-6 w-6 rounded bg-white flex items-center justify-center text-black font-bold text-xs">TQ</div>
                      <span className="font-bold font-headline">ThinQnique</span>
                  </Link>
                  <Link href="/problem-statements" onClick={() => setIsOpen(false)} className="text-white/60 transition-colors hover:text-white">
                    Themes
                  </Link>
                  <Link href="/instructions" onClick={() => setIsOpen(false)} className="text-white/60 transition-colors hover:text-white">
                    Instructions
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-white text-black font-medium transition-colors hover:bg-white/90">
                    Register Now
                  </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex items-center justify-end">
           <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-all h-9 px-6 text-sm font-medium">
             <Link href="/register">Register Now</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}