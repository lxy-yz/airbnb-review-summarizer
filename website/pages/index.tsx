/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Header from '../components/header'
import Main from '../components/main'
import Footer from '../components/footer'
import pkg from '../package.json'

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        // @ts-expect-error
        title={pkg.displayName}
        // @ts-expect-error
        description={pkg.description}
        canonical="https://nine4-2.vercel.app/"
        openGraph={{
          url: 'https://nine4-2.vercel.app/',
        }}
      />
      <Head>
        {/* @ts-expect-error */}
        <title>{pkg.displayName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen grid">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  )
}
