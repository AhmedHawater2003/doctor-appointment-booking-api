import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
//Because if the same doctor tries to create a slot for the same exact time,
// the database will enforce uniqueness. This is important to avoid duplicates in production
@Index(['doctorId', 'time'], { unique: true }) // enforces unique constraint for (doctorId, time)
export class Slot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: Date;

  @Column()
  doctorId: string;

  @Column()
  doctorName: string;

  @Column({ default: false })
  isReserved: boolean;

  @Column('decimal', { precision: 7, scale: 2 })
  cost: number;
}