import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Header from '../components/header'
import Main from '../components/main'
import Footer from '../components/footer'
import type PkgType from '../package.json'
import pkg from '../package.json'

const { displayName, description, website } = pkg as typeof PkgType & { displayName: string; description: string; website: string }

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        title={displayName}
        description={description}
        canonical={website}
        openGraph={{
          url: website,
        }}
      />
      <Head>
        <title>{displayName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  )
}
