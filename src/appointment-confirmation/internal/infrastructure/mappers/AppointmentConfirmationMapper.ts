import { AppointmentBookedDto } from "src/appointment-booking/shared/dtos/AppointmentBookedDto";
import { AppointmentConfirmationDetails } from "src/appointment-confirmation/internal/application/AppointmentConfirmationDetails";

export class AppointmentConfirmationMapper {
    public static toAppointmentConfirmationDetails(appointmentBookedDto: AppointmentBookedDto): AppointmentConfirmationDetails {
        return {
            appointmentTime: appointmentBookedDto.appointmentTime,
            doctorName: appointmentBookedDto.doctorName,
            patientName: appointmentBookedDto.patientName
        }
    }
}