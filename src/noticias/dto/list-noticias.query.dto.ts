import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListNoticiasQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page!: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit!: number;

  @ApiPropertyOptional({ example: 'política' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ example: 'economia' })
  @IsOptional()
  @IsString()
  descricao?: string;
}
