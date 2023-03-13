import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskRequest,
  ListTasksRequest,
  ListTasksResponse,
  Status,
  Task,
  UpdateTaskRequest,
} from 'src/stubs/task/v1alpha/task';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService')
  createTask(data: CreateTaskRequest) {
    const newTask = data.task;
    return this.taskService.create(newTask as any);
  }

  @GrpcMethod('TaskService')
  async ListTasks(request: ListTasksRequest): Promise<ListTasksResponse> {
    const tasks = await this.taskService.findAll();
    console.log({ tasks });

    const res = ListTasksResponse.create({
      tasks: tasks.map((t) =>
        Task.create({
          id: t.id,
          title: t.title,
          description: t.description,
          status: t.status,
        }),
      ),
    });

    console.log({ res });

    return res;
  }

  @GrpcMethod('TaskService')
  async GetTask(request: GetTaskRequest): Promise<Task> {
    console.log({ request });
    return await this.taskService.findById(request.id);
  }

  @GrpcMethod('TaskService')
  async UpdateTask(request: UpdateTaskRequest): Promise<Task> {
    const task = request.task;
    console.log({ request });
    return await this.taskService.update(task.id, task);
  }

  @GrpcMethod('TaskService')
  async DeleteTask(request: DeleteTaskRequest): Promise<Task> {
    console.log(request);
    console.log('coucou', { request });
    return await this.taskService.remove(request.id);
  }
}
