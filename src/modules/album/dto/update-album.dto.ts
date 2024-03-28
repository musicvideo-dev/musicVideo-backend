import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { AlbumStatus } from "../types/album.type";

export class UpdateAlbumDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    name: string

    @ApiProperty()
    @IsNotEmpty()
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

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    artistId: number

    @ApiProperty({ enum: AlbumStatus })
    @IsOptional()
    @IsEnum(AlbumStatus)
    status: AlbumStatus
}