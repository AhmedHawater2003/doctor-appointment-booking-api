import { Body, Controller, Get, Post } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/appointment-booking/domain/contracts/appointment-booking-repo.interface';
import { BookAppointmentInput } from 'src/appointment-booking/use-cases/commands/book-appointment/book-appointment.input';
import { BookAppointmentInteractor } from 'src/appointment-booking/use-cases/commands/book-appointment/book-appointment.interactor';

@Controller('appointment-booking')
export class BookAppointmentController {
  constructor(
    private readonly bookAppointmentInteractor: BookAppointmentInteractor,
    private readonly repo: IAppointmentBookingRepo,
  ) {}

  @Post()
  async save(@Body() requestBody: BookAppointmentInput): Promise<any> {
    const result = await this.bookAppointmentInteractor.execute(requestBody);
    return result;
  }

  @Get()
  async getAll() {
    const appointmentBookings = await this.repo.getAll();
    return appointmentBookings;
  }
}
