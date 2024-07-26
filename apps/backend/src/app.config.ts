import { registerAs } from "@nestjs/config";
import { DeploymentEnvironment } from "@bootstrap-brand/sdk";

export const AppConfigKey = "app";

export interface AppConfig {
    deployment: {
        environment: DeploymentEnvironment;
        port: number;
    };
}

export default registerAs(
    AppConfigKey,
    () =>
        ({
            deployment: {
                environment: (process.env.NODE_ENV || "development") as DeploymentEnvironment,
                port: Number(process.env.PORT) || 4200,
            },
        }) satisfies AppConfig,
);
