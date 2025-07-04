import React from "react"
import Footer from "../components/footer";
import Header from "../components/header/header";
import "../styles/globals.css";
import { Providers } from "./providers";

export const dynamic = 'force-dynamic'

const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <html style={{ "scrollPaddingTop": "60px" }} lang="en" className="scroll-smooth text-txt bg-bg">
            <head>

                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-33RW6C2KHE`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-33RW6C2KHE', {
                            page_path: window.location.pathname,
                            });
                        `,
                    }}
                />

                <title>Puck Norris Hockey Club - Blood Sweat and Beers</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="Beer league hockey team in the pacific northwest"
                />
                <meta name="author" content="SapphireNW" />
                <meta
                    name="keywords"
                    content="hockey,pnw,pacific,northwest,portland,oregon,ice hockey,mens league, hockey merchandise"
                    id="keywords"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="theme-color" content="#f9bf3c" />
            </head>
            <body>
                <Providers>
                    <main>
                        <div className="">
                            <div className="fixed top-0 z-50 left-0">
                                <Header />
                            </div>
                            <div className="my-[80px]">
                                {children}
                            </div>
                            <div className="">
                                <Footer />
                            </div>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}

export default Root