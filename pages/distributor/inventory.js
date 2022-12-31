import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Get_Products from '../api/product/get_products.js'
import AddIcon from '@mui/icons-material/Add';

function Inventory({distributor_data}){
	const router = useRouter();
	const [products_data,set_products_data]=useState([])
	const [edit,set_edit]=useState(false)
	const [searchquery,set_searchquery]=useState('')

	useEffect(()=>{
		get_Data()
	},[searchquery])

	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			console.log(response.data)
			let data = response.data
			const email = distributor_data?.email_of_company
			const result_data = data.filter((item)=> item.verification_status && item.email_of_lister?.includes(email))
			const result = result_data.filter((item)=> item.name_of_product?.toLowerCase().includes(searchquery) || item.industry?.toLowerCase().includes(searchquery) || item.technology?.toLowerCase().includes(searchquery))
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
				<Input placeholder='search products by name, industry' onChange={((e)=>{set_searchquery(e.target.value)})}/>
			</Flex>
			{products_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center'>
					<Text fontSize='32px' color='grey' fontWeight='bold'>You have not listed any products<br/>or<br/>Your product is awaiting approval</Text>
				</Flex>
				:
				<>
					{products_data?.map((product)=>{
						return(
							<div key={product._id} style={{margin:'5px'}}>
								<Item product={product} router={router}/>
							</div>
						)
					})}
				</>
			}
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

export default Inventory;

const Item=({router,product})=>{
	return(
		<Flex p='' bg='#eee' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
			<Flex direction='column' position='relative' p='2'>
				{product?.sponsored ? 
					<Flex position='absolute' top='2' right='2' bg='#009393' p='2' borderRadius='5' color='#fff'>
						<DoneAllIcon/>
					</Flex>
					:null}
				<Text color='#009393' fontWeight='bold' fontSize="24px">{product?.name_of_product}</Text>
				<Flex gap='2'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{product?.industry}</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{product?.technology}</Text>
				</Flex>
			</Flex>
			<Text w='60px' fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/distributor/product/${product?._id}`)})}>View product</Text>
		</Flex>
	)
}
