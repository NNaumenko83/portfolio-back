import { Tech } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";

export class ProjectDto {
    @IsString()
    @IsUUID("4")
    id: string;

    @IsString()
    @IsUUID("4")
    ownerId: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;

    @IsString()
    link: string;
}


