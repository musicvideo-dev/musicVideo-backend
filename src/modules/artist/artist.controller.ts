import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArtistService } from "./artist.service";
import { PaginationDto } from "src/lib/dto/pagination.dto";


@ApiTags('Artist')
@Controller('/artist')
export class ArtistController {
    constructor(
        private readonly artistService: ArtistService
    ) {

    }
    @Get('/')
    async getArtists(@Query() paginationDto:PaginationDto) {
        return await this.artistService.getArtists(paginationDto)
    }

    @Get('/:id')
    async getArtist(@Param('id', ParseIntPipe) id: number) {
        return await this.artistService.getArtist(id);
    }

    @Get('/:id/track')
    async getTracks(@Query() paginationDto: PaginationDto, @Param('id', ParseIntPipe) id: number) {
        return await this.artistService.getTracks(id, paginationDto)
    }
    @Get('/:id/album')
    async getAlbums(@Query() pagintionDto:PaginationDto){
        return await this.artistService.getAlbums(pagintionDto)
    }
}