import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Footer from '../components/Footer.js'

function MyApp({ Component, pageProps }) {
  return (
	  <ChakraProvider>
	  	<Head>
		  	<meta name="google-site-verification" content="IsAmllyZfArUnB7GkKSA77RLnhZi9ttveC54FBgHoM0" />
			<title>Prokemia | Online MarketPlace</title>
			<meta name="description" content="Buy and sell ingredients at a marketplace." />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
			<link rel="manifest" href="/site.webmanifest"/>
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
			<meta name="msapplication-TileColor" content="#da532c"/>
			<meta name="theme-color" content="#ffffff"/>
		</Head>
		<Component {...pageProps} />
		<Footer/>
	  </ChakraProvider>
  )
}

export default MyApp
