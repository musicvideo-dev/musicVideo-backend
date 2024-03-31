import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { PlayListService } from "./playList.service";
import { ThrottlerGuard } from "@nestjs/throttler";


@UseGuards(ThrottlerGuard)

@ApiTags('PlayList')
@Controller('/playList')
export class PlayListController {
    constructor(
        private readonly playListService: PlayListService
    ) {

    }
    @Get('/')
    async getPlayLists(@Query() paginationDto: PaginationDto) {
        return await this.playListService.getPlayLists(paginationDto);
    }

    @Get('/:id')
    async getPlayList(@Param('id',ParseIntPipe) id:number){
        return await this.playListService.getPlayList(id)
    }
}