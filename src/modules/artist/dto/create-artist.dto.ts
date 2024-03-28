import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateArtistDto {
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
}