"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition, useEffect } from "react";

import { submitRegistrationAction } from "@/app/register/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, PartyPopper, UserPlus, Trash, Bot, FileCheck2, AlertCircle, Rocket, Building, Tag, FileText, Upload, ArrowUpRight } from "lucide-react";
import type { ProblemStatement } from "@/types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  department: z.string({ required_error: "Department is required."}).min(1, "Department is required."),
  year: z.string({ required_error: "Year is required."}).min(1, "Year is required."),
  email: z.string().email("Invalid email address."),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
});

const formSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  leaderName: z.string().min(2, "Leader's name is required."),
  leaderEmail: z.string().email("Invalid email for leader."),
  leaderPhone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  leaderGender: z.enum(["Male", "Female", "Other"], { required_error: "Leader's gender is required." }),
  leaderDepartment: z.string({ required_error: "Leader's department is required."}).min(1, "Leader's department is required."),
  leaderYear: z.string({ required_error: "Leader's year is required."}).min(1, "Leader's year is required."),
  members: z.array(memberSchema).length(5, "You must add exactly 5 members."),
  edition: z.enum(["Hardware", "Software"], { required_error: "Please select an edition."}),
  problemStatementId: z.string().min(1, "Please select a problem statement."),
  problemStatementTitle: z.string(),
  hasMajorityProgrammers: z.boolean().optional(),
}).refine(data => {
    if (data.edition === "Software") {
        return data.hasMajorityProgrammers === true;
    }
    return true;
}, {
    message: "For the Software edition, you must confirm the majority of members are programmers.",
    path: ["hasMajorityProgrammers"],
}).refine(data => {
    const hasFemale = data.leaderGender === 'Female' || data.members.some(member => member.gender === 'Female');
    return hasFemale;
}, {
    message: "The team must have at least one female member.",
    path: ["members"],
}).refine(data => {
    let cseCount = 0;
    if (data.leaderDepartment === 'CSE') cseCount++;
    data.members.forEach(member => {
        if (member.department === 'CSE') cseCount++;
    });
    return cseCount >= 3;
}, {
    message: "At least 50% of the team (3 members) must be from the CSE department.",
    path: ["members"],
});


type RegistrationFormData = z.infer<typeof formSchema>;
type RegistrationFormProps = {
    selectedProblem: ProblemStatement | null;
}

const departments = ["AI&DS", "AI&ML", "BME", "CS", "CS&BS", "CSE", "ECE", "EEE", "IT", "S&H"];
const years = ["I Year", "II Year", "III Year", "IV Year"];

export default function RegistrationForm({ selectedProblem }: RegistrationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, startSubmitting] = useTransition();
  const [submissionResult, setSubmissionResult] = useState<{success: boolean; message: string; submissionId: string} | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemStatementId: selectedProblem?.id || "",
      problemStatementTitle: selectedProblem?.title || "Not Selected",
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      leaderGender: undefined,
      leaderDepartment: undefined,
      leaderYear: undefined,
      members: [],
      hasMajorityProgrammers: false,
      edition: selectedProblem?.category as 'Hardware' | 'Software' | undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });
  
  const edition = form.watch("edition");

  useEffect(() => {
    if (selectedProblem) {
      form.setValue("problemStatementId", selectedProblem.id);
      form.setValue("problemStatementTitle", selectedProblem.title);
      form.setValue("edition", selectedProblem.category as "Hardware" | "Software");
    }
  }, [selectedProblem, form]);

  const onSubmit = (data: RegistrationFormData) => {
    startSubmitting(async () => {
        const formData = new FormData();

        // Append all form data
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'members') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        });
        
        const result = await submitRegistrationAction(formData);
        setSubmissionResult(result);
        if (result.success) {
            toast({ title: "Registration Submitted!", description: result.message });
        } else {
            toast({ variant: "destructive", title: "Submission Failed", description: result.message });
        }
    });
  };

  if (submissionResult?.success) {
        return (
            <Card className="max-w-2xl mx-auto bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)] text-center p-6 sm:p-8">
                <CardHeader>
                    <PartyPopper className="h-16 w-16 mx-auto text-white mb-4"/>
                    <CardTitle className="text-3xl font-headline text-white/90">Registration Successful!</CardTitle>
                </CardHeader>
            <p className="text-muted-foreground mb-4">{submissionResult.message}</p>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">Your Submission ID is:</p>
                <p className="text-lg font-bold font-mono tracking-widest">{submissionResult.submissionId}</p>
            </div>
            
            <Alert className="mt-6 text-left">
                <Rocket className="h-4 w-4" />
                <AlertTitle>Final Step: Upload Your Presentation</AlertTitle>
                <AlertDescription>
                    Your registration is complete, but you still need to submit your idea presentation through the Google Form. Please use your Submission ID when filling out the form.
                </AlertDescription>
                 <Button asChild className="mt-4 w-full">
                    <Link href="https://forms.gle/LaN1qGxiB8MxuVQf6" target="_blank">
                        Go to Presentation Upload Form
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </Alert>

             <div className="mt-6">
                <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Validation errors:", JSON.stringify(errors, null, 2));
          toast({ variant: "destructive", title: "Validation Error", description: "Please check all fields and ensure rules are met." });
      })} className="space-y-8 max-w-4xl mx-auto">
        <input type="hidden" {...form.register("problemStatementId")} />
        <input type="hidden" {...form.register("problemStatementTitle")} />
        <input type="hidden" {...form.register("edition")} />

        <Card className="bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Selected Problem</CardTitle>
                 {form.formState.errors.problemStatementId && <FormMessage>{form.formState.errors.problemStatementId.message}</FormMessage>}
            </CardHeader>
            {selectedProblem ? (
                <>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-accent pr-4">{selectedProblem.title}</h3>
                        <Badge variant="secondary" className="whitespace-nowrap">{selectedProblem.id}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="mr-2 h-4 w-4" />
                        <span>{selectedProblem.organization}</span>
                    </div>
                     <div className="space-x-2">
                        <Badge variant="outline" className="border-accent text-accent">{selectedProblem.category}</Badge>
                        <Badge variant="secondary">{selectedProblem.theme}</Badge>
                    </div>
                    <p className="text-sm text-foreground/80 pt-2">{selectedProblem.statement}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" asChild>
                        <Link href="/problem-statements">Change Problem</Link>
                    </Button>
                </CardFooter>
                </>
            ) : (
                <CardContent>
                    <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No problem statement selected</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Please choose a challenge to get started.</p>
                        <Button asChild className="mt-6">
                            <Link href="/problem-statements">View Problem Statements</Link>
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
        
        <Card className="bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Team Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="teamName" render={({ field }) => (
                <FormItem><FormLabel>Team Name</FormLabel><FormControl><Input placeholder="e.g., The Code Crusaders" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="edition" render={({ field }) => (
                <FormItem><FormLabel>Edition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Hardware or Software" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Hardware">Hardware</SelectItem><SelectItem value="Software">Software</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
            )}/>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <CardHeader><CardTitle className="font-headline text-2xl">Team Leader</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="leaderName" render={({ field }) => (
                    <FormItem><FormLabel>Leader's Name</FormLabel><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="leaderEmail" render={({ field }) => (
                    <FormItem><FormLabel>Leader's Email</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="leaderPhone" render={({ field }) => (
                    <FormItem><FormLabel>Leader's Phone</FormLabel><FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="leaderGender" render={({ field }) => (
                    <FormItem><FormLabel>Leader's Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="leaderDepartment" render={({ field }) => (
                    <FormItem><FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                            <SelectContent>{departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="leaderYear" render={({ field }) => (
                    <FormItem><FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl>
                            <SelectContent>{years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
            </CardContent>
        </Card>

        <Card className="bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Team Members ({fields.length}/5)</CardTitle>
            <CardDescription>Please add exactly 5 additional team members.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-3 relative">
                <h4 className="font-semibold">Member {index + 1}</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name={`members.${index}.name`} render={({ field }) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name={`members.${index}.email`} render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name={`members.${index}.department`} render={({ field }) => (
                        <FormItem><FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                                <SelectContent>{departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name={`members.${index}.year`} render={({ field }) => (
                        <FormItem><FormLabel>Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl>
                                <SelectContent>{years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name={`members.${index}.gender`} render={({ field }) => (
                        <FormItem><FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}/>
                 </div>
                 <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
              </div>
            ))}
             {form.formState.errors.members && !form.formState.errors.members.root?.message?.includes("exactly 5") && <Alert variant="destructive" className="mt-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Team Composition Error</AlertTitle><AlertDescription>{form.formState.errors.members.root?.message}</AlertDescription></Alert>}
             {form.formState.errors.members?.message && <FormMessage>{form.formState.errors.members.message}</FormMessage>}
            <Button type="button" variant="outline" onClick={() => fields.length < 5 && append({ name: '', email: '', department: '', year: '', gender: undefined as any })} disabled={fields.length >= 5}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/[0.05] border-blue-500/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <CardHeader><CardTitle className="font-headline text-2xl">Submission Checks</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {edition === 'Software' && (
                        <FormField control={form.control} name="hasMajorityProgrammers" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none"><FormLabel>For the software edition, I confirm our team has a majority of programmers.</FormLabel><FormMessage /></div></FormItem>
                        )}/>
                    )}
                     <Alert>
                        <FileText className="h-4 w-4" />
                        <AlertTitle>Presentation Submission</AlertTitle>
                        <AlertDescription className="space-y-4 mt-2">
                            <p>You will be provided a link to upload your presentation to a Google Form after successfully completing this initial registration.</p>
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting || !selectedProblem} className="bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] font-semibold transition-all">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Registration"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
