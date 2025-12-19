import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';
import { INoticiaRepository } from './noticia.repository.interface';

@Injectable()
export class NoticiaRepository implements INoticiaRepository {
  constructor(
    @InjectRepository(Noticia)
    private readonly repository: Repository<Noticia>,
  ) {}

  async create(data: Pick<Noticia, 'titulo' | 'descricao'>): Promise<Noticia> {
    const noticia = this.repository.create(data);
    return this.repository.save(noticia);
  }

  async findById(id: string): Promise<Noticia | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Noticia[]> {
    return this.repository.find();
  }

  async update(
    id: string,
    data: Pick<Noticia, 'titulo' | 'descricao'>,
  ): Promise<Noticia> {
    const noticia = await this.findById(id);

    if (!noticia) {
      throw new NotFoundException('Noticia not found');
    }

    Object.assign(noticia, data);
    return this.repository.save(noticia);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Noticia not found');
    }
  }
}
