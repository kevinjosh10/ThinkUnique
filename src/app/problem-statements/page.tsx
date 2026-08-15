
import ProblemStatementsList from "@/components/problem-statements-list";
import { problemStatements } from "@/app/problem-statements/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProblemStatementsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Problem Statements</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose a challenge that inspires your team to innovate.</p>
        <Button asChild variant="secondary" className="mt-6">
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
