import { Tech } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";



export class GetOwnerDto {
    @IsUUID("4")
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    avatarUrl: string;
}




