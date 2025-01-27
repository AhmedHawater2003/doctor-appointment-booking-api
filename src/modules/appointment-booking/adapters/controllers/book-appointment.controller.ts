import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/modules/appointment-booking/domain/contracts/appointment-booking-repo.interface';
import { BookAppointmentInput } from 'src/modules/appointment-booking/use-cases/commands/book-appointment/book-appointment.input';
import { BookAppointmentInteractor } from 'src/modules/appointment-booking/use-cases/commands/book-appointment/book-appointment.interactor';
import { BookAppointmentDto } from '../dtos/book-appointment.dto';

@Controller('appointment-booking')
export class BookAppointmentController {
  constructor(
    private readonly bookAppointmentInteractor: BookAppointmentInteractor,
    private readonly repo: IAppointmentBookingRepo,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() requestBody: BookAppointmentDto): Promise<any> {
    const command = new BookAppointmentInput(
      requestBody.slotId,
      requestBody.patientId,
      requestBody.patientName,
    );
    const result = await this.bookAppointmentInteractor.execute(command);
    return result;
  }

  @Get()
  async getAll() {
    const appointmentBookings = await this.repo.getAll();
    return appointmentBookings;
  }
}
