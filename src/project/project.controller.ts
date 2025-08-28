import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {

  }

  @ApiOperation({ summary: 'Retrieve all projects', description: 'Get a list of all projects with their details' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'List of projects retrieved successfully.', type: [ProjectResponseDto] })
  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }


  @ApiOperation({ summary: 'Retrieve a project by ID', description: 'Get the details of a specific project by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project to retrieve', type: String })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Project retrieved successfully.', type: ProjectResponseDto })
  @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Project not found.', example: { 'application/json': { status: 404, message: 'Project not found' } } })
  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.getProjectById(id);
  }
}
