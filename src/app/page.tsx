
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';

export default function Home() {
  return (
    <div className="container relative h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center py-16">
      <div className="absolute inset-0 -z-10 size-full bg-[radial-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="[perspective:800px] mb-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tighter text-gradient-brand animate-float-3d" style={{'--float-delay': '0s'} as React.CSSProperties}>
          ThinQnique'26
        </h1>
      </div>
      
      <p className="text-2xl md:text-3xl font-headline text-primary/80 mb-8 animate-fade-in-down animation-delay-300">
        Internal Hackathon 2026
      </p>
      <p className="max-w-3xl mx-auto text-base md:text-lg text-foreground/80 mb-10 animate-fade-in-up animation-delay-500">
        Join us for an electrifying journey of innovation and collaboration. Build groundbreaking solutions, showcase your exceptional skills, and compete for the chance to represent our institution at the prestigious Smart India Hackathon. Let&apos;s forge the future, together.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-700">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20">
          <Link href="/instructions">
            Read Instructions
            <Info className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="transition-all duration-300 transform hover:scale-105 hover:bg-primary/10 border-primary/30">
          <Link href="/problem-statements">View Themes</Link>
        </Button>
      </div>
    </div>
  );
}
