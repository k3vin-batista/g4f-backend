import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNoticiaDto {
  @ApiPropertyOptional({ example: 'Novo título da notícia' })
  @IsString()
  @IsOptional()
  titulo: string;

  @ApiPropertyOptional({ example: 'Nova descrição da notícia' })
  @IsString()
  @IsOptional()
  descricao: string;
}
