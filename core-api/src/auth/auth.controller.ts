import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, UserRole } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

interface RegisterDto {
  email: string;
  password: string;
  role?: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin-only')
  adminOnly() {
    return { message: 'Admin only endpoint' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.RECRUITER)
  @Get('recruiter-only')
  recruiterOnly() {
    return { message: 'Recruiter only endpoint' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.STUDENT)
  @Get('student-only')
  studentOnly() {
    return { message: 'Student only endpoint' };
  }
}
