import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {

    constructor(private readonly prisma: PrismaService) { }

    async getProjects(): Promise<Project[]> {
        return this.prisma.project.findMany(
            {
                include: {
                    techStacks: true,
                }
            },

        );
    }

    async getProjectById(id: string): Promise<Project> {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                techStacks: true,
            },
        });
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }
}
