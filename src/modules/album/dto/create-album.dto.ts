import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateAlbumDto {
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
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    trackIds: number[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    artistId:number
}