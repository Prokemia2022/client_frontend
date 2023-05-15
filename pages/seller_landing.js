import React,{} from 'react'
import {Flex,Text,Button,} from '@chakra-ui/react'
import styles from '../styles/Home.module.css';
import {useRouter} from 'next/router';

export default function ClientSignUp(){
    const router = useRouter()
	return(
 		<Flex h='100vh' w='100vw' position={'fixed'} top='0' left='0' bg='#000000'>
			<Header />
			<Flex direction='column' className={styles.landingslider} gap='2'> 
                <Text color='#009393' fontSize='36px' fontFamily='ClearSans-bold'>Interested in Selling Products?</Text>
                <Text fontSize='20px' mb='0' w='80%' color={'#fff'}>Register as a Manufacturer or Distributor to start marketing your products in East, Central and Southern Africa.</Text>
                <Text fontSize='20px' mb='0' w='80%' color={'#fff'}>Boost your sales and access a wide market for your company or business.</Text>
                <Button bg='#fff' border='1px solid #fff' onClick={(()=>{router.push('/request_demo')})}>Request a demo</Button>
				<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/account/1')})}>Start selling</Button>
            </Flex>
		</Flex>
	)
}

const Header=()=>{
	return(
		<Flex className={styles.landingheader}>
			<Text fontFamily='ClearSans-bold' color='#fff'><span style={{color:'#009393'}}>Pro</span>kemia</Text>
		</Flex>
		
	)
}
