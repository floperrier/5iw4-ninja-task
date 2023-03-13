import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NotUniqueException } from 'src/exceptions/notunique.exception';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaskDto) {
    try {
      return this.prisma.task.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          throw new NotUniqueException();
        }
      }
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    try {
      return this.prisma.task.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(`Task with id ${id} not found`);
        }
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, data: UpdateTaskDto) {
    try {
      return this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(`Task with id ${id} not found`);
        }
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    console.log('remove', id);
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(`Task with id ${id} not found`);
        }
      }
      throw new BadRequestException(error.message);
    }
  }
}
