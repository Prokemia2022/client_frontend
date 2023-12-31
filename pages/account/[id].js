import React,{useState,useEffect}from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'
import Header from '../../components/Header.js';

export default function Account_Selection_Handler(){
	const router = useRouter();
	const id= router.query;
	const idactive = id.id;
	const [active,setActive]=useState(false);
	console.log(idactive)
	useEffect(()=>{
		if(idactive === 1 || active)
			setActive(true)
		else
			setActive(false)
	},[active,idactive])
	
	return(
		<Flex direction='column' gap='2'> 
			<Header />
			<Flex justify='center' p='5' gap='2' className={styles.accountBody}>
				<Buy router={router} active={active} setActive={setActive}/>
				<Sell router={router} active={active} setActive={setActive}/>
			</Flex>
		</Flex>
	)
}

const Buy=({active,setActive,router})=>{
	return(
		<Flex 
			boxShadow={active? 'dark-lg':'lg'} 
			h='350px'
			onClick={(()=>{setActive(true)})}
			borderRadius='10'
			direction='column'
			p='2'
			gap='2'
			cursor="pointer"
			bg='#fff'
			w='300px'
			justify='space-around'
			>
				<Text fontSize='36px' fontFamily='ClearSans-bold'>Search for Products</Text>
				<Text>Search for products, ingredients,chemicals from our vast marketplace</Text>
				<Text>We will connect you to suppliers,distributors & manufacturers</Text>
				<Button onClick={(()=>{router.push('/signup/client')})} bg='#009393' color="#fff">Create Account</Button> 
		</Flex>
	)
}

const Sell=({active,setActive,router})=>{
	return(
		<Flex boxShadow={!active? 'dark-lg':'lg'} 
					h='350px'
					onClick={(()=>{setActive(false)})} 
					border='0px solid #000'
					borderRadius='10'
					direction='column'
					p='2'
					gap='2'
					cursor='pointer'
					bg='#fff'
					w='300px'
					justify='space-around'
					>
			<Text fontSize='36px' fontFamily='ClearSans-bold'>Start Selling Products</Text>
			<Text>Sell products to thousand of users,find clients for your expiring goods or Connect with other salespeople.</Text>
			
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/distributor')})}>Create a distributor account</Button>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/signup/manufacturer')})}>Create a manufacturer account</Button>
		</Flex>
	)
}
