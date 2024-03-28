import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "./entity/album.entity";
import { Track } from "../track/entity/track.entity";
import { Artist } from "../artist/entity/artist.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Album, Track , Artist])
    ],
    controllers: [
        AlbumController
    ],
    exports: [
        AlbumService
    ],
    providers: [
        AlbumService
    ]
})
export class AlbumModule {

}