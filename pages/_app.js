import { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import Head from 'next/head';
// components
import Footer from '../components/Footer.js'
import Header from '../components/ui/header_navigation/index.js'
// hooks 
import useFetchUserData from '../hooks/useFetchUserData.hook.js'
// providers
import { userContext } from '../components/Providers/userContext.js';

function MyApp ({ Component, pageProps }) {
	const [user,set_user]=useState(null);
	const [user_handler,set_user_handler]=useState(null);
	useEffect(()=>{
		fetch()
	},[user_handler]);
	async function fetch(){
		const result = await useFetchUserData();
		set_user(result);
	}
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
			<userContext.Provider value={{user,set_user_handler}}>
				<Header/>
				<Component {...pageProps} />
				<Footer/>
			</userContext.Provider>
		</ChakraProvider>
	)
}

export default MyApp