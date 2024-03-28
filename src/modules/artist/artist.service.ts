import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./entity/artist.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { ArtistStatus } from "./types/artist.type";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { Track } from "../track/entity/track.entity";
import { Album } from "../album/entity/album.entity";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
        @InjectRepository(Track) private trackRepository: Repository<Track>,
        @InjectRepository(Album) private albumRepository: Repository<Album>,
    ) {

    }
    async getArtists(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.artistRepository.findAndCount({
            where: {
                status: ArtistStatus.CONFIRMED
            },
            take: limit,
            skip: (limit) * (skip - 1)
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
    async getArtist(id: number) {
        const artist = await this.artistRepository.findOneBy({ id, status: ArtistStatus.CONFIRMED });
        if (!artist) throw new NotFoundException()
        return artist
    }

    async getArtistsByAdmin(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.artistRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1)
        })
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

    async getArtistByAdmin(id: number) {
        const artist = await this.artistRepository.findOneBy({
            id
        });
        if (!artist) throw new NotFoundException()
        return artist
    }

    async deleteArtistByAdmin(id: number) {
        const artist = await this.artistRepository.findOneBy({
            id
        });
        if (!artist) throw new NotFoundException()
        return await this.artistRepository.delete({ id })
    }

    async createArtistByAdmin(dto: CreateArtistDto) {
        const { coverUrl, imgUrl, name, slug } = dto
        const duplicateSlug = await this.artistRepository.findOneBy({ slug });
        if (duplicateSlug) throw new BadRequestException()
        return await this.artistRepository.save({
            name,
            slug,
            status: ArtistStatus.CONFIRMED,
            ...(coverUrl && {
                coverUrl
            }),
            ...(imgUrl && {
                imgUrl
            })
        })
    }

    async updateArtistByAdmin(id: number, dto: UpdateArtistDto) {
        const { coverUrl, imgUrl, name, slug, status } = dto
        const artist = await this.artistRepository.findOneBy({ id });
        if (!artist) throw new NotFoundException()
        const duplicateSlug = await this.artistRepository.findOneBy({
            slug
        });
        if (duplicateSlug && slug) throw new BadRequestException()
        await this.artistRepository.update({ id }, {
            ...(coverUrl && {
                coverUrl
            }),
            ...(imgUrl && {
                imgUrl
            }),
            ...(name && {
                name
            }),
            ...(slug && {
                slug
            }),
            ...(status && {
                status
            })
        })
        return await this.artistRepository.findOneBy({ id })

    }

    async getTracks(id: number, paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.trackRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1)
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

    async getAlbums(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.albumRepository.findAndCount({
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