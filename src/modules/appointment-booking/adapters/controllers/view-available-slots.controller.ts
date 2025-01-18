import { Controller, Get } from '@nestjs/common';
import { ViewAvailableSlotsInput } from 'src/modules/appointment-booking/use-cases/queries/view-available-slots/view-available-slots.input';
import { ViewAvailableSlotsInteractor } from 'src/modules/appointment-booking/use-cases/queries/view-available-slots/view-available-slots.interactor';

@Controller('available-slots')
export class ViewAvailableSlotsController {
  constructor(
    private readonly viewAvailableSlotsInteractor: ViewAvailableSlotsInteractor,
  ) {}

  @Get()
  async getAvailableSlots() {
    const query = new ViewAvailableSlotsInput(new Date());
    return this.viewAvailableSlotsInteractor.execute(query);
  }
}
