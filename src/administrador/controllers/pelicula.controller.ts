import {
  Controller, Post, Body, Get, Param, Patch, UploadedFile, UseInterceptors, ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PeliculaService } from '../services/pelicula.service';
import { CreatePeliculaDto } from '../dtos/create-pelicula.dto';
import { UpdatePeliculaDto } from '../dtos/update-pelicula.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { Express } from 'express';

@Controller('peliculas')
export class PeliculaController {
  constructor(
    private readonly peliculaService: PeliculaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseInterceptors(FileInterceptor('imagen'))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePeliculaDto,
  ) {
    const uploaded = await this.cloudinaryService.uploadImage(file);
    const imageUrl = uploaded.secure_url;
    return this.peliculaService.create(dto, imageUrl);
  }

  @Get()
  findAll() {
    return this.peliculaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peliculaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeliculaDto,
  ) {
    return this.peliculaService.update(id, dto);
  }

  @Patch(':id/inhabilitar')
  inhabilitar(@Param('id', ParseIntPipe) id: number) {
    return this.peliculaService.inhabilitar(id);
  }

  @Get(':id/sedes-horarios')
  getSedesConHorarios(@Param('id', ParseIntPipe) id: number) {
    return this.peliculaService.obtenerSedesConHorarios(id);
  }
}
