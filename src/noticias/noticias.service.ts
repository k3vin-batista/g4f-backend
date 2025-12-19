import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INoticiaRepositoryToken } from '@noticias/repositories/noticia.repository.interface';
import type { INoticiaRepository } from '@noticias/repositories/noticia.repository.interface';
import { CreateNoticiaDto } from '@noticias/dto/create-noticia.dto';
import { UpdateNoticiaDto } from '@noticias/dto/update-noticia.dto';
import { ListNoticiasQueryDto } from './dto/list-noticias.query.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '@shared/pagination/pagination.constants';

@Injectable()
export class NoticiasService {
  constructor(
    @Inject(INoticiaRepositoryToken)
    private readonly noticiaRepository: INoticiaRepository,
  ) {}

  create(dto: CreateNoticiaDto) {
    return this.noticiaRepository.create(dto);
  }

  async findAllPaginated(query: ListNoticiasQueryDto) {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;

    const { data, total } = await this.noticiaRepository.findPaginated({
      page,
      limit,
      titulo: query.titulo,
      descricao: query.descricao,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async findOne(id: string) {
    const noticia = await this.noticiaRepository.findById(id);

    if (!noticia) {
      throw new NotFoundException('Noticia not found');
    }

    return noticia;
  }

  update(id: string, dto: UpdateNoticiaDto) {
    return this.noticiaRepository.update(id, dto);
  }

  remove(id: string) {
    return this.noticiaRepository.delete(id);
  }
}
