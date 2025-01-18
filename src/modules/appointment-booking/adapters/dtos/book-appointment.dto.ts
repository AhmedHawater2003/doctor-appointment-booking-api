import { IsString, IsUUID } from 'class-validator';

export class BookAppointmentDto {
  @IsUUID()
  slotId: string;

  @IsString()
  patientName: string;

  @IsUUID()
  patientId: string;
}
