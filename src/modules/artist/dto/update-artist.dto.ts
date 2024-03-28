import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ArtistStatus } from "../types/artist.type";

export class UpdateArtistDto {
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


    @ApiProperty({ enum: ArtistStatus })
    @IsOptional()
    @IsEnum(ArtistStatus)
    status: ArtistStatus
}