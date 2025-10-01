import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto, TaskStatus, SortOrder } from './dto/task-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  private validateId(id: string) {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid ID format');
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });
  }

  async findMany(query: TaskQueryDto) {
    const {
      search,
      status,
      category,
      sortField,
      sortBy,
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.TaskWhereInput = {};

    // Search by title or description
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by status
    if (status === TaskStatus.DONE) {
      where.isDone = true;
    } else if (status === TaskStatus.UNDONE) {
      where.isDone = false;
    }

    // Filter by category
    if (category) {
      where.category = { name: { equals: category.toLowerCase().trim() } };
    }

    // Dynamic sorting
    let orderBy:
      | Prisma.TaskOrderByWithRelationInput
      | Prisma.TaskOrderByWithRelationInput[];

    if (sortField && sortBy) {
      const order = sortBy === SortOrder.ASC ? 'asc' : 'desc';

      switch (sortField) {
        case 'title':
          orderBy = { title: order };
          break;
        case 'category':
          orderBy = { category: { name: order } };
          break;
        case 'priority':
          orderBy = { priority: order };
          break;
        case 'createdAt':
          orderBy = { createdAt: order };
          break;
        default:
          orderBy = { createdAt: 'desc' };
      }
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOneById(id: string) {
    this.validateId(id);

    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    this.validateId(id);
    await this.findOneById(id); // Check if task exists

    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto,
        dueDate: updateTaskDto.dueDate
          ? new Date(updateTaskDto.dueDate)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    this.validateId(id);
    await this.findOneById(id); // Check if task exists

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggleDone(id: string) {
    this.validateId(id);
    const task = await this.findOneById(id);

    return this.prisma.task.update({
      where: { id },
      data: { isDone: !task.isDone },
    });
  }
}
