export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'recruiter' | 'admin';
  phone?: string;
  bio?: string;
  company?: string;
}
