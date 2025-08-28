import { ApiProperty } from "@nestjs/swagger";
import { TechStackDto } from "src/project/dto/tech-stack-response.dto";

export class OwnerResponseDto {
    @ApiProperty({ description: 'The unique identifier of the owner', type: String })
    id: string;

    @ApiProperty({ description: 'The name of the owner', type: String })
    name: string;

    @ApiProperty({ description: 'The email of the owner', type: String })
    email: string;

    @ApiProperty({ description: 'The avatar URL of the owner', type: String })
    avatarUrl: string;

    @ApiProperty({
        description: 'The tech stacks used in the project',
        type: [TechStackDto]
    })
    techStacks: TechStackDto[];
}