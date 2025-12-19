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
import { CACHE_SERVICE } from '@shared/cache/cache.token';
import type { CacheService } from '@shared/cache/cache.interface';
import { Noticia } from './entities/noticia.entity';
import { PaginatedResponseDTO } from '@shared/pagination/paginated-result.interface';

@Injectable()
export class NoticiasService {
  private readonly CACHE_TTL_SECONDS = 60;

  constructor(
    @Inject(INoticiaRepositoryToken)
    private readonly noticiaRepository: INoticiaRepository,
    @Inject(CACHE_SERVICE)
    private readonly cache: CacheService,
  ) {}

  create(dto: CreateNoticiaDto) {
    return this.noticiaRepository.create(dto);
  }

  async findAllPaginated(
    query: ListNoticiasQueryDto,
  ): Promise<PaginatedResponseDTO<Noticia>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;

    const titulo = query.titulo ?? '';
    const descricao = query.descricao ?? '';

    // Build cache key
    const cacheKey = this.buildCacheKey({
      page,
      limit,
      titulo,
      descricao,
    });

    const cached =
      await this.cache.get<PaginatedResponseDTO<Noticia>>(cacheKey);

    if (cached) {
      return cached;
    }

    const { data, total } = await this.noticiaRepository.findPaginated({
      page,
      limit,
      titulo: query.titulo,
      descricao: query.descricao,
    });

    const response: PaginatedResponseDTO<Noticia> = {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };

    // Store in cache
    await this.cache.set(cacheKey, response, this.CACHE_TTL_SECONDS);

    return response;
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

  private buildCacheKey(params: {
    page: number;
    limit: number;
    titulo: string;
    descricao: string;
  }): string {
    return [
      'noticias',
      `page=${params.page}`,
      `limit=${params.limit}`,
      `titulo=${params.titulo.toLowerCase()}`,
      `descricao=${params.descricao.toLowerCase()}`,
    ].join('|');
  }
}
