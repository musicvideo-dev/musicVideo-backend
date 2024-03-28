import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateTrackDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    slug: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    imgUrl: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    coverUrl: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    artistId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    duration:number

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    releaseDate: Date

}