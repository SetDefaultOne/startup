export type ErrorCode = `E-${string}${number}`;

export type HostUrl = `${"http" | "https"}://${string}/`;

/**
 * @warn
 * `string | Date` union type is only used to satisfy the TypeScript compiler. Timestamps are always `string`.
 */
export type TimestampLike = string | Date;
