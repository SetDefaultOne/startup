import { registerAs } from "@nestjs/config";
import { DeploymentEnvironment } from "@bootstrap-brand/sdk";

export const AppConfigKey = "app";

export interface AppConfig {
    deployment: {
        environment: DeploymentEnvironment;
        host: string;
        port: number;
    };
}

export default registerAs(
    AppConfigKey,
    () =>
        ({
            deployment: {
                environment: process.env.NODE_ENV,
                host: process.env.HOST,
                port: process.env.PORT,
            },
        }) satisfies AppConfig,
);
