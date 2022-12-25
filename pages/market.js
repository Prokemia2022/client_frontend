import React,{useState,useEffect}from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router';
import Header from '../components/Header.js';
import Get_Products from './api/product/get_products.js'

function ShortOnExpiry(){
	const router = useRouter();
	const [products_data,set_products_data]=useState([])
	useEffect(()=>{
		get_Products_Data()
		console.log(products_data)
	},[])
	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response.data
			const result = data.filter(item => {return item.short_on_expiry})
			set_products_data(result)
		})
	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='2' p='2' w='100%' overflowY='scroll' h='100vh'>
				<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid #009393 underline'>MarketPlace</Text>
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
				{products_data.map((item)=>{
					return(
						<div key={item.id} style={{margin:'5px'}}>
							<Product router={router} item={item}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default ShortOnExpiry;

const Product=({router,item})=>{
	return(
		<Flex boxShadow='dark-lg' bg='#fff' borderRadius='5px' direction='column' m='1' w='45%' position='relative' h='300px'>
			<Flex p='2' direction='column' w='100%' gap='2'>
				<Text color='#009393' fontWeight='bold' fontSize="32px">{item.name_of_product}</Text>
				<Flex direction='column'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{item.industry}</Text>
				</Flex>
				<Flex gap='2' direction='column'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{item.technology}</Text>
				</Flex>
				<Flex gap='2' direction='column'>
					<Text fontWeight='bold'>Expired by Date:</Text>
					<Text>{item.manufactured_date}</Text>
				</Flex>
				<Text fontWeight='bold' p='1' cursor='pointer' onClick={(()=>{router.push(`/product/${item._id}`)})} border='1px solid #009393'>View product</Text>
			</Flex>
		</Flex>
	)
}
