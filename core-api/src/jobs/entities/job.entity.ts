export interface Job {
  id: string;
  title: string;
  description: string;
  companyId: string;
  location: string;
  salary?: number;
  requirements: string[];
  postedBy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
