import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayList } from "./entity/playlist.entity";
import { In, Repository } from "typeorm";
import { PaginationDto } from "src/lib/dto/pagination.dto";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { Track } from "../track/entity/track.entity";
import { PlayListStatus } from "./types/playlist.type";
import { UpdatePlayListDto } from "./dto/update-playList.dto";

@Injectable()
export class PlayListService {
    constructor(
        @InjectRepository(PlayList) private playListRepository: Repository<PlayList>,
        @InjectRepository(Track) private trackRepository: Repository<Track>,
    ) {

    }

    async getPlayLists(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.playListRepository.findAndCount({
            take: limit,
            skip: (limit) * (skip - 1),
            where: {
                status: PlayListStatus.CONFIRMED
            }
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

    async getPlayList(id: number) {
        const playList = await this.playListRepository.findOneBy({ id, status: PlayListStatus.CONFIRMED });
        if (!playList) throw new NotFoundException()
        return playList
    }

    async createPlayListByAdmin(dto: CreatePlayListDto) {
        const { coverUrl, imgUrl, name, slug, trackIds } = dto
        const tracks = await this.trackRepository.find({
            where: {
                id: In(trackIds)
            }
        });
        const duplicateSlug = await this.playListRepository.findOneBy({
            slug
        });
        if (duplicateSlug) throw new BadRequestException()
        return await this.playListRepository.save({
            name,
            slug,
            status: PlayListStatus.CONFIRMED,
            ...(imgUrl && {
                imgUrl
            }),
            ...(coverUrl && {
                coverUrl
            }),
            tracks
        })

    }

    async getPlayListsByAdmin(paginationDto: PaginationDto) {
        const { limit = 10, skip = 1 } = paginationDto
        const [items, count] = await this.playListRepository.findAndCount({
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


    async getPlayListByAdmin(id: number) {
        const playList = await this.playListRepository.findOneBy({ id });
        if (!playList) throw new NotFoundException()
        return playList
    }


    async deletePlayListByAdmin(id: number) {
        const playList = await this.playListRepository.findOneBy({ id });
        if (!playList) throw new NotFoundException()
        return await this.playListRepository.delete({ id })
    }

    async updatePlayListByAdmin(id: number, dto: UpdatePlayListDto) {
        const { coverUrl, imgUrl, name, slug, trackIds, status } = dto
        const playList = await this.playListRepository.findOneBy({ id });
        if (!playList) throw new NotFoundException()
        const duplicateSlug = await this.playListRepository.findOneBy({ slug });
        if (duplicateSlug && slug) throw new BadRequestException()

        const tracks = await this.trackRepository.find({
            where: {
                id: In(trackIds || [])
            }
        })
        await this.playListRepository.update({ id }, {
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
            }),
            ...(tracks.length && {
                tracks
            })
        })
        return await this.playListRepository.findOneBy({ id })
    }
}