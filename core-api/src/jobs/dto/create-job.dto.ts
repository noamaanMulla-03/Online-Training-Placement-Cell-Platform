export class CreateJobDto {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange?: string;
  companyId: string;
  applicationDeadline?: Date;
}