import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { NoticiasModule } from '@noticias/noticias.module';

@Module({
  imports: [CoreModule, SharedModule, NoticiasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
