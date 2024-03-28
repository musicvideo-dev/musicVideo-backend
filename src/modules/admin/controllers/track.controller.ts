import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { CreateTrackDto } from "src/modules/track/dto/create-track.dto";
import { UpdateTrackDto } from "src/modules/track/dto/update-track.dto";
import { TrackService } from "src/modules/track/track.service";

@Controller('/admin/track')
@ApiTags('Admin/track')
export class TrackController {
    constructor(
        private readonly trackService: TrackService
    ) {

    }
    @Get('/')
    async getTracksByAdmin(@Query() paginationDto: PaginationDto) {
        return await this.trackService.getTracksByAdmin(paginationDto)
    }

    @Get('/:id')
    async getTrackByAdmin(@Param('id',ParseIntPipe) id:number){
        return await this.trackService.getTrackByAdmin(id);
    }

    @Delete('/:id')
    async deleteTrackByAdmin(@Param('id',ParseIntPipe) id:number){
        return await this.trackService.deleteTrackByAdmin(id)
    }

    @Post('/')
    async createTrackByAdmin(@Body() dto:CreateTrackDto){
        return await this.trackService.createTrackByAdmin(dto);
    }

    @Patch('/:id')
    async updateTrackByAdmin(@Param('id',ParseIntPipe) id:number , @Body() dto:UpdateTrackDto){
        return await this.trackService.updateTrackByAdmin(id,dto);
    }
}