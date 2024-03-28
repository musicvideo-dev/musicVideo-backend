import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator"
import { TrackStatus } from "../types/track.type"

export class UpdateTrackDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3,15)
    name:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 15)
    slug: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    imgUrl:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    coverUrl:string

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    artistId:number

    @ApiProperty({enum: TrackStatus})
    @IsOptional()
    @IsEnum(TrackStatus)
    status:TrackStatus

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    duration:number

    @ApiProperty()
    @IsOptional()
    @IsDate()
    releaseDate: Date
}