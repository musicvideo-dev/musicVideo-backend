import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNumberString, IsOptional, IsString, Length, MinLength } from "class-validator";

export class UpdateProfileAdminDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 30)
    firstName: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 30)
    lastName: string


    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    @IsMobilePhone('fa-IR')
    mobile: string


    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string


    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3,10)
    username: string


    @ApiProperty()
    @IsOptional()
    @MinLength(8)
    password:string

    @ApiProperty()
    @IsOptional()
    @MinLength(8)
    confirmPassword:string
}