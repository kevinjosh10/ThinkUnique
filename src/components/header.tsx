"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-accent"><rect width="256" height="256" fill="none"></rect><path d="M139.4,24.9,225,80.1a16,16,0,0,1,8.9,15.3V160.8a16,16,0,0,1-8.9,15.3l-85.6,55.2a16.2,16.2,0,0,1-16.8,0L31,176.1a16,16,0,0,1-8.9-15.3V95.4a16,16,0,0,1,8.9-15.3L113.6,24.9a16.2,16.2,0,0,1,16.8,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M178.4,128,128,157.8,77.6,128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="128" y1="232" x2="128" y2="157.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M228.4,85.2,178.4,128l-23.7-14.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M36.1,90.4,77.6,128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            <span className="hidden font-bold sm:inline-block font-headline">
              ThinQnique'26
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              href="/problem-statements"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Themes
            </Link>
            <Link
              href="/instructions"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Instructions
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-accent"><rect width="256" height="256" fill="none"></rect><path d="M139.4,24.9,225,80.1a16,16,0,0,1,8.9,15.3V160.8a16,16,0,0,1-8.9,15.3l-85.6,55.2a16.2,16.2,0,0,1-16.8,0L31,176.1a16,16,0,0,1-8.9-15.3V95.4a16,16,0,0,1,8.9-15.3L113.6,24.9a16.2,16.2,0,0,1,16.8,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M178.4,128,128,157.8,77.6,128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="128" y1="232" x2="128" y2="157.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M228.4,85.2,178.4,128l-23.7-14.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M36.1,90.4,77.6,128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
                      <span className="font-bold font-headline">ThinQnique'26</span>
                  </Link>
                  <Link href="/problem-statements" onClick={() => setIsOpen(false)} className="text-muted-foreground transition-colors hover:text-foreground">
                    Themes
                  </Link>
                  <Link href="/instructions" onClick={() => setIsOpen(false)} className="text-muted-foreground transition-colors hover:text-foreground">
                    Instructions
                  </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex items-center justify-end space-x-2 md:flex-1">
           <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
             <Link href="/register">Register Now</Link>
           </Button>
        </div>
      </div>
    </header>
  );
}