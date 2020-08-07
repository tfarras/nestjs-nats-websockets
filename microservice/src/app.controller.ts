import { Controller, Inject } from '@nestjs/common';
import { EventPattern, ClientProxy } from '@nestjs/microservices';

interface ObjectLiteral {
  [key: string]: any;
}

@Controller()
export class AppController {
  constructor(@Inject('NATS_LAYER') private natsClient: ClientProxy) {}

  @EventPattern('test')
  getHello(data: ObjectLiteral): void {
    this.natsClient.emit('processed', `RECEIVED: ${JSON.stringify(data)}`);
  }
}
