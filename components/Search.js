import React,{useState} from 'react';
import {Flex,Text,Select,Input,Button,Image} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {useRouter} from 'next/router'

export default function Search({products_data,distributors_data,manufacturers_data,industries_data,technologies_data}){
	const [active,setActive]=useState(false)
	const [search_value,set_search_value]=useState('')

	const [product_result,set_product_result]=useState([])
	const [distributor_result,set_distributor_result]=useState([])
	const [manufacturer_result,set_manufacturer_result]=useState([])
	const [industries_result,set_industries_result]=useState([])
	const [technologies_result,set_technologies_result]=useState([])

	const get_Result=async()=>{
		set_product_result(await products_data.filter(item => item.name_of_product?.includes(search_value) || item.industry?.includes(search_value) || item.technology?.includes(search_value)))

		set_distributor_result(await distributors_data.filter(item => item.company_name?.includes(search_value)))
		set_manufacturer_result(await manufacturers_data.filter(item => item.company_name?.includes(search_value)))
		set_industries_result(await industries_data.filter(item => item.title?.includes(search_value)))
		set_technologies_result(await technologies_data.filter(item => item.title?.includes(search_value)))
		console.log(distributor_result,product_result,manufacturer_result,technologies_result,industries_result)
		setActive(!active)
	}
	//onClick={(()=>{setActive(!active)})}>{active? <CloseFullscreenIcon/> : <SearchIcon/>}product_result_data={product_result_data} distributor_result_data={distributor_result_data} manufacturer_result_data={manufacturer_result_data} industries_result_data={industries_result_data} technologies_result_data={technologies_result}
	return(
		<Flex p='3' borderRadius='5'>
			<Input borderRadius='5px 0 0 5px' placeholder='Search Product by Name, Industry, Technology' variant='filled' onChange={((e)=>{set_search_value(e.target.value)})}/>
			<Button color='#fff' bg='#009393'borderRadius='0 5px 5px 0' onClick={get_Result}><SearchIcon/></Button>
			{active? 
				<Result product_result={product_result} distributor_result={distributor_result} manufacturer_result={manufacturer_result} industries_result={industries_result} technologies_result={technologies_result}/> 
			:
				null
			}
		</Flex>	
	)
}

const Result=({product_result,distributor_result,manufacturer_result,industries_result,technologies_result})=>{
	console.log(distributor_result,product_result,manufacturer_result,technologies_result,industries_result)
	const router = useRouter()
	return(
		<Flex className={styles.ResultsBar} direction='column' bg='#eee' p='2' borderRadius='10' boxShadow='dark-lg' overflowY='scroll' h='50vh'>
			<Text fontSize='20px' bg='#009393' p='1' color='#fff' borderRadius='5'>Products</Text>
			{product_result?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find products that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{product_result?.map((item)=>{
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
			<Text mt='2' fontSize='20px' bg='#009393' p='1' color='#fff' borderRadius='5'>Distributors</Text>
			{distributor_result?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find distributors that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{distributor_result?.map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{alert('success')})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{item.company_name}</Text>
									<Text fontSize='14px'>distributed by: {item.description}</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
			<Text mt='2' fontSize='20px' bg='#009393' p='1' color='#fff' borderRadius='5'>Manufacturers</Text>
			{manufacturer_result?.length === 0?
				<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
					<Text w='50%' textAlign='center'>We could not find manufacturers that match your search</Text>
				</Flex>
				:
				<Flex direction='column' p='1'>
					{manufacturer_result?.map((item)=>{
						return(
							<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{alert('success')})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
								<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../images.jpeg' alt='next'/>
								<Flex direction='column'>
									<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{item.company_name}</Text>
									<Text fontSize='14px'>distributed by: {item.description}</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}