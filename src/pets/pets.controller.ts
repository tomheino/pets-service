// pets.controller.ts

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('pets')
@ApiTags('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Post()
    @ApiOperation({summary: 'Create a new Pet'})
    @ApiCreatedResponse({
        description: 'Pet has been succesfully created.',
        type: Pet
    })
    createPet(
        @Body() createPetDto: CreatePetDto
    ): Pet {
        console.log(`Creating a pet ${JSON.stringify(createPetDto)}`)
        return this.petsService.insertPet(createPetDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all Pets'})
    @ApiResponse({status: 200, description: 'OK'})
    getPets(): Pet[] {
        return this.petsService.getPets();
    }

    // localhost:3000/pets/Nov7LCZOF-Nvju5tRc9gK
    @Get(':id')
    @ApiOperation({summary: 'Get one Pet'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    getAPet(@Param('id') petId: string): Pet {
        return this.petsService.getOnePet(petId);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Pet updated'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    updatePet(
        @Param('id') petId: string,
        @Body() createPetDto: CreatePetDto
    ): Pet {
        return this.petsService.updateOnePet(petId, createPetDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a Pet'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    deletePet(@Param('id') petId: string): Pet {
        return this.petsService.deletePet(petId);
    }
}


