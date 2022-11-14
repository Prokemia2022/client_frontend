import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Index from './_Home.js'

export default function home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prokemia | Online MarketPlace</title>
        <meta name="description" content="Buy and sell ingredients at a marketplace." />
        <link rel="icon" href="/Pro.png" />
      </Head>
	  <Index />
	</div>
  )
}
