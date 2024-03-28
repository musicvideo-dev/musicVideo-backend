import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Track } from "./entity/track.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Artist } from "../artist/entity/artist.entity";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { TrackStatus } from "./types/track.type";

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track) private trackRepository: Repository<Track>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    ) {

    }
    async getTracks(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.trackRepository.findAndCount({
            relations: ['artist'],
            take: limit,
            skip: (limit) * (skip - 1),
            where: {
                status: TrackStatus.CONFIRMED
            }
        });
        return {
            items,
            pagination: {
                count,
                limit,
                skip,
                page: Math.ceil(count / limit)
            }
        }
    }

    async getTrack(id: number) {
        const track = await this.trackRepository.findOne({ where: { id, status: TrackStatus.CONFIRMED }, relations: ['artist'] });
        if (!track) throw new NotFoundException()
        return track
    }
    async getTracksByAdmin(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.trackRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1)
        });
        return {
            items,
            pagination: {
                count,
                limit,
                skip,
                page: Math.ceil(count / limit)
            }
        }
    }

    async getTrackByAdmin(id: number) {
        const track = await this.trackRepository.findOne({
            where: {
                id
            },
            relations: ['artist']
        });
        if (!track) throw new NotFoundException()
        return track
    }

    async deleteTrackByAdmin(id: number) {
        const track = await this.trackRepository.findOne({
            where: {
                id
            },
            relations: ['artist']
        });
        if (!track) throw new NotFoundException()
        return await this.trackRepository.delete({ id })
    }

    async createTrackByAdmin(dto: CreateTrackDto) {
        const { artistId, coverUrl, imgUrl, name, slug } = dto
        const artist = await this.artistRepository.findOneBy({
            id: artistId
        });
        const duplicateSlug = await this.trackRepository.findOneBy({
            slug
        });
        if (duplicateSlug) throw new BadRequestException()
        if (!artist) throw new NotFoundException()
        return await this.trackRepository.save({
            artistId,
            name,
            ...(coverUrl && {
                coverUrl
            }),
            ...(imgUrl && {
                imgUrl
            }),
            slug,
            status: TrackStatus.CONFIRMED
        })
    }
    async updateTrackByAdmin(id: number, dto: UpdateTrackDto) {
        const { artistId, coverUrl, imgUrl, name, slug, status } = dto
        const track = await this.trackRepository.findOneBy({ id });
        if (!track) throw new NotFoundException()
        const duplicateSlug = await this.trackRepository.findOneBy({
            slug
        });
        if (duplicateSlug && slug) throw new BadRequestException()
        const artist = await this.artistRepository.findOneBy({
            id: artistId
        });
        if (!artist && artistId) throw new BadRequestException()
        await this.trackRepository.update({ id }, {
            ...(name && {
                name
            }),
            ...(slug && {
                slug
            }),
            ...(coverUrl && {
                coverUrl
            }),
            ...(imgUrl && {
                imgUrl
            }),
            ...(artistId && {
                artistId
            }),
            ...(status && {
                status
            })
        })
        return await this.trackRepository.findOne({
            where: {
                id
            },
            relations: ['artist']
        })
    }
}