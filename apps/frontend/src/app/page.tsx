import { Sdk } from "@bootstrap-brand/sdk";
import User from "@@/app/User";

export default async function Home() {
    const sdk = new Sdk("http://localhost:4200/", {
        fetchOptions: { cache: "no-cache" },
    });

    let messageA = "";
    try {
        const result = await sdk.ping.postPing({ message: "Ping!" });

        if (result.success) {
            messageA = JSON.stringify(result.data, null, 4);
        } else if (result.fail) {
            messageA = result.message + " | " + JSON.stringify(result.data);
        } else {
            messageA = result.message + " | " + JSON.stringify(result.data);
        }
    } catch (e) {
        console.error(e);
    }

    let messageB = "";
    try {
        const result = await sdk.users.getUsers({ username: "defaultone" });

        if (result.success) {
            messageB = JSON.stringify(result.data, null, 4);
        } else if (result.fail) {
            messageB = result.message + " | " + JSON.stringify(result.data);
        } else {
            messageB = result.message + " | " + JSON.stringify(result.data);
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
            <User />
        </main>
    );
}
