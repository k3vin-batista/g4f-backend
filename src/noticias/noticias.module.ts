import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from '@noticias/entities/noticia.entity';
import { NoticiasController } from '@noticias/noticias.controller';
import { NoticiasService } from '@noticias/noticias.service';
import { NoticiaRepository } from '@noticias/repositories/noticia.repository';
import { INoticiaRepositoryToken } from '@noticias/repositories/noticia.repository.interface';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia]), SharedModule],
  controllers: [NoticiasController],
  providers: [
    NoticiasService,
    {
      provide: INoticiaRepositoryToken,
      useClass: NoticiaRepository,
    },
  ],
})
export class NoticiasModule {}
