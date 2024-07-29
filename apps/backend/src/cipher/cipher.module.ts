import { Module } from "@nestjs/common";
import { CipherService } from "./cipher.service";
import { ConfigModule } from "@nestjs/config";
import cipherConfig from "./cipher.config";

@Module({
    imports: [ConfigModule.forFeature(cipherConfig)],
    providers: [CipherService],
    exports: [CipherService],
})
export class CipherModule {}
