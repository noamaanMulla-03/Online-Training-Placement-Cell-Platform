import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

export enum UserRole {
  STUDENT = 'student',
  RECRUITER = 'recruiter',
  ADMIN = 'admin',
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    role?: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    company?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.usersService.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role || UserRole.STUDENT,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      company: userData.company,
    });

    const { password: _, ...result } = user;
    return result;
  }
}
