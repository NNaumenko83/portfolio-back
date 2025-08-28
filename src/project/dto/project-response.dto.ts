import { ApiProperty } from "@nestjs/swagger";
import { TechStackDto } from "./tech-stack-response.dto";




export class ProjectResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the project',
        type: String
    })

    id: string;

    @ApiProperty({
        description: 'The unique identifier of the project owner',
        type: String
    })
    ownerId: string;

    @ApiProperty({
        description: 'The title of the project',
        type: String
    })
    title: string;

    @ApiProperty({
        description: 'The description of the project',
        type: String
    })
    description: string;

    @ApiProperty({
        description: 'The image URL of the project',
        type: String
    })
    imageUrl: string;

    @ApiProperty({
        description: 'The link to the project',
        type: String
    })
    link: string;

    @ApiProperty({
        description: 'The tech stacks used in the project',
        type: [TechStackDto]
    })
    techStacks: TechStackDto[];
}