import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import AdminTokenGuard from "./guards/access-token.guard";
import { AdminTokenStrategy } from "./guards/access-token.strategy";
import { CommonModule } from "../common/common.module";
import { Admin } from "./entity/admin.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AdminController } from "./controllers/admin.controller";
import { AdminService } from "./services/admin.service";
import { TrackModule } from "../track/track.module";
import { TrackController } from "./controllers/track.controller";
import { ArtistController } from "./controllers/artist.controller";
import { ArtistModule } from "../artist/artist.module";
import { PlayListModule } from "../playlist/playlist.module";
import { PlayListController } from "./controllers/playList.controller";
import { AlbumModule } from "../album/album.module";
import { AlbumController } from "./controllers/album.controller";

@Module({
    imports: [
        ConfigModule.forRoot({}),
        CommonModule,
        TypeOrmModule.forFeature([Admin]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ADMIN_JWT_SECRET'),
                signOptions: {},
            }),
            inject: [ConfigService],
        }),
        TrackModule,
        ArtistModule,
        PlayListModule,
        AlbumModule,
    ],
    controllers: [
        AuthController,
        AdminController,
        TrackController,
        ArtistController,
        PlayListController,
        AlbumController
    ],
    exports: [
        AuthService,
        AdminService,
        AdminTokenGuard,
        AdminTokenStrategy
    ],
    providers: [
        AuthService,
        AdminService,
        AdminTokenGuard,
        AdminTokenStrategy
    ]
})

export class AdminModule {

}