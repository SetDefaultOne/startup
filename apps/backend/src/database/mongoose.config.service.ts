import { Inject, Injectable, Logger } from "@nestjs/common";
import databaseConfig from "./database.config";
import { ConfigType } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    private readonly logger = new Logger(MongooseConfigService.name);

    constructor(
        @Inject(databaseConfig.KEY)
        private readonly databaseConfiguration: ConfigType<typeof databaseConfig>,
    ) {}

    createMongooseOptions(): MongooseModuleOptions {
        const { host, port, username, password, database } = this.databaseConfiguration.mongodb;

        return {
            uri: `mongodb://${username}:${password}@${host}:${port}/`,
            dbName: database,
        };
    }
}
