import { plainToInstance } from "class-transformer";
import { IsIn, IsNumber, Max, Min, validateSync } from "class-validator";
import { DeploymentEnvironment, deploymentEnvironments } from "@bootstrap-brand/sdk";

class EnvironmentVariables {
    @IsIn(deploymentEnvironments)
    NODE_ENV: DeploymentEnvironment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;
}

export function environmentValidation(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
