import { UserRole } from '@prisma/client';
import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';   

export class CreateUserDto {

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    avatarUrl?: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    adminCode: string;

    @IsOptional()
    role: UserRole;
}
