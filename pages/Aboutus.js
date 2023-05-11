import {Flex,Text,Image,Heading} from '@chakra-ui/react'
import Header from '../components/Header.js';
import styles from '../styles/Home.module.css';
function About(){
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='1' className={styles.aboutusbody}>
				<Flex className={styles.aboutus} bg='#009393' color='#fff'>
					<Text fontWeight='bold' fontSize='42px'>About Us</Text>
					<Text textAlign={'left'} fontWeight='thin' fontSize='20px'>
						We are an online marketplace that provide a platform for<br/> sellers to list and market their products and enable <br/>Consumers find and get connected to suppliers in <br/>East, Central and Southern Africa.
					</Text>
				</Flex>
				<Flex direction={'column'} gap='4'>
					<Flex direction='column' p='4'>
						<Text fontWeight='bold' fontSize='28px' color={'#009393'}>Our Story</Text>
						<Text fontSize='20px' fontFamily='clearSans-Bold'>The Industry is the building blocks of the entire world.</Text>
						<Text fontSize='16px'>Suppliers provide every single ingredient,polymer and chemistry that make up every physical product in existence.<br/>Yet the expensive world of chemistry had gone largely unorganized and remained inaccessible to many.</Text>
					</Flex>
					<Flex direction='column' p='4'>
						<Text fontWeight='bold' fontSize='28px' color={'#009393'}>Our mission</Text>
						<Text fontSize='20px' fontFamily='clearSans-Bold'>We are on a mission to bring the industry that enables every physical product into the digital Era.</Text>
						<Text fontSize='16px'>The Chemical Industry touches every aspect of your daily life.Yet, it is one of the few remaining Industries that is offline.</Text>
					</Flex>
					<Flex direction='column' p='4'>
						<Text fontWeight='bold' fontSize='28px' color={'#009393'}>Our Vision</Text>
						<Text fontSize='20px' fontFamily='clearSans-Bold'>To bring quality and diverse services .</Text>
						<Text fontSize='16px'>At Prokemia, we envision a connected marketplace that empowers and simplifies commerce in <br/>East, Central and Southern Africa, by providing a seamless platform<br/> for sellers and buyers to discover and transact with ease.</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default About;