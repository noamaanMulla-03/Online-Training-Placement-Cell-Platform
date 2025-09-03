export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'recruiter' | 'admin';
  phone?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}
