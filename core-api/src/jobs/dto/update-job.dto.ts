export class UpdateJobDto {
  title?: string;
  description?: string;
  requirements?: string[];
  location?: string;
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange?: string;
  applicationDeadline?: Date;
  isActive?: boolean;
}
