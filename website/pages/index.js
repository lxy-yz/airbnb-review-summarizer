import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import pkg from '../package.json'

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        title={pkg.displayName}
        description={pkg.description}
        canonical="https://nine4-2.vercel.app/"
        openGraph={{
          url: 'https://nine4-2.vercel.app/',
        }}
      />
      <Head>
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
