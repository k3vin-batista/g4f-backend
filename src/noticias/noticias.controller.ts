import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListNoticiasQueryDto } from './dto/list-noticias.query.dto';

@ApiTags('Noticias')
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly service: NoticiasService) {}

  @Post()
  create(@Body() dto: CreateNoticiaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: ListNoticiasQueryDto) {
    return this.service.findAllPaginated(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoticiaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
