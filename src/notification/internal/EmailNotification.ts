import { INotificationAPI } from "../shared/INotificationAPI";

export class EmailNotification implements INotificationAPI {
    notify(payload: Object, topicName: String): void {
        console.log(`Email Notification: ${topicName}`);
        console.log('Payload:', payload);
    }
}