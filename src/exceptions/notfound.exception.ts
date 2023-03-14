import { RpcException } from '@nestjs/microservices';

export class NotFoundException extends RpcException {
  constructor(id: number) {
    super(`Task with id ${id} not found`);
  }
}
