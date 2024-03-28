import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { AlbumService } from "src/modules/album/album.service";
import { CreateAlbumDto } from "src/modules/album/dto/create-album.dto";
import { UpdateAlbumDto } from "src/modules/album/dto/update-album.dto";

@Controller('/admin/album')
@ApiTags('Album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService
  ) {

  }
  @Post('/')
  async createAlbumByAdmin(@Body() dto: CreateAlbumDto) {
    return await this.albumService.createAlbumByAdmin(dto)
  }

  @Get('/')
  async getAlbumsByAdmin(@Query() pagintionDto: PaginationDto) {
    return await this.albumService.getAlbumsByAdmin(pagintionDto)
  }

  @Get('/:id')
  async getAlbumByAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.albumService.getAlbumByAdmin(id);
  }

  @Delete('/:id')
  async deleteAlbumByAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.albumService.deleteAlbumByAdmin(id);
  }

  @Patch('/:id')
  async updateAlbumByAdmin(@Param('id',ParseIntPipe) id:number , @Body() dto:UpdateAlbumDto){
    return await this.albumService.updateAlbumByAdmin(id,dto);
  }
}