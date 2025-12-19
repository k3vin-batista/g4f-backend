import { Noticia } from '@noticias/entities/noticia.entity';
import { PaginatedResult } from '@shared/pagination/paginated-result.interface';

export const INoticiaRepositoryToken = Symbol('INoticiaRepository');

export interface INoticiaRepository {
  create(data: Pick<Noticia, 'titulo' | 'descricao'>): Promise<Noticia>;
  findById(id: string): Promise<Noticia | null>;
  findPaginated(params: {
    page: number;
    limit: number;
    titulo?: string;
    descricao?: string;
  }): Promise<PaginatedResult<Noticia>>;
  update(
    id: string,
    data: Pick<Noticia, 'titulo' | 'descricao'>,
  ): Promise<Noticia>;
  delete(id: string): Promise<void>;
}
