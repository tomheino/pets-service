// pets.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class PetsService {
    // in-memory db for pets
    pets: Pet[] = [];

    insertPet(createPetDto: CreatePetDto): Pet {
        const id = nanoid();
        const pet = new Pet(id, createPetDto.name, createPetDto.description, createPetDto.dateOfBirth);
        this.pets.push(pet);
        console.log(`added a pet: ${JSON.stringify(pet)}`)
        return pet;
    }

    getPets(): Pet[] {
        // return a copy of the pets (not original)
        return [...this.pets];
    }

    getOnePet(petId: string): Pet {
        const idx = this.pets.findIndex((item => item.petId === petId));

        if(idx >= 0) {
            const pet = this.pets[idx];
            return {...pet}
        }
        throw new NotFoundException('Could not find matching id');
    }

    updateOnePet(petId: string, createPetDto: CreatePetDto): Pet {
        const idx = this.pets.findIndex((item => item.petId === petId));

        if(idx >= 0) {
            const pet = this.pets[idx];
            const updatedPet = {...pet};

            if(createPetDto.name) {
                updatedPet.name = createPetDto.name;
            }

            if(createPetDto.description) {
                updatedPet.description = createPetDto.description;
            }

            if(createPetDto.dateOfBirth) {
                updatedPet.dateOfBirth = createPetDto.dateOfBirth;
            }
            this.pets[idx] = updatedPet;

            return {...updatedPet}
        }
        throw new NotFoundException('Could not find matching id');
    }

    deletePet(petId: string): Pet {
        const idx = this.pets.findIndex((item => item.petId === petId));

        if(idx >= 0) {
            const pet = this.pets[idx];
            this.pets.splice(idx, 1);
            console.log(`deleted a pet: ${JSON.stringify(pet)}`);
            return {...pet}
        }
        throw new NotFoundException('Could not find matching id');
    }
}
