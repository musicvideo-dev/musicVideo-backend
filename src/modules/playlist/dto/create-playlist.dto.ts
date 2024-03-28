import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, IsOptional, ArrayNotEmpty, IsArray } from "class-validator"

export class CreatePlayListDto {
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
}