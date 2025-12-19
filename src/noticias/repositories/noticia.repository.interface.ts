import { Noticia } from '@noticias/entities/noticia.entity';

export const INoticiaRepositoryToken = Symbol('INoticiaRepository');

export interface INoticiaRepository {
  create(data: Pick<Noticia, 'titulo' | 'descricao'>): Promise<Noticia>;
  findById(id: string): Promise<Noticia | null>;
  findAll(): Promise<Noticia[]>;
  update(
    id: string,
    data: Pick<Noticia, 'titulo' | 'descricao'>,
  ): Promise<Noticia>;
  delete(id: string): Promise<void>;
}
