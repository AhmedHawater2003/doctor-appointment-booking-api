import { Controller, Get } from '@nestjs/common';
import { ViewAvailableSlotsInteractor } from 'src/modules/appointment-booking/internal/use-cases/queries/view-available-slots/view-available-slots.interactor';

@Controller('available-slots')
export class ViewAvailableSlotsController {
  constructor(
    private readonly viewAvailableSlotsInteractor: ViewAvailableSlotsInteractor,
  ) {}

  @Get()
  async getAvailableSlots() {
    return this.viewAvailableSlotsInteractor.execute();
  }
}
