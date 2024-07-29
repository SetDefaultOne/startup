import { registerAs } from "@nestjs/config";

export const CipherConfigKey = "cipher";

export interface CipherConfig {
    hash: {
        saltRounds: number;
    };
    encryption: {
        algorithm: string;
        initializationVector: string;
        secret: string;
    };
}

export default registerAs(
    CipherConfigKey,
    () =>
        ({
            hash: {
                saltRounds: 12,
            },
            encryption: {
                algorithm: "aes-256-cbc",
                initializationVector: process.env.ENCRYPTION_INITIALIZATION_VECTOR,
                secret: process.env.ENCRYPTION_SECRET,
            },
        }) satisfies CipherConfig,
);
