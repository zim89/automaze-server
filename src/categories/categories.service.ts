import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const normalizedName = createCategoryDto.name.toLowerCase().trim();
    const existingCategory = await this.findOneByName(normalizedName);

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    return await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        name: normalizedName,
      },
    });
  }

  async findMany() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOneByName(name: string) {
    return await this.prisma.category.findUnique({
      where: { name: name.toLowerCase().trim() },
    });
  }

  async findOneById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOneById(id); // Check if category exists

    // Check if new name conflicts with existing category
    if (updateCategoryDto.name) {
      const existingCategory = await this.findOneByName(updateCategoryDto.name);
      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    await this.findOneById(id); // Check if category exists

    // Check if category has tasks
    const taskCount = await this.prisma.task.count({
      where: { categoryId: id },
    });

    if (taskCount > 0) {
      throw new ConflictException(
        `Cannot delete category with ${taskCount} tasks. Please reassign or delete tasks first.`,
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
