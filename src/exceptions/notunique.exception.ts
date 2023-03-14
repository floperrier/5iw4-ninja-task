import { RpcException } from '@nestjs/microservices';

export class NotUniqueException extends RpcException {
  constructor() {
    super('Unique constraint failed');
  }
}
