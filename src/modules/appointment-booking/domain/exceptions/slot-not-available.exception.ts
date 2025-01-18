import { HttpException, HttpStatus } from '@nestjs/common';

export class SlotNotAvailableException extends HttpException {
  constructor(slotId: string) {
    super(
      `The slot with ID ${slotId} is no longer available`,
      HttpStatus.CONFLICT,
    );
  }
}
