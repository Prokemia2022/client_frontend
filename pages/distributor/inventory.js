import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Get_Products from '../api/product/get_products.js'

function Inventory({distributor_data}){
	const router = useRouter();
	const [products_data,set_products_data]=useState([])
	const [edit,set_edit]=useState(false)

	useEffect(()=>{
		get_Data()
		console.log(products_data)
	},[])

	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			console.log(response.data)
			let data = response.data
			const email = distributor_data?.email_of_company
			const result = data.filter((item)=> item.email_of_lister?.includes(email))
			console.log(result)
			set_products_data(result)
		})
	}
	return(
		<Flex direction='column' gap='3' p='2' w='100%' overflowY='scroll' h='100vh'>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Inventory</Text>
			<Flex gap='2'>
				<Select w='150px' placeholder='sort'>
					<option>A-Z</option>
					<option>z-A</option>
					<option>by date</option>
				</Select>
				<Input placeholder='search products by name, industry'/>
			</Flex>
			{products_data.map((product)=>{
				return(
					<div key={product._id} style={{margin:'5px'}}>
						<Item product={product} router={router}/>
					</div>
				)
			})}
		</Flex>
	)
}

export default Inventory;

const Item=({router,product})=>{
	return(
		<Flex p='2' bg='#eee' borderRadius='5px' direction='column' position='relative'>
			<Flex position='absolute' top='2' right='2' bg='#009393' p='2' borderRadius='5' color='#fff'>
				<DoneAllIcon/>
			</Flex>
			<Text color='#009393' fontWeight='bold' fontSize="24px">{product.name_of_product}</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Industry:</Text>
				<Text>{product.industry}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Technology:</Text>
				<Text>{product.technology}</Text>
			</Flex>
			<Text fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/distributor/product/${product._id}`)})}>View product -&gt;  </Text>
			</Flex>
	)
}
