import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bootstrap Brand",
    description: "Bootstrap your brand's app.",
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;
export default function RootLayout(props: RootLayoutProps) {
    return (
        <html lang="en">
            <body>{props.children}</body>
        </html>
    );
}
