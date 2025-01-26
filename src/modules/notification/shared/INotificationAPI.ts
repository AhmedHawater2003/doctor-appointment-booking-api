export interface INotificationAPI {
    notify(payload: Object, topicName: String):void
}

export const INotificationAPI = Symbol("INotificationAPI");