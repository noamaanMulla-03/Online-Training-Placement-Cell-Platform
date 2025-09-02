import { Injectable } from '@nestjs/common';
import { UserRole } from '../auth/auth.service';

interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable()
export class UsersService {
  private users: User[] = []; // Use database in production

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create(userData: {
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    const user: User = {
      id: Math.random().toString(36),
      ...userData,
    };
    this.users.push(user);
    return user;
  }
}
