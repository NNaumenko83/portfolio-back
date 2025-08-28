import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {

  }
  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.getProjectById(id);
  }
}
