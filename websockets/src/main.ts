import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const nats = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  });

  nats.listen(() => console.log('Microservice is listening'));

  const app = await NestFactory.create(AppModule);

  await app.listen(3002);
}
bootstrap();
