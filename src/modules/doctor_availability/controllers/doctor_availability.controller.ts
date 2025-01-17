import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorAvailabilityService } from '../services/doctor_availability.service';

@Controller('doctor-availability')
export class DoctorAvailabilityController {

    constructor(private readonly doctorAvailabilityService: DoctorAvailabilityService) {}

    @Get('slots')
    async listSlots() {
      return this.doctorAvailabilityService.listSlots();
    }
  
    @Post('slots')
    async addSlot(@Body() createSlotDto: CreateSlotDto) {
      return this.doctorAvailabilityService.addSlot(createSlotDto);
    }
}
