import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity('noticias')
export class Noticia extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;
}
