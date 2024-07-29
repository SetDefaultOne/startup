import { IsAlphanumeric, IsLowercase, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @MaxLength(24)
    @IsAlphanumeric("en-US")
    @IsLowercase()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}
