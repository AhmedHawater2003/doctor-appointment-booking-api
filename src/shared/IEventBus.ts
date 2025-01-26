export interface IEventBus {
    emit(eventName: string, payload: any): void;
    on(eventName: string, handler: (payload: any) => void): void;
}

export const IEventBus = Symbol("IEventBus");