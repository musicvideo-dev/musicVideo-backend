import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { Album } from "./entity/album.entity";
import { In, Repository } from "typeorm";
import { AlbumStatus } from "./types/album.type";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Artist } from "../artist/entity/artist.entity";
import { Track } from "../track/entity/track.entity";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
        @InjectRepository(Album) private trackRepository: Repository<Track>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    ) {

    }
    async getAlbums(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.albumRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1),
            where: {
                status: AlbumStatus.CONFIRMED
            }
        });
        return {
            items,
            pagination: {
                limit,
                skip,
                count,
                page: Math.ceil(count / limit)
            }
        }
    }

    async getAlbum(id: number) {
        const album = await this.albumRepository.findOneBy({ id, status: AlbumStatus.CONFIRMED });
        if (!album) throw new NotFoundException()
        return album
    }

    async createAlbumByAdmin(dto: CreateAlbumDto) {
        const { coverUrl, imgUrl, name, slug, trackIds, artistId } = dto
        const tracks = await this.trackRepository.find({
            where: {
                id: In(trackIds)
            }
        });
        const artist = await this.artistRepository.findOneBy({
            id: artistId
        })
        const duplicateSlug = await this.albumRepository.findOneBy({
            slug
        });
        if (duplicateSlug) throw new BadRequestException()
        return await this.albumRepository.save({
            name,
            slug,
            status: AlbumStatus.CONFIRMED,
            ...(imgUrl && {
                imgUrl
            }),
            ...(coverUrl && {
                coverUrl
            }),
            artist,
            trackAlbums: tracks
        })
    }

    async getAlbumsByAdmin(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.albumRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1),
            relations: ['artist']
        });
        return {
            items,
            pagintion: {
                limit,
                skip,
                count,
                page: Math.ceil(count / limit)
            }
        }
    }

    async getAlbumByAdmin(id: number) {
        const album = await this.albumRepository.findOneBy({ id });
        if (!album) throw new NotFoundException()
        return album
    }

    async deleteAlbumByAdmin(id: number) {
        const album = await this.albumRepository.findOneBy({ id });
        if (!album) throw new NotFoundException();
        return await this.albumRepository.delete({ id })
    }

    async updateAlbumByAdmin(id: number, dto: UpdateAlbumDto) {
        const { coverUrl, imgUrl, name, slug, trackIds, artistId, status } = dto
        const album = await this.albumRepository.findOneBy({ id });
        if (!album) throw new NotFoundException()
        const duplicateSlug = await this.albumRepository.findOneBy({
            slug
        });
        if (duplicateSlug && slug) throw new BadRequestException()
        const artist = await this.albumRepository.findOneBy({ id: artistId });
        if (!artist && artistId) throw new BadRequestException()
        const tracks = await this.trackRepository.find({
            where: {
                id: In(trackIds)
            }
        });
        await this.albumRepository.update({ id }, {
            ...(name && {
                name
            }),
            ...(imgUrl && {
                imgUrl
            }),
            ...(coverUrl && {
                coverUrl
            }),
            ...(slug && {
                slug
            }),
            ...(artistId && {
                artistId
            }),
            ...(tracks.length && {
                trackAlbums: tracks
            }),
            ...(status && {
                status
            })

        })

    }

    async getTracks(albumId: number, paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.trackRepository.findAndCount({
            where: {
                albumId
            },
            take: limit,
            skip: (limit) * (skip - 1)
        });
        return {
            items,
            pagintion: {
                limit,
                skip,
                count,
                page: Math.ceil(count / limit)
            }
        }
    }
}