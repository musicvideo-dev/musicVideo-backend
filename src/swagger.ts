import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AdminModule } from './modules/admin/admin.module';
import { PlayListModule } from './modules/playlist/playlist.module';
import { AlbumModule } from './modules/album/album.module';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle(' Music Video Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: ``,
                name: 'authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            },
            'access-token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [
            ArtistModule,
            TrackModule,
            PlayListModule,
            AlbumModule

        ],
    });
    SwaggerModule.setup('/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const options = new DocumentBuilder()
        .setTitle('Music Video Admin Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                name: 'Admin-Access-Token',
                type: 'oauth2',
                scheme: 'Bearer',
                bearerFormat: 'JWT',
                flows: {
                    password: {
                        tokenUrl: '/api/v1/admin/auth/oauth2-login',
                        refreshUrl: '/api/v1/admin/auth/refresh-token',
                        scopes: {},
                    },
                },
            },
            'Admin-Access-Token',
        )
        .build();
    const adminDocument = SwaggerModule.createDocument(app, options, {
        include: [
            AdminModule
        ],
    });
    SwaggerModule.setup('/admin-docs', app, adminDocument, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}