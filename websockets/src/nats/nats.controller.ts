import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectEventEmitter } from 'nest-emitter';
import { MyEventsEmitter } from '../events/app.events';

@Controller()
export class NatsController {
  constructor(@InjectEventEmitter() private emitter: MyEventsEmitter) {}

  @EventPattern('processed')
  received(data: string): void {
    console.log(data);
    this.emitter.emit('notification', data);
  }
}
