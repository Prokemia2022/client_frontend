import React,{useState,useEffect} from 'react';
import {Flex,Text,Select,Input,Button,Image} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
//import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {useRouter} from 'next/router'
import Get_Products from '../pages/api/product/get_products.js'
import Get_Industries from '../pages/api/control/get_industries.js'
import Get_Technologies from '../pages/api/control/get_technologies.js'
import Get_Distributors from '../pages/api/auth/distributor/get_distributors.js'
import Get_Manufacturers from '../pages/api/auth/manufacturer/get_manufacturers.js'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function Search({setsearchbaractive}){
	const [active,setActive]=useState(false)
	const [search_value,set_search_value]=useState('')

	const [products_data,set_products_data]=useState([])
	const [industries_data,set_industries_data]=useState([])
	const [technologies_data,set_technologies_data]=useState([])
	const [distributors_data,set_distributors_data]=useState([])
	const [manufacturers_data,set_manufacturers_data]=useState([])

	useEffect(()=>{
		get_Products_Data()
		get_Industries_Data()
		get_Technologies_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()

	},[search_value])

	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter((item) => item.name_of_product?.toLowerCase().includes(search_value) || item.industry?.toLowerCase().includes(search_value) || item.technology?.toLowerCase().includes(search_value))
			set_products_data(result)
			console.log(result)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.title?.toLowerCase().includes(search_value))
			set_industries_data(result)
			console.log(result)
		})
	}
	const get_Technologies_Data=async()=>{
		await Get_Technologies().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.title?.toLowerCase().includes(search_value))
			set_technologies_data(result)
			console.log(result)
		})
	}
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.company_name?.toLowerCase().includes(search_value))
			set_distributors_data(result)
			console.log(result)
		})
	}
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.company_name?.toLowerCase().includes(search_value))
			set_manufacturers_data(result)
			console.log(result)
		})
	}
	return(
		<Flex p='3' borderRadius='5'>
			<Input borderRadius='5px 0 0 5px' placeholder='Search Product by Name, Industry, Technology' variant='filled' onChange={((e)=>{set_search_value(e.target.value);setActive(true)})}/>
			<Button color='#fff' bg='#009393'borderRadius='0 5px 5px 0' onClick={(()=>{setsearchbaractive(false)})}><CloseFullscreenIcon/></Button>
			{active? 
				<Result products_data={products_data} distributors_data={distributors_data} manufacturers_data={manufacturers_data} industries_data={industries_data} technologies_data={technologies_data}/> 
			:
				null
			}
		</Flex>	
	)
}

const Result=({products_data,distributors_data,manufacturers_data,industries_data,technologies_data})=>{
	console.log(distributors_data,products_data,manufacturers_data,technologies_data,industries_data)
	const router = useRouter()
	return(
		<Flex className={styles.ResultsBar} direction='column' bg='#eee' p='2' borderRadius='10' boxShadow='dark-lg' overflowY='scroll' h='50vh'>
			<Text fontSize='20px' color='#009393' p='1' borderRadius='5'>Products</Text>
			{products_data?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find products that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{products_data?.slice(0,2).map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/product/${item._id}`)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text fontSize='16px' fontFamily='ClearSans-Bold'>{item.name_of_product}</Text>
									<Text fontSize='14px'>distributed by: {item.distributed_by}</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Distributors</Text>
			{distributors_data?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find distributors that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{distributors_data?.slice(0,2).map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{alert('success')})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.company_name}</Text>
									<Text fontSize='14px'>distributed by: {item.description}</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Manufacturers</Text>
			{manufacturers_data?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find manufacturers that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{manufacturers_data?.slice(0,2).map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{alert('success')})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.company_name}</Text>
									<Text fontSize='14px'>distributed by: {item.description}</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Industries</Text>
			{industries_data?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find Industries that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1' gap='2'>
					{industries_data?.slice(0,2).map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/products/${item.title}`)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
									
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Technologies</Text>
			{technologies_data?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find Technologies that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1' gap='2'>
					{technologies_data?.slice(0,2).map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/products/${item.title}`)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
									
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}