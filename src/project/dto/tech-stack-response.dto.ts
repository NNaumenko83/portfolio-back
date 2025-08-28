import { ApiProperty } from "@nestjs/swagger";

export class TechStackDto {
    @ApiProperty({ description: 'Tech stack ID', type: String })
    id: string;

    @ApiProperty({ description: 'Tech stack name', type: String })
    name: string;
}