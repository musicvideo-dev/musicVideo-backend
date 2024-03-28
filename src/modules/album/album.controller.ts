import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { AlbumService } from "./album.service";


@ApiTags('Album')
@Controller()
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {

    }
    @Get('/album')
    async getAlbums(@Query() paginationDto: PaginationDto) {
        return await this.albumService.getAlbums(paginationDto);
    }

    @Get('/album/:id')
    async getAlbum(@Param('id', ParseIntPipe) id: number) {
        return await this.albumService.getAlbum(id);
    }

    @Get('/album/:id/track')
    async getTracks(@Query() pagintionDto: PaginationDto, @Param('id', ParseIntPipe) id: number) {
        return await this.albumService.getTracks(id, pagintionDto)
    }
}