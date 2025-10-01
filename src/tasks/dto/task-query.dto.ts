import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export enum TaskStatus {
  ALL = 'all',
  DONE = 'done',
  UNDONE = 'undone',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sortBy?: SortOrder;

  @IsOptional()
  @Transform(({ value }) => parseInt(value as string) || 1)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value as string) || 20)
  @IsInt()
  limit?: number = 20;
}
