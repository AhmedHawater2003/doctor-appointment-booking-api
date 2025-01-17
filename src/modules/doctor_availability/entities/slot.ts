import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @Column('decimal')
  cost: number;
}