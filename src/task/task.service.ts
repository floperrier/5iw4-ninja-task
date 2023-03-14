import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RpcException } from '@nestjs/microservices';
import { NotFoundException } from 'src/exceptions/notfound.exception';
import { NotUniqueException } from 'src/exceptions/notunique.exception';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    try {
      return await this.prisma.task.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          throw new NotUniqueException();
        }
      }
      throw new RpcException(error.message);
    }
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(id);
        }
      }
      throw new RpcException(error.message);
    }
  }

  async update(id: number, data: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(id);
        }
      }
      throw new RpcException(error.message);
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
          throw new NotFoundException(id);
        }
      }
      throw new RpcException(error.message);
    }
  }
}
