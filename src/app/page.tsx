"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InteractiveSynapseNetwork from '@/components/ui/interactive-synapse-network';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-57px)] w-full overflow-hidden">
      <InteractiveSynapseNetwork
        nodeColor="rgba(0,220,255,0.8)"
        pulseColor="rgba(255,255,255,1)"
        nodeCount={60}
        connectionRadius={180}
        trailOpacity={0.15}
      >
        <div className="h-full w-full flex flex-col items-center justify-center text-center select-none z-10 px-6 max-w-4xl mx-auto">
          <div className="px-8 py-6 bg-black/20 backdrop-blur-sm rounded-xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tighter text-cyan-200" style={{ textShadow: '0 0 5px #00dcff, 0 0 10px #00dcff' }}>
              ThinQnique'26
            </h1>
            <h2 className="mt-2 text-2xl md:text-3xl font-headline text-cyan-200/70 tracking-wider">
              Internal Hackathon 2026
            </h2>
          </div>
          
          <p className="mt-8 px-6 py-4 text-base md:text-lg text-cyan-100/90 max-w-3xl font-mono font-bold bg-black/20 backdrop-blur-[3px] rounded-xl shadow-lg border border-cyan-500/10">
            Join us for an electrifying journey of innovation and collaboration. Build groundbreaking solutions, showcase your exceptional skills, and compete for the chance to represent our institution at the prestigious Smart India Hackathon. Let&apos;s forge the future, together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,220,255,0.5)] border-none">
              <Link href="/instructions">
                Read Instructions
                <Info className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="transition-all duration-300 transform hover:scale-105 hover:bg-cyan-900/30 border-cyan-500/50 text-cyan-200">
              <Link href="/problem-statements">View Themes</Link>
            </Button>
          </div>
        </div>
      </InteractiveSynapseNetwork>
    </div>
  );
}
