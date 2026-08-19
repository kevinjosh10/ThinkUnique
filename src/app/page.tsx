"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import InteractiveSynapseNetwork from '@/components/ui/interactive-synapse-network';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [introStage, setIntroStage] = useState(0);
  const [skipIntro, setSkipIntro] = useState(true); // default true to avoid flash on hydration

  useEffect(() => {
    // Check removed for development
    setSkipIntro(false);
    document.body.style.overflow = 'hidden';

    // 0: Initial black screen
    // 1: Text slowly expands from center (4 seconds)
    // 2: Network starts appearing node-by-node (3 seconds), overlapping with text
    // 3: Intro complete
    const t1 = setTimeout(() => setIntroStage(1), 200);
    const t2 = setTimeout(() => {
        setIntroStage(2);
    }, 2000); // Start nodes while text is still expanding
    const t3 = setTimeout(() => {
        setIntroStage(3);
        document.body.style.overflow = '';
    }, 5000); // 3 seconds after t2 for nodes to finish

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-black relative">
      
      {/* Global Black Overlay - Covers the layout Header (z-50) so the screen starts purely black */}
      {!skipIntro && introStage < 3 && (
        <div className={cn(
          "fixed inset-0 z-[60] bg-black transition-opacity duration-[2000ms] pointer-events-none",
          introStage >= 2 ? "opacity-0" : "opacity-100"
        )} />
      )}

      {/* Background Network - Individual nodes will reveal themselves via the isRevealing prop */}
      <div className="absolute inset-0">
        <InteractiveSynapseNetwork
          nodeColor="rgba(59,130,246,0.3)" // blue-500
          pulseColor="rgba(96,165,250,1)"  // blue-400
          nodeCount={45}
          connectionRadius={150}
          trailOpacity={0.1}
          isRevealing={skipIntro || introStage >= 2}
        />
      </div>

      {/* Main Content Layer (z-[70] during intro to sit above the global black overlay, drops to z-10 after) */}
      <div className={cn(
          "h-full w-full flex flex-col items-center justify-center text-center relative px-6 max-w-5xl mx-auto",
          (!skipIntro && introStage < 3) ? "z-[70]" : "z-10"
      )}>
        
        {/* The large white/blue blur behind the text */}
        <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/[0.04] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none transition-opacity duration-1000",
            (!skipIntro && introStage < 2) ? "opacity-0" : "opacity-100"
        )} />

        <div className="h-[28px] sm:h-[32px] mb-6 sm:mb-8 flex items-center justify-center relative w-full">
            {/* The Registration Pill */}
            <Link 
              href="/register" 
              className={cn(
                "inline-flex absolute items-center gap-2 px-3 py-1 rounded-full bg-blue-500/[0.05] border border-blue-500/[0.15] hover:bg-blue-500/[0.1] transition-all duration-1000",
                (!skipIntro && introStage < 2) ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
              )}
            >
              <span className="text-[10px] sm:text-xs font-medium text-blue-100/60 tracking-widest uppercase">Registration Open</span>
              <ChevronRight className="h-3 w-3 text-blue-400/50" />
            </Link>
        </div>

        <h1 
          className={cn(
            "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 animate-text-shimmer mb-4 sm:mb-6 transition-all duration-[4000ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
            (!skipIntro && introStage < 1) ? "[clip-path:inset(0_50%_0_50%)] blur-sm opacity-0" : "[clip-path:inset(0_0_0_0)] blur-none opacity-100"
          )}
        >
          ThinQnique <span className="font-light text-neutral-500 block sm:inline">'26</span>
        </h1>
        
        <p 
          className={cn(
            "text-lg sm:text-xl md:text-2xl text-white/50 tracking-tight font-medium max-w-2xl mb-12 transition-all duration-[2000ms]",
            (!skipIntro && introStage < 2) ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          The premier internal hackathon defining the future of innovation. Build solutions, showcase excellence, and forge the future.
        </p>

        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center transition-all duration-[2000ms] delay-100",
            (!skipIntro && introStage < 2) ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
          )}
        >
          <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 bg-blue-600 text-white hover:bg-blue-500 transition-all rounded-full font-medium text-base shadow-[0_0_20px_rgba(37,99,235,0.3)] group">
            <Link href="/register" className="w-full flex justify-center items-center">
              Register Team
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/15 text-blue-100 transition-all font-medium text-base backdrop-blur-sm group">
            <Link href="/problem-statements" className="w-full flex justify-center items-center">
              Explore Themes
              <ChevronRight className="ml-2 h-4 w-4 text-blue-400/50 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
