import { Inject, Injectable } from '@nestjs/common';
import { INoticiaRepositoryToken } from '@noticias/repositories/noticia.repository.interface';
import type { INoticiaRepository } from '@noticias/repositories/noticia.repository.interface';
import { CreateNoticiaDto } from '@noticias/dto/create-noticia.dto';
import { UpdateNoticiaDto } from '@noticias/dto/update-noticia.dto';

@Injectable()
export class NoticiasService {
  constructor(
    @Inject(INoticiaRepositoryToken)
    private readonly noticiaRepository: INoticiaRepository,
  ) {}

  create(dto: CreateNoticiaDto) {
    return this.noticiaRepository.create(dto);
  }

  findAll() {
    return this.noticiaRepository.findAll();
  }

  findOne(id: string) {
    return this.noticiaRepository.findById(id);
  }

  update(id: string, dto: UpdateNoticiaDto) {
    return this.noticiaRepository.update(id, dto);
  }

  remove(id: string) {
    return this.noticiaRepository.delete(id);
  }
}
