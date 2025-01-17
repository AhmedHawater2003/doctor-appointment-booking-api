import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlotDto } from '../dtos/create-slot.dto';
import { Slot } from '../entities/slot';

@Injectable()
export class DoctorAvailabilityService {
    
    constructor(
        @InjectRepository(Slot)
        private readonly slotRepository: Repository<Slot>,
      ) {}
    
      async listSlots(): Promise<Slot[]> {
        return this.slotRepository.find();
      }
    
      async addSlot(createSlotDto: CreateSlotDto): Promise<Slot> {
        const slot = this.slotRepository.create(createSlotDto);
        return this.slotRepository.save(slot);
      }
}
