import {
  IsNumber,
  IsOptional,
  //   IsEnum,
  //   IsJSON,
  IsNotEmpty,
} from 'class-validator';
// import { ApplicationStatus } from '../entities/application.entity';

export class CreateApplicationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  majorId: number;

  @IsNumber()
  combinationId: number;

  @IsNotEmpty()
  personalInfo: any;

  @IsNumber()
  score: number;

  @IsOptional()
  priorityObject?: string;
}
