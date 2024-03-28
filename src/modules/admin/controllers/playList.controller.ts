import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { CreatePlayListDto } from "src/modules/playlist/dto/create-playlist.dto";
import { UpdatePlayListDto } from "src/modules/playlist/dto/update-playList.dto";
import { PlayListService } from "src/modules/playlist/playList.service";

@ApiTags('Admin/PlayList')
@Controller('/admin/playList')
export class PlayListController {
    constructor(
        private readonly playListService: PlayListService
    ) {

    }
    @Post('/')
    async createPlayListByAdmin(@Body() dto: CreatePlayListDto) {
        return await this.playListService.createPlayListByAdmin(dto);
    }

    @Get('/')
    async getPlayListsByAdmin(@Query() paginationDto: PaginationDto) {
        return await this.playListService.getPlayListsByAdmin(paginationDto)
    }

    @Get('/:id')
    async getPlayListByAdmin(@Param('id', ParseIntPipe) id: number) {
        return await this.playListService.getPlayListByAdmin(id);
    }

    @Delete('/:id')
    async deletePlayListByAdmin(@Param('id', ParseIntPipe) id: number) {
        return await this.playListService.deletePlayListByAdmin(id);
    }

    @Patch('/:id')
    async updatePlayListByAdmin(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlayListDto) {
        return await this.playListService.updatePlayListByAdmin(id, dto);
    }
}