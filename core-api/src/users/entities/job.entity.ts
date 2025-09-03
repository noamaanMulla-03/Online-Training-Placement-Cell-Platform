export class Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange?: string;
  companyId: string;
  postedBy: string; // User ID of recruiter
  applicationDeadline?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
