// pet.entity.ts

import { ApiProperty } from "@nestjs/swagger";

export class Pet {
   @ApiProperty() 
    petId: string;

    @ApiProperty() 
    name: string;

    @ApiProperty() 
    description: string;
   
    @ApiProperty() 
    dateOfBirth: string;

    constructor(
        petId: string,
        name: string,
        description: string,
        dateOfBirth: string
    ) {
        this.petId = petId;
        this.name = name;
        this.description = description;
        this.dateOfBirth = dateOfBirth;
    } 
}