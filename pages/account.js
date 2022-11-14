import React,{useState,useEffect}from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import Header from '../components/Header.js';

function Account(){
	const router = useRouter();
	return(
		<Flex direction='column' gap='2'> 
			<Header />
			<Flex justify='center' p='5' gap='2' className={styles.accountBody}>
				<Buy router={router}/>
				<Sell router={router}/>
			</Flex>
		</Flex>
	)
}

export default Account;

const Buy=({active,setActive,router})=>{
	return(
		<Flex 
			boxShadow='dark-lg'
			h='350px'
			borderRadius='10'
			direction='column'
			p='2'
			gap='2'
			cursor="pointer"
			bg='#fff'
			w='300px'
			>
				<Text fontSize='36px' fontFamily='ClearSans-bold'>Search for Products</Text>
				<Text>Search for products, ingredients,chemicals from our vast marketplace</Text>
				<Text>This type of account will connect you to sellers,salespeople,distributors & manufacturers</Text>
				<Button onClick={(()=>{router.push('/signup/client')})} bg='#009393' color="#fff">Create Account</Button> 
		</Flex>
	)
}

const Sell=({active,setActive,router})=>{
	return(
		<Flex boxShadow='dark-lg'
					border='0px solid #000'
					borderRadius='10'
					direction='column'
					p='2'
					gap='2'
					cursor='pointer'
					bg='#fff'
					w='300px'
					>
			<Text fontSize='36px' fontFamily='ClearSans-bold'>Start Selling Products</Text>
			<Text>Sell products to thousand of users,find clients for your expiring goods or Connect with other salespeople.</Text>
			<Text>Start Selling Now!!</Text>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/distributor')})}>Create a Distribuor Account</Button>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/manufacturer')})}>Create a Manufacturer Account</Button>
			<Text textAlign='center'>or</Text>
			<Button bg='#000' color='#fff' onClick={(()=>{router.push('')})}>Request a Demo</Button>
		</Flex>
	)
}
