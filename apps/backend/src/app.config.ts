import { registerAs } from "@nestjs/config";

export const AppConfigKey = "app";

export enum DeploymentEnvironment {
    "production" = "production",
    "development" = "development",
    "test" = "test",
}

export interface AppConfig {
    deployment: {
        environment: DeploymentEnvironment;
        port: number;
    };
}

export default registerAs(AppConfigKey, () => ({
    deployment: {
        environment: process.env.NODE_ENV || "development",
        port: Number(process.env.PORT) || 4200,
    },
}));
