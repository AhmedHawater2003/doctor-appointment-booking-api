import { AppointmentBooking } from "./appointment-booking.model";
import { IAppointmentEvent } from "./IAppointmentEvent";

export class AppointmentBooked implements IAppointmentEvent {
    private _patientName: string;
    private _appointmentTime: Date;
    private _doctorName: string;

    private constructor(patientName: string, appointmentTime: Date, doctorName: string) {
        this._patientName = patientName;
        this._appointmentTime = appointmentTime;
        this._doctorName = doctorName;
    }

    public static of(appointment: AppointmentBooking,slotTime:Date,doctorName:string): AppointmentBooked {
        return new AppointmentBooked(appointment.getPatientName(), slotTime, doctorName);
    }

    public get appointmentTime(): Date {
        return this._appointmentTime;
    }
    public get patientName(): string {
        return this._patientName;
    }
    public get doctorName(): string {
        return this._doctorName;
    }
}