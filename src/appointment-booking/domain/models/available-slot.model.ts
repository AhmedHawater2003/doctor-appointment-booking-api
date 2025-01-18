export class AvailableSlot {
  constructor(
    private time: Date,
    private cost: number,
    private isReserved: boolean,
  ) {}

  isStillAvailable(): boolean {
    return !this.isReserved && this.time >= new Date();
  }
}
