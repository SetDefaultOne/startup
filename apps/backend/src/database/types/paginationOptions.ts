import { IsInt, IsOptional, IsPositive } from "class-validator";

export class PaginationOptions {
    @IsInt()
    @IsPositive()
    @IsOptional()
    page?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    size?: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    take?: number;
}
