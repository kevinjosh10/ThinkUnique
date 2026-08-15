
"use server";

import { appendRegistrationToSheet } from '@/services/google-sheets';
import { uploadFileToDrive } from '@/services/google-drive';
import { z } from 'zod';

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  department: z.string({ required_error: "Department is required."}),
  year: z.string({ required_error: "Year is required."}),
  email: z.string().email("Invalid email address."),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
});

const serverFormSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  leaderName: z.string().min(2, "Leader's name is required."),
  leaderEmail: z.string().email("Invalid email for leader."),
  leaderPhone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  leaderGender: z.enum(["Male", "Female", "Other"], { required_error: "Leader's gender is required." }),
  leaderDepartment: z.string({ required_error: "Leader's department is required."}),
  leaderYear: z.string({ required_error: "Leader's year is required."}),
  members: z.array(memberSchema).length(5, "You must add exactly 5 members."),
  edition: z.enum(["Hardware", "Software"]),
  problemStatementId: z.string(),
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


export async function submitRegistrationAction(formData: FormData) {
    try {
        console.log("Form submitted. Processing...");
        
        // Reconstruct the object for validation
        const membersData = JSON.parse(formData.get('members') as string || '[]');
        const hasMajorityProgrammers = formData.get('hasMajorityProgrammers') === 'true';

        const dataToValidate = {
          teamName: formData.get('teamName'),
          leaderName: formData.get('leaderName'),
          leaderEmail: formData.get('leaderEmail'),
          leaderPhone: formData.get('leaderPhone'),
          leaderGender: formData.get('leaderGender'),
          leaderDepartment: formData.get('leaderDepartment'),
          leaderYear: formData.get('leaderYear'),
          edition: formData.get('edition'),
          problemStatementId: formData.get('problemStatementId'),
          problemStatementTitle: formData.get('problemStatementTitle'),
          members: membersData,
          hasMajorityProgrammers,
        };
        
        const validatedData = serverFormSchema.parse(dataToValidate);

        const submissionId = `TQ-${Date.now()}`;
        
        let presentationLink = ""; // They will upload via form later

        const dataForSheet = {
            ...validatedData,
            submissionId,
            presentationLink,
        };

        await appendRegistrationToSheet(dataForSheet);

        console.log("Registration successful for Team:", validatedData.teamName);

        return { success: true, message: `Team '${validatedData.teamName}' registration is complete!`, submissionId };
    } catch (error) {
        console.error("Submission failed:", error);
        if (error instanceof z.ZodError) {
             const errorMessages = error.errors.map(e => e.message).join(', ');
             return { success: false, message: `Please correct the following: ${errorMessages}`, submissionId: "" };
        }
        return { success: false, message: "An unexpected error occurred. Please check the server logs.", submissionId: "" };
    }
}
