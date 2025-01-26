import { Inject, Injectable } from "@nestjs/common";
import { AppointmentConfirmationDetails } from "./AppointmentConfirmationDetails";
import { INotificationAPI } from "src/modules/notification/shared/INotificationAPI";

@Injectable()
export class AppointmentConfirmationHandler{
    constructor(@Inject(INotificationAPI) private readonly notificationApi: INotificationAPI) { }
    
    public handle(appointmentConfirmationDetails: AppointmentConfirmationDetails): void {
        var notificationPayload = {
            patientName: appointmentConfirmationDetails.patientName,
            appointmentTime: appointmentConfirmationDetails.appointmentTime,
            doctorName: appointmentConfirmationDetails.doctorName
        }

        this.notificationApi.notify(notificationPayload,"AppointmentConfirmation");
    }
}