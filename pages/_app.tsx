import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header/header";
import Head from "next/head";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {

  return <div className="">
    <Head>
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
      <title>Puck Norris - ChuckBot</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Talk with Chuck Norris mixed with a hockey player! Get chirped or hear some great stories." />
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
    </Head>
    <div className="">
      <Component {...pageProps} />
    </div>

  </div>
}

export default MyApp;
