import { StrictEventEmitter } from 'nest-emitter';
import { EventEmitter } from 'events';

interface AppEvents {
  notification: string;
  newRequest: (req: Express.Request) => void;
}

export type MyEventsEmitter = StrictEventEmitter<EventEmitter, AppEvents>;
