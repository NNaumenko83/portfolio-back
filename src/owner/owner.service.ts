import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetOwnerDto } from './dto/get-owner.dto';

@Injectable()
export class OwnerService {
    constructor(private readonly prisma: PrismaService) { }

    async getOwner(): Promise<GetOwnerDto> {
        const owner = await this.prisma.owner.findFirst({
            include: {
                techStacks: true,
            },
        });
        if (!owner) {
            throw new Error('Owner not found');
        }
        return owner
    }
}
