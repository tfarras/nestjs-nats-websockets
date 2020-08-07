import { Module } from '@nestjs/common';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';
import { EventsModule } from './events/events.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [EventsModule, NatsModule, NestEmitterModule.forRoot(new EventEmitter())],
})
export class AppModule {}
