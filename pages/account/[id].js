import React,{useState,useEffect}from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'

function Account(){
	const router = useRouter();
	const id= router.query;
	const idactive = id.id;
	const [active,setActive]=useState();
	console.log(idactive)
	useEffect(()=>{
		if(idactive === 1 || active)
			setActive(true)
		else
			setActive(false)
	},[active])
	
	return(
		<Flex direction='column' gap='' className={styles.accountBody}>
			<Flex h='100vh' justify='center' align='center'>
				<Buy router={router} active={active} setActive={setActive}/>
				<Sell router={router} active={active} setActive={setActive}/>
			</Flex>
		</Flex>
	)
}

export default Account;

const Buy=({active,setActive,router})=>{
	return(
		<Flex 
			boxShadow={active? 'dark-lg':'lg'} 
			zIndex={active? '500' : '300'} 
			opacity={active? '1' : '0.7'} 
			transform={active? 'scale(1.2)' : 'scale(1.1)'}
			onClick={(()=>{setActive(true)})}
			borderRadius='10'
			direction='column'
			p='2'
			gap='2'
			cursor="pointer"
			bg='#fff'
			mr={active? '-200px':'20px'}
			w='250px'
			>
				<Text fontSize='36px' fontFamily='ClearSans-bold'>Look for Products</Text>
				<Text>Search for products, ingredients,chemicals from our vast marketplace</Text>
				<Text>This type of account will connect you to sellers,salespeople,distributors & manufacturers</Text>
				<Button onClick={(()=>{router.push('/signup/client')})} bg='#009393' color="#fff">Create Account</Button> 
		</Flex>
	)
}

const Sell=({active,setActive,router})=>{
	return(
		<Flex boxShadow={!active? 'dark-lg':'lg'} 
					zIndex={!active? '500' : '300'} 
					opacity={!active? '1' : '0.7'}
					transform={!active? 'scale(1.2)' : 'scale(1.1)'} 
					ml={!active? '-180px':'50px'}
					onClick={(()=>{setActive(false)})} 
					border='0px solid #000'
					borderRadius='10'
					direction='column'
					p='2'
					gap='2'
					cursor='pointer'
					bg='#fff'
					w='250px'
					>
			<Text fontSize='36px' fontFamily='ClearSans-bold'>Start Selling Products</Text>
			<Text>Sell products to thousand of users,find clients for your expiring goods or Connect with other salespeople.</Text>
			<Text>Start Selling Now!!</Text>
			<Button bg='#000' color='#fff' onClick={(()=>{router.push('/signup/distributor')})}>Create a Distribuor Account</Button>
			<Button bg='#000' color='#fff' onClick={(()=>{router.push('/signup/manufacturer')})}>Create a Manufacturer Account</Button>
		</Flex>
	)
}
