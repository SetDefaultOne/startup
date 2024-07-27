"use client";

import { useEffect, useRef, useState } from "react";
import { Sdk } from "@bootstrap-brand/sdk";

export default function User() {
    const sdk = new Sdk("http://localhost:4200/", {
        fetchOptions: { cache: "no-cache" },
    });

    const [message, setMessage] = useState("");
    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        abortController.current?.abort();

        sdk.users
            .getUser("6df19034-8089-445d-8935-7941c658d0e3", { signal: abortController.current?.signal })
            .then((result) => {
                if (!result.success) return;

                setMessage(JSON.stringify(result.data, null, 4));
            })
            .catch((error: unknown) => {
                console.error(error);

                if (error instanceof DOMException) {
                    // Fetch error
                } else if (error instanceof SyntaxError) {
                    // JSON parse error
                } else if (error instanceof TypeError) {
                    // JSON serialization error
                } else {
                    // Unknown error
                }
            });
    }, []);

    useEffect(() => {
        return () => {
            abortController.current?.abort("User component unmounted.");
        };
    }, []);

    return <pre>{message}</pre>;
}
