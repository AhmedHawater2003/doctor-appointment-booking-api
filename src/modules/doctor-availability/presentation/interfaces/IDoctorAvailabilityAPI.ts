// IDoctorAvailabilityAPI.ts
export interface IDoctorAvailabilityAPI {
  listSlots(): Promise<any>;
  addSlot(createSlotDto: any): Promise<any>;
}