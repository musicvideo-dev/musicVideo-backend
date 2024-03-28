import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayList } from "./entity/playlist.entity";
import { PlayListController } from "./playList.controller";
import { PlayListService } from "./playList.service";
import { Track } from "../track/entity/track.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayList, Track])
    ],
    controllers: [
        PlayListController,
    ],
    exports: [
        PlayListService
    ],
    providers: [
        PlayListService
    ]
})

export class PlayListModule {

}