import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TrackService } from "./track.service";
import { PaginationDto } from "src/lib/dto/pagination.dto";

@ApiTags('Track')
@Controller('/track')
export class TrackController {
    constructor(
        private readonly trackService: TrackService
    ) {

    }
    @Get('/')
    async getTracks(@Query() paginationDto: PaginationDto) {
        return await this.trackService.getTracks(paginationDto)
    }

    @Get('/:id')
    async getTrack(@Param('id',ParseIntPipe) id:number){
        return await this.trackService.getTrack(id);
    }
}