import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, IsOptional, ArrayNotEmpty, IsArray, IsEnum } from "class-validator"
import { PlayListStatus } from "../types/playlist.type"

export class UpdatePlayListDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 30)
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 30)
    slug: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    imgUrl: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    coverUrl: string

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    trackIds: number[];

    @ApiProperty({ enum: PlayListStatus })
    @IsOptional()
    @IsEnum(PlayListStatus)
    status: PlayListStatus
}