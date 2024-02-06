import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Index from './HomePage.js'

export default function home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prokemia | Online MarketPlace</title>
        <meta name="google-site-verification" content="IsAmllyZfArUnB7GkKSA77RLnhZi9ttveC54FBgHoM0" />
        <meta name="description" content="Buy and sell ingredients at a marketplace." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
	    <Index />
	</div>
  )
}
