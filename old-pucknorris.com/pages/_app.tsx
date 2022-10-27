import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import BoundsWrapper from '../components/boundsWrapper'
import Footer from '../components/footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta
        name="description"
        content="Beer league hockey team in the pacific northwest"
      />
      <meta name="author" content="Landersweb LLC" />
      <meta
        name="keywords"
        content="hockey,pnw,pacific,northwest,portland,oregon,ice hockey,mens league"
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
      {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" /> */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <div className="scroll-smooth text-txt bg-bg">
      <div className="grid place-items-center">
        <div className="fixed top-0 z-50">
          <Header />
        </div>
        <div className="relative w-full min-h-screen pt-[70px] md:pt-[100px] pb-24 md:pb-36">
          <Component {...pageProps} />
        </div>
        <div className="pt-4 w-full">
          <Footer />
        </div>
      </div>
    </div>
  </>
}

export default MyApp
