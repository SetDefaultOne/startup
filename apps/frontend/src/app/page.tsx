import { isQueryClientFail, isQuerySuccess, Sdk } from "@bootstrap-brand/sdk";

export default async function Home() {
    const sdk = new Sdk({
        url: "http://localhost:4200/",
        fetchOverrides: { cache: "no-cache" },
    });

    let messageA = "";
    try {
        const result = await sdk.ping.postPing({ message: "Ping!" });

        if (isQuerySuccess(result)) {
            messageA = JSON.stringify(result.data, null, 4);
        } else if (isQueryClientFail(result)) {
            messageA = JSON.stringify(result.error);
        } else {
            messageA = result.message;
        }
    } catch (e) {
        console.error(e);
    }

    let messageB = "";
    try {
        const result = await sdk.users.getUsers({ username: "default_one" });

        if (isQuerySuccess(result)) {
            messageB = JSON.stringify(result.data, null, 4);
        } else if (isQueryClientFail(result)) {
            messageB = JSON.stringify(result.error);
        } else {
            messageB = result.message;
        }
    } catch (e) {
        console.error(e);
    }

    let messageC = "";
    try {
        const result = await sdk.users.getUser("6df19034-8089-445d-8935-7941c658d0e3");

        if (isQuerySuccess(result)) {
            messageC = JSON.stringify(result.data, null, 4);
        } else if (isQueryClientFail(result)) {
            messageC = JSON.stringify(result.error);
        } else {
            messageC = result.message;
        }
    } catch (e) {
        console.error(e);
    }

    return (
        <main>
            <h1 className="font-bold text-3xl">Bootstrap Brand</h1>
            <hr />
            <pre>{messageA}</pre>
            <hr />
            <pre>{messageB}</pre>
            <hr />
            <pre>{messageC}</pre>
        </main>
    );
}
