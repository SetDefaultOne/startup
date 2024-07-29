import { Inject, Injectable } from "@nestjs/common";
import cipherConfig from "./cipher.config";
import { ConfigType } from "@nestjs/config";
import { compare, hash } from "bcrypt";
import { createCipheriv, createDecipheriv } from "crypto";

@Injectable()
export class CipherService {
    constructor(
        @Inject(cipherConfig.KEY)
        private readonly cipherConfiguration: ConfigType<typeof cipherConfig>,
    ) {}

    async hashPassword(password: string): Promise<string> {
        return await hash(password, this.cipherConfiguration.hash.saltRounds);
    }

    async compareHashedPassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    encrypt(value: string): string {
        const { algorithm, initializationVector, secret } = this.cipherConfiguration.encryption;

        const encryptionCipher = createCipheriv(
            algorithm,
            Buffer.from(secret, "hex"),
            Buffer.from(initializationVector, "hex"),
        );

        const updatedEncryptionCipher = encryptionCipher.update(value);
        const finalEncryptionCipher = encryptionCipher.final();

        return Buffer.concat([updatedEncryptionCipher, finalEncryptionCipher]).toString("hex");
    }

    decrypt(value: string): string {
        const { algorithm, initializationVector, secret } = this.cipherConfiguration.encryption;

        const decryptionCipher = createDecipheriv(
            algorithm,
            Buffer.from(secret, "hex"),
            Buffer.from(initializationVector, "hex"),
        );

        const updatedDecryptionCipher = decryptionCipher.update(Buffer.from(value, "hex"));
        const finalDecryptionCipher = decryptionCipher.final();

        return Buffer.concat([updatedDecryptionCipher, finalDecryptionCipher]).toString();
    }
}
