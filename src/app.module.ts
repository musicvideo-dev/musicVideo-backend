import { Module } from '@nestjs/common';
import { ArtistModule } from './modules/artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from './modules/track/track.module';
import { AdminModule } from './modules/admin/admin.module';
import { PlayListModule } from './modules/playlist/playlist.module';
import { AlbumModule } from './modules/album/album.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 2,
    }]),
    ArtistModule,
    TrackModule,
    PlayListModule,
    AlbumModule,
    AdminModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
