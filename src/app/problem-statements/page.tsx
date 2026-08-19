
import ProblemStatementsList from "@/components/problem-statements-list";
import { problemStatements } from "@/app/problem-statements/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProblemStatementsPage() {
  return (
    <div className="container pt-32 pb-12 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Themes</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">There are 17 themes, each featuring a Software and a Hardware track. Select a theme and start working on a problem statement of your choice (you can take reference from previous year statements too).</p>
        <Button asChild variant="outline" className="mt-6 border-blue-500/20 bg-blue-500/10 text-blue-100 hover:bg-blue-600 hover:text-white transition-all">
            <Link href="https://www.sih.gov.in/sih2025PS" target="_blank">
                Know More
                <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>
      <ProblemStatementsList statements={problemStatements} />
    </div>
  );
}
