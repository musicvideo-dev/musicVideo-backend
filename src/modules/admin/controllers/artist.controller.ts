import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { ArtistService } from "src/modules/artist/artist.service";
import { CreateArtistDto } from "src/modules/artist/dto/create-artist.dto";
import { UpdateArtistDto } from "src/modules/artist/dto/update-artist.dto";

@ApiTags('Admin/artist')
@Controller('/admin/artist')
export class ArtistController {
    constructor(
        private readonly artistService: ArtistService
    ) {

    }
    @Get('/')
    async getArtistsByAdmin(@Query() paginationDto: PaginationDto) {
        return await this.artistService.getArtistsByAdmin(paginationDto)
    }

    @Get('/:id')
    async getArtistByAdmin(@Param('id', ParseIntPipe) id: number) {
        return await this.artistService.getArtistByAdmin(id);
    }

    @Delete('/:id')
    async deleteArtistByAdmin(@Param('id', ParseIntPipe) id: number) {
        return await this.artistService.deleteArtistByAdmin(id);
    }

    @Post('/')
    async createArtistByAdmin(@Body() dto: CreateArtistDto) {
        return await this.artistService.createArtistByAdmin(dto);
    }

    @Patch('/:id')
    async updateArtistByAdmin(@Body() dto: UpdateArtistDto, @Param('id', ParseIntPipe) id: number) {
        return await this.artistService.updateArtistByAdmin(id, dto);
    }
}