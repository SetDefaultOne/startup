import { Inject, Injectable, Logger } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import databaseConfig from "./database.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private readonly logger = new Logger(TypeOrmConfigService.name);

    constructor(
        @Inject(databaseConfig.KEY)
        private readonly databaseConfiguration: ConfigType<typeof databaseConfig>,
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.databaseConfiguration.postgres.host,
            port: this.databaseConfiguration.postgres.port,
            username: this.databaseConfiguration.postgres.username,
            password: this.databaseConfiguration.postgres.password,
            database: this.databaseConfiguration.postgres.database,
            autoLoadEntities: true,
        };
    }
}
