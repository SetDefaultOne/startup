"use client";

import { useEffect, useRef, useState } from "react";
import { Sdk } from "@bootstrap-brand/sdk";

export default function User() {
    const [message, setMessage] = useState("");
    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        const sdk = new Sdk("http://localhost:4200/", {
            fetchOptions: { cache: "no-cache" },
        });

        abortController.current?.abort();

        abortController.current = new AbortController();

        sdk.users
            .getUser("f7f02393-b48e-49ac-a465-5a8786fe7e89", { signal: abortController.current?.signal })
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
