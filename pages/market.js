import React,{useState,useEffect}from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import SearchIcon from '@mui/icons-material/Search';
import {useRouter} from 'next/router';
import Header from '../components/Header.js';
import Get_Products from './api/product/get_products.js'

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
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='2' p='2' w='100%' overflowY='scroll' h='100vh'>
				<Text fontSize='32px' fontWeight='bold' color='#009393'>Marketplace</Text>
				<Text>Find products listed by other companies, that are looking to dispatch their excess or products expiring soon.</Text>
				
				<Flex gap='2' p='2' align='center'>
					<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
						<option value='desc'>A - Z</option>
						<option value='asc'>Z - A</option>
					</Select>
					<Flex gap='2' p='2' flex='1'>
						<Input placeholder='search Products by Name, Industry, Technology...' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
						<Button bg='#009393' color='#fff'><SearchIcon /></Button>
					</Flex>
				</Flex>
				{products_data.length === 0? 
					<Flex h='60vh' bg='' borderRadius='5' m='2' align='center' justify='center'>
						<Text fontSize='24px' color='grey'>There are no products listed that are expiring soon</Text>
					</Flex>
				:
					<Flex direction='column'>
						{products_data.map((item)=>{
							return(
								<div key={item._id} style={{margin:'5px'}}>
									<Product_Cart_Item router={router} item={item}/>
								</div>
							)
						})}
					</Flex>
				}
			</Flex>
		</Flex>
	)
}

const Product_Cart_Item=({item})=>{
	const router = useRouter();
	return(
		<Flex cursor='pointer' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='lg' onClick={(()=>{router.push(`/product/${item._id}`)})} >
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../../Pro.png' alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.name_of_product}</Text>
				<Text fontSize='14px'>{item.distributed_by}</Text>
				<Flex gap='2' fontSize='10px' color='grey'>
					<Text>{item.industry? item.industry : "-"}</Text>
					<Text borderLeft='1px solid grey' paddingLeft='2'>{item.technology? item.technology : "-"}</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}
