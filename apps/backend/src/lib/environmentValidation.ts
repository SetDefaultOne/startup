import { plainToInstance } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsString, Max, Min, validateSync } from "class-validator";
import { DeploymentEnvironment, deploymentEnvironments } from "@bootstrap-brand/sdk";

class EnvironmentVariables {
    @IsIn(deploymentEnvironments)
    NODE_ENV: DeploymentEnvironment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    @IsNotEmpty()
    POSTGRES_HOST: string;

    @IsNumber()
    @Min(0)
    @Max(65535)
    POSTGRES_PORT: number;

    @IsString()
    @IsNotEmpty()
    POSTGRES_USERNAME: string;

    @IsString()
    @IsNotEmpty()
    POSTGRES_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    POSTGRES_DATABASE: string;
}

export function environmentValidation(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
