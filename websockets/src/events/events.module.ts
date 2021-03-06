import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_LAYER',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        },
      },
    ]),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
