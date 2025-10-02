import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface CategoryStat {
  name: string;
  count: number;
  color: string | null;
}

export interface TasksStats {
  totalTasks: number;
  doneTasks: number;
  pendingTasks: number;
  completionRate: number;
  overdueTasks: number;
  topCategories: CategoryStat[];
}

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getTasksStats(): Promise<TasksStats> {
    // Get all tasks with categories
    const tasks = await this.prisma.task.findMany({
      include: {
        category: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    });

    const totalTasks = tasks.length;
    const doneTasks = tasks.filter((t) => t.isDone).length;
    const pendingTasks = totalTasks - doneTasks;
    const completionRate =
      totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    // Calculate overdue tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < today && !t.isDone,
    ).length;

    // Calculate top 3 categories
    const categoryCounts = tasks.reduce(
      (acc, task) => {
        if (task.category) {
          const categoryName = task.category.name;
          if (!acc[categoryName]) {
            acc[categoryName] = {
              name: categoryName,
              count: 0,
              color: task.category.color,
            };
          }
          acc[categoryName].count++;
        }
        return acc;
      },
      {} as Record<string, CategoryStat>,
    );

    const topCategories = Object.values(categoryCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      totalTasks,
      doneTasks,
      pendingTasks,
      completionRate,
      overdueTasks,
      topCategories,
    };
  }
}
