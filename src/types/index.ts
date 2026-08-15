export type ProblemStatement = {
  id: string;
  title: string;
  description: string;
  category: string;
  statement: string;
  organization: string;
  theme: string;
  referenceExamples?: string[];
};

export type TeamMember = {
  name: string;
  branch: string;
  year: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
};

export type Team = {
  teamName: string;
  leader: {
    name: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
  };
  members: TeamMember[];
  edition: 'Hardware' | 'Software';
  problemStatementId: string;
  pdf_url?: string;
  submittedAt: Date;
};
