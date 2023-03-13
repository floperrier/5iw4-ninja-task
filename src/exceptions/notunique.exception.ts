import { HttpException, HttpStatus } from '@nestjs/common';

export class NotUniqueException extends HttpException {
  constructor() {
    super(
      'There is a unique constraint violation, a new task cannot be created',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
