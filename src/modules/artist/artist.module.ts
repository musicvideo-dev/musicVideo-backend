import { Module } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "./entity/artist.entity";
import { ArtistController } from "./artist.controller";
import { Track } from "../track/entity/track.entity";
import { Album } from "../album/entity/album.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist, Track , Album])
    ],
    controllers: [
        ArtistController
    ],
    providers: [
        ArtistService
    ],
    exports: [
        ArtistService
    ]
})
export class ArtistModule {

}