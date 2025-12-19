import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoticiaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
