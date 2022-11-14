import React from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router';
import Header from '../components/Header.js';

function ShortOnExpiry(){
	const router = useRouter();
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='2' p='2' w='100%' overflowY='scroll' h='100vh'>
				<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid #009393 underline'>Short On Expiry</Text>
				<Text>Find products listed by other companies, that are looking to dispatch their excess or products expiring soon.</Text>
				<Text color='#009393'>Want to list your products?<span style={{fontWeight:'bold',cursor:'pointer'}} onClick={(()=>{router.push('/profile/1')})}>Click here</span>.</Text>
				<Flex gap='2'>
					<Select w='150px' placeholder='sort'>
						<option>A-Z</option>
						<option>z-A</option>
						<option>by date</option>
					</Select>
					<Input placeholder='search products by name, industry'/>
				</Flex>
				<Item router={router}/>
				<Item router={router}/>
				<Item router={router}/>
			</Flex>
		</Flex>
	)
}

export default ShortOnExpiry;

const Item=({router})=>{
	return(
		<Flex p='2' bg='#eee' borderRadius='5px' direction='column'>
			<Image bg='#fff' w='100%' h='50px' borderRadius='5px'/>
			<Text color='#009393' fontWeight='bold' fontSize="24px">Cereal</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Industry:</Text>
				<Text>Agriculture</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Technology:</Text>
				<Text>crops</Text>
			</Flex>
			<Text fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/product/cereals`)})}>View product -&gt;  </Text>
			</Flex>
	)
}
