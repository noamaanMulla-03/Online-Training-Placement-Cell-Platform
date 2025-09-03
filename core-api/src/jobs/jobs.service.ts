import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  create(createJobDto: CreateJobDto, userId: string): Job {
    const job: Job = {
      id: Math.random().toString(36),
      ...createJobDto,
      postedBy: userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.jobs.push(job);
    return job;
  }

  findAll(isActive?: boolean): Job[] {
    if (isActive !== undefined) {
      return this.jobs.filter(job => job.isActive === isActive);
    }
    return this.jobs;
  }

  findByCompany(companyId: string): Job[] {
    return this.jobs.filter(job => job.companyId === companyId);
  }

  findOne(id: string): Job {
    const job = this.jobs.find(j => j.id === id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  update(
    id: string,
    updateJobDto: UpdateJobDto,
    userId: string,
    userRole: string
  ): Job {
    const jobIndex = this.jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) {
      throw new NotFoundException('Job not found');
    }

    const job = this.jobs[jobIndex];

    // Only the poster or admin can update
    if (job.postedBy !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only update jobs you posted');
    }

    this.jobs[jobIndex] = {
      ...job,
      ...updateJobDto,
      updatedAt: new Date(),
    };

    return this.jobs[jobIndex];
  }

  remove(id: string, userId: string, userRole: string): void {
    const jobIndex = this.jobs.findIndex(j => j.id === id);
    if (jobIndex === -1) {
      throw new NotFoundException('Job not found');
    }

    const job = this.jobs[jobIndex];

    // Only the poster or admin can delete
    if (job.postedBy !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only delete jobs you posted');
    }

    this.jobs.splice(jobIndex, 1);
  }
}
