import React from 'react'
import {Flex,Text,Button, Box, Divider, AbsoluteCenter} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router';

export default function Account_Selection_Handler(){
	const router = useRouter();
	return(
		<Flex direction='column' gap='2'>
			<Flex justify='center' p='5' gap='2' className={styles.accountBody}>
				<Buy router={router}/>
				<Sell router={router}/>
			</Flex>
		</Flex>
	)
}

const Buy=({router})=>{
	return(
		<Flex  boxShadow={'lg'}  h='350px' borderRadius='10' direction='column' p='4' gap='2' cursor="pointer" bg='#fff' w='300px' justify='space-around' >
			<Text textAlign='center' fontSize='36px' fontFamily='ClearSans-bold'>Search for Products</Text>
			<Text>Browse products, ingredients,chemicals from our vast marketplace</Text>
			<Button onClick={(()=>{router.push('/signup/client')})} bg='#009393' color="#fff">Create Account</Button> 
		</Flex>
	)
}

const Sell=({router})=>{
	return(
		<Flex  boxShadow={'lg'}  h='350px' borderRadius='10' direction='column' p='4' gap='2' cursor="pointer" bg='#fff' w='300px' justify='space-around' >
			<Text fontSize='36px' fontFamily='ClearSans-bold' textAlign='center'>Start Selling Products</Text>
			<Text>Market your products to thousand of users,find clients for your expiring goods.</Text>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/supplier?acc_type=distributor')})}>Create a distributor account</Button>
			<Box position='relative' padding='2'>
				<Divider />
				<AbsoluteCenter bg='white' px='4'>
					or
				</AbsoluteCenter>
			</Box>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/supplier?acc_type=manufacturer')})}>Create a manufacturer account</Button>
		</Flex>
	)
}
