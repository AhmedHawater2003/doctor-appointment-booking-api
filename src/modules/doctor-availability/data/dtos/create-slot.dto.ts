import { IsBoolean, IsDateString, IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';

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