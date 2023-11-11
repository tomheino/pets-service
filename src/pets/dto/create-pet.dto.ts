// create-pet.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreatePetDto {
    @ApiProperty({example: 'Pluto', description: 'Name of the pet'})
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty({example: 'Yellow friendly dog', description: 'Short description'})
    @IsOptional()
    @IsString()
    @Length(10, 200)
    description: string;
    @ApiProperty({example: '1950-02-28'})
    @IsOptional()
    @IsString()
    dateOfBirth: string;
}