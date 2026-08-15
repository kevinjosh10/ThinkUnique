
"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { ProblemStatement } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Cpu, Code, List, Columns, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ProblemStatementsListProps = {
  statements: ProblemStatement[];
};

export default function ProblemStatementsList({ statements }: ProblemStatementsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Hardware' | 'Software'>('All');


  const filteredStatements = statements.filter(statement => {
    const searchMatch = 
      statement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.id.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = categoryFilter === 'All' || statement.category === categoryFilter;

    return searchMatch && categoryMatch;
  });

  const totalStatements = statements.length;
  const hardwareStatements = statements.filter(s => s.category === 'Hardware').length;
  const softwareStatements = statements.filter(s => s.category === 'Software').length;

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center items-center gap-2 text-center md:gap-4">
          <Badge className="text-sm md:text-md py-1 px-3 md:py-2 md:px-4" variant="secondary"><List className="mr-2 h-4 w-4"/>Total: {totalStatements}</Badge>
          <Badge className="text-sm md:text-md py-1 px-3 md:py-2 md:px-4" variant="secondary"><Cpu className="mr-2 h-4 w-4"/>Hardware: {hardwareStatements}</Badge>
          <Badge className="text-sm md:text-md py-1 px-3 md:py-2 md:px-4" variant="secondary"><Code className="mr-2 h-4 w-4"/>Software: {softwareStatements}</Badge>
      </div>

      <div className="mb-8 flex flex-col items-center gap-4 max-w-lg mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by ID, title, ministry..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-shrink-0 flex-wrap justify-center gap-2">
            <Button size="sm" variant={categoryFilter === 'All' ? 'default' : 'outline'} onClick={() => setCategoryFilter('All')}>
                <Columns className="mr-2 h-4 w-4" />
                All
            </Button>
            <Button size="sm" variant={categoryFilter === 'Hardware' ? 'default' : 'outline'} onClick={() => setCategoryFilter('Hardware')}>
                <Cpu className="mr-2 h-4 w-4" />
                Hardware
            </Button>
            <Button size="sm" variant={categoryFilter === 'Software' ? 'default' : 'outline'} onClick={() => setCategoryFilter('Software')}>
                <Code className="mr-2 h-4 w-4" />
                Software
            </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
            {searchQuery && (
                <Badge variant="secondary" className="pl-2">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-2 rounded-full p-0.5 hover:bg-muted-foreground/20">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {categoryFilter !== 'All' && (
                 <Badge variant="secondary" className="pl-2">
                    Category: {categoryFilter}
                    <button onClick={() => setCategoryFilter('All')} className="ml-2 rounded-full p-0.5 hover:bg-muted-foreground/20">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStatements.map((statement) => (
          <Card key={statement.id} className="bg-card/50 backdrop-blur-sm card-glow flex flex-col hover:border-accent transition-colors duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{statement.id}</Badge>
                <Badge variant="outline" className="w-fit border-accent text-accent">{statement.category}</Badge>
              </div>
              <CardTitle className="font-headline text-xl pt-2">{statement.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
               <p className="text-sm text-muted-foreground line-clamp-3">{statement.description}</p>
               
               {statement.referenceExamples && statement.referenceExamples.length > 0 && (
                 <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="references" className="border-b-0">
                        <AccordionTrigger className="text-xs py-2 hover:no-underline">2025 Reference Examples</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-4 space-y-2 mt-2">
                                {statement.referenceExamples.map((example, i) => (
                                    <li key={i} className="text-xs text-muted-foreground">{example}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                 </Accordion>
               )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/register?problemId=${statement.id}`}>
                  Select this Problem
                  <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredStatements.length === 0 && (
        <div className="text-center col-span-full py-12">
            <p className="text-muted-foreground">No problem statements found matching your criteria.</p>
        </div>
      )}
    </>
  );
}
