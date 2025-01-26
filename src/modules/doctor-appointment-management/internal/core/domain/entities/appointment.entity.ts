import { v4 as uuidv4 } from 'uuid';

/** Possible appointment statuses in our domain. */
export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

/**
 * Represents an appointment reserved by a patient, assigned to a doctor,
 * with domain logic for marking it completed or canceled.
 */
export class Appointment {
  private readonly _id: string;
  private readonly _slotId: string;
  private readonly _patientId: string;
  private readonly _patientName: string;
  private readonly _doctorId: string;
  private readonly _appointmentTime: Date;
  private readonly _reservedAt: Date;
  private _status: AppointmentStatus;

  constructor(
    slotId: string,
    patientId: string,
    patientName: string,
    doctorId: string,
    appointmentTime: Date,
  ) {
    this._id = uuidv4();
    this._slotId = slotId;
    this._patientId = patientId;
    this._patientName = patientName;
    this._doctorId = doctorId;
    this._appointmentTime = appointmentTime;
    this._reservedAt = new Date();
    this._status = AppointmentStatus.SCHEDULED;

    // Basic domain validations
    if (!slotId) {
      throw new Error('SlotId cannot be empty.');
    }
    if (!patientId) {
      throw new Error('PatientId cannot be empty.');
    }
    if (!patientName) {
      throw new Error('PatientName cannot be empty.');
    }
    if (!doctorId) {
      throw new Error('DoctorId cannot be empty.');
    }
    if (!appointmentTime) {
      throw new Error('Appointment time cannot be empty.');
    }
  }

  // === Domain methods for status changes ===

  markAsCompleted(): void {
    if (this._status === AppointmentStatus.CANCELED) {
      throw new Error('Cannot complete a canceled appointment.');
    }
    this._status = AppointmentStatus.COMPLETED;
  }

  cancel(): void {
    if (this._status === AppointmentStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed appointment.');
    }
    this._status = AppointmentStatus.CANCELED;
  }

  // === Getters ===

  get id(): string {
    return this._id;
  }

  get slotId(): string {
    return this._slotId;
  }

  get patientId(): string {
    return this._patientId;
  }

  get patientName(): string {
    return this._patientName;
  }

  get doctorId(): string {
    return this._doctorId;
  }

  get appointmentTime(): Date {
    return this._appointmentTime;
  }

  get reservedAt(): Date {
    return this._reservedAt;
  }

  get status(): AppointmentStatus {
    return this._status;
  }
}
