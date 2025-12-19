import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { NoticiasModule } from '@noticias/noticias.module';

@Module({
  imports: [CoreModule, NoticiasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
