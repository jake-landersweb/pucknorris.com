import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html style={{ "scrollPaddingTop": "65px" }} className="scroll-smooth text-txt bg-bg">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
