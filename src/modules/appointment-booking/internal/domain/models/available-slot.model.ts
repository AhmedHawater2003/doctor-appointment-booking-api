export class AvailableSlot {
  constructor(
    private time: Date,
    private cost: number,
  ) {}
  public getTime() {
    return this.time;
  }
  public getCost() {
    return this.cost;
  }
}
