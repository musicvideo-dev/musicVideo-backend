import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "./entity/track.entity";
import { Artist } from "../artist/entity/artist.entity";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Track, Artist])
    ],
    controllers: [
        TrackController
    ],
    providers: [
        TrackService
    ],
    exports: [
        TrackService
    ]
})

export class TrackModule {

}