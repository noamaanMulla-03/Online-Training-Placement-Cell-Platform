// =============================================================================
// The Opportunity Engine - Core API (NestJS)
// =============================================================================
// This is the main app controller for your NestJS application.
// It creates a simple GET endpoint at the root. You can access this at
// http://localhost:3001 to confirm the service is running.
//
// File path: /core-api/src/app.controller.ts
// =============================================================================

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    // This will return a JSON object: {"message": "Core API Service (NestJS) is running!"}
    return this.appService.getHello();
  }
}
