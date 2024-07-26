# Bootstrap Brand - SDK

The SDK package binds client-server communication between `apps/frontend` and `apps/backend`. Using the SDK provides
type-safe request-response schemas that both the client and server adhere to.

## Usage

```typescript
import { Sdk, isQuerySuccess, isQueryClientFail } from "@bootstrap-brand/sdk";

const sdk = new Sdk({
    url: "http://localhost:4200/",
});

async function main() {
    const result = await sdk.ping.postPing({ message: "Ping!" });

    if (isQuerySuccess(result)) {
        JSON.stringify(result.data, null, 4); // Success data.
    } else if (isQueryClientFail(result)) {
        JSON.stringify(result.error); // Client error.
    } else {
        result.message; // Server error.
    }
}

main();
```
