import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

function MyApp({ Component, pageProps }) {
  return (
	  <ChakraProvider>
		<Component {...pageProps} />
		<Footer/>
	  </ChakraProvider>
  )
}

export default MyApp
