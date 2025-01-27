import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSlotDto {
  @IsDateString()
  time: string;

  @IsUUID()
  doctorId: string;

  @IsString()
  doctorName: string;

  @IsDecimal()
  cost: number;

  @IsOptional()
  @IsBoolean()
  isReserved?: boolean;
}

// Sample usage:

// const sampleSlot = new CreateSlotDto();
// sampleSlot.time = '2024-02-15T10:00:00Z';
// sampleSlot.doctorId = '123e4567-e89b-12d3-a456-426614174000';
// sampleSlot.doctorName = 'Dr. Smith';
// sampleSlot.cost = 150.00;
// sampleSlot.isReserved = false;
