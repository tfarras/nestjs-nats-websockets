import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Server, Client } from 'socket.io';
import { InjectEventEmitter } from 'nest-emitter';
import { MyEventsEmitter } from './app.events';

interface ObjectLiteral {
  [key: string]: any;
}

@WebSocketGateway()
export class EventsGateway implements OnModuleInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  wsClients: Array<Client> = [];

  constructor(
    @Inject('NATS_LAYER') private natsClient: ClientProxy,
    @InjectEventEmitter() private emitter: MyEventsEmitter,
  ) {}

  onModuleInit(): void {
    this.emitter.on('notification', (msg) => this.server.emit('response', msg));
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: ObjectLiteral): WsResponse<ObjectLiteral> {
    this.natsClient.emit('test', data);

    return {
      event: 'events',
      data,
    };
  }

  handleConnection(client: Client): void {
    console.log(`${client.id} has been connected`);
    // this.server.emit('response', 'test');
  }
}
