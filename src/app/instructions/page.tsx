import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, FileText, Users } from "lucide-react";
import Link from "next/link";

const presentationRules = [
  "Maximum of 6 slides, including the title slide.",
  "Emphasize points, diagrams, and infographics over long paragraphs.",
  "Strictly use the provided template without altering its core structure.",
  "You will be asked to upload your presentation via a Google Form link provided after registration."
];

const teamCriteria = [
  "A team must consist of exactly 6 members, including the team leader.",
  "At least one female member must be part of the team.",
  "Interdepartmental teams are allowed, but participants cannot be part of other department SIH teams.",
  "At least 50% of the team (minimum 3 members) must be from the CSE department.",
  "Hardware Edition: Teams can be multi-disciplinary.",
  "Software Edition: The majority of the team members must be programmers."
];

export default function InstructionsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Event Instructions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Follow these guidelines to ensure your submission is valid.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm card-glow hover:border-accent transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <FileText className="text-accent"/>
              Presentation Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {presentationRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/SIH2026-IDEA-Presentation-Format.pptx" target="_blank">
                    <Download className="mr-2"/>
                    Download Presentation Template
                </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm card-glow hover:border-accent transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Users className="text-accent" />
              Team Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {teamCriteria.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
