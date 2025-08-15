import { IsNotEmpty, IsString } from "class-validator";

export class CreateTripDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @IsNotEmpty()
    createdBy: string;

    @IsString()
    startDate?: Date;

    @IsString()
    endDate?: Date;

    @IsString()
    description?: string;
}
