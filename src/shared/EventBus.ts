import { EventEmitter2 } from "@nestjs/event-emitter"
import { IEventBus } from "./IEventBus"
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventBus implements IEventBus {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    emit(eventName: string, payload: any): void {
        this.eventEmitter.emit(eventName, payload);
    }

    on(eventName: string, handler: (payload: any) => void): void {
        this.eventEmitter.on(eventName, handler);
    }
}