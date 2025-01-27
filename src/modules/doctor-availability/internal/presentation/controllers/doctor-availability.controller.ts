import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorAvailabilityService } from '../../business/services/doctor-availability.service';
import { CreateSlotDto } from '../../data/dtos/create-slot.dto';

@Controller('doctor-availability')
export class DoctorAvailabilityController {
  constructor(private readonly service: DoctorAvailabilityService) {}

  @Get('slots')
  async listSlots() {
    return this.service.listSlots();
  }

  @Post('slots')
  async addSlot(@Body() createSlotDto: CreateSlotDto) {
    return this.service.addSlot(createSlotDto);
  }
}
