import { Module } from '@nestjs/common';
import { ArtistModule } from './modules/artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from './modules/track/track.module';
import { AdminModule } from './modules/admin/admin.module';
import { PlayListModule } from './modules/playlist/playlist.module';
import { AlbumModule } from './modules/album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: false,
      synchronize: true,
      entities: [
        'dist/**/**/**/*.entity{.ts,.js}',
        'dist/**/**/*.entity{.ts,.js}',
      ]

    }),
    ArtistModule,
    TrackModule,
    PlayListModule,
    AlbumModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
