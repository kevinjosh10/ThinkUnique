
import RegistrationForm from "@/components/registration-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { problemStatements } from "@/app/problem-statements/data";


function RegistrationFormSkeleton() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl border border-blue-500/20 bg-blue-900/[0.05] space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-8 rounded-xl border border-blue-500/20 bg-blue-900/[0.05] space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
             <div className="p-8 rounded-xl border border-blue-500/20 bg-blue-900/[0.05] space-y-6">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
}

function RegisterPageContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const problemId = (searchParams?.problemId as string) || "";
    const selectedProblem = problemStatements.find(p => p.id === problemId) || null;

    return <RegistrationForm selectedProblem={selectedProblem} />;
}


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    return (
        <div className="container pt-32 pb-12 animate-fade-in-up">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-headline font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-text-flow bg-[length:200%_auto]">Team Registration</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Complete the form below to register your team for the hackathon.</p>
            </div>
            <Suspense fallback={<RegistrationFormSkeleton />}>
                <RegisterPageContent searchParams={params} />
            </Suspense>
        </div>
    );
}
