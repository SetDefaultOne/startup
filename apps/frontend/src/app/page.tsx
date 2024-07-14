import { isQueryClientFail, isQuerySuccess, Sdk } from "@bootstrap-brand/sdk";

export default async function Home() {
    const sdk = new Sdk({
        url: "http://localhost:4200/",
    });

    const result = await sdk.ping.postPing({ message: "Ping!" });

    let message = "";
    if (isQuerySuccess(result)) {
        message = JSON.stringify(result.data, null, 4);
    } else if (isQueryClientFail(result)) {
        message = JSON.stringify(result.error);
    } else {
        message = result.message;
    }

    return (
        <main>
            <h1>Bootstrap Brand</h1>
            <pre>{message}</pre>
        </main>
    );
}
