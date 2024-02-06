import React,{useState,useEffect}from 'react'
import {Flex,Text,Input,Button,Select, Icon, Grid} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import { IoSearchSharp } from "react-icons/io5";

import { FaStore } from "react-icons/fa";
import Product_Card from '../components/ui/Category/Product_Card.ui.js';
import { Get_Products } from './api/product/route.api.js';

export default function Market(){
	const router = useRouter();
	const [products_data,set_products_data]=useState([]);
	const [search_query,set_search_query] = useState('');
	const [sort,set_sort]=useState('desc');

	useEffect(()=>{
		get_Products_Data();
	},[sort,search_query])
	
	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response.data
			//console.log(data)
			const result = data.filter((item)=> item?.verification_status && item.short_on_expiry);
			const result_data = result?.filter((item) => 	item?.industry.includes(search_query.toLowerCase()) ||
															item?.technology.includes(search_query.toLowerCase()) ||
															item?.name_of_product.toLowerCase().includes(search_query.toLowerCase()) ||
															item?.brand.toLowerCase().includes(search_query.toLowerCase()) ||
															item?.function.toLowerCase().includes(search_query.toLowerCase()) ||
															item?.chemical_name.toLowerCase().includes(search_query.toLowerCase()) ||
															item?.features_of_product.toLowerCase().includes(search_query.toLowerCase()) ||
															item?.manufactured_by.includes(search_query.toLowerCase()) ||
															item?.description_of_product.toLowerCase().includes(search_query.toLowerCase()))		
			//console.log(result_data)
			if (sort == 'desc'){
				const sorted_result = result_data.sort((a, b) => a.name_of_product.localeCompare(b.name_of_product))	
				set_products_data(sorted_result)
			}else{
				const sorted_result = result_data.sort((a, b) => b.name_of_product.localeCompare(a.name_of_product))
				set_products_data(sorted_result)
			}
		})
	}
	return(
		<Flex direction='column' gap='2' p={{base:'4',md:'6'}} w='100%'>
			<Flex align='center' gap='2'>
				<Icon as={FaStore} boxSize={6} />
				<Text fontSize='32px' fontWeight='bold' color='#009393'>Marketplace</Text>
			</Flex>
			<Text>Find products listed by other companies, that are looking to dispatch their excess or products expiring soon.</Text>
			<Flex gap='2' align='center' justify={'space-between'} w='100%' my='2'>
				<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})} size='sm'> 
					<option value='desc'>A - Z</option>
					<option value='asc'>Z - A</option>
				</Select>
				<Flex gap='2' w={'40vw'}>
					<Input placeholder='search Products by Name, Industry, Technology...' size='sm' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
					<Button bg='#009393' color='#fff' size='sm'>
						<Icon as={IoSearchSharp} boxSize={4}/>
					</Button>
				</Flex>
			</Flex>
			{products_data.length === 0? 
				<Flex h='60vh' bg='' borderRadius='5' m='2' align='center' justify='center'>
					<Text fontSize='24px' color='grey'>There are no products listed that are expiring soon</Text>
				</Flex>
			:
				<Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)'}} gap={'2'} mt='1'>
					{products_data?.map((item)=>{
						return(
							<Product_Card item={item} key={item?._id}/>
						)
					})}
				</Grid>
			}
		</Flex>
	)
}