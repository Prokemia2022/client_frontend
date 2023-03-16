import React,{useState,useEffect} from 'react'
import { Flex,Text,Image,Center,Select,Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useRouter} from 'next/router';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Header from '../components/Header.js';
import Get_Products from './api/product/get_products.js'
import Get_Industries from './api/control/get_industries.js'
import Get_Technologies from './api/control/get_technologies.js'
import Get_Distributors from './api/auth/distributor/get_distributors.js'
import Get_Manufacturers from './api/auth/manufacturer/get_manufacturers.js'

function _Home(){
	const router = useRouter();
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
	},[])

	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status)
			set_products_data(result_data)
			//console.log(result_data)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status)
			set_industries_data(result_data)
			//console.log(result_data)
		})
	}
	const get_Technologies_Data=async()=>{
		await Get_Technologies().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status)
			set_technologies_data(result_data)
			//console.log(result_data)
		})
	}
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_distributors_data(result_data)
			//console.log(result_data)
		})
	}
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_manufacturers_data(result_data)
			//console.log(result_data)
		})
	}
	return(
		<Flex direction='column' position='relative' gap='2'>
			<Header products_data={products_data} distributors_data={distributors_data} manufacturers_data={manufacturers_data} industries_data={industries_data} technologies_data={technologies_data}/>
			
			<Flex p='2' direction='column'>
				<Flex mt='10vh' mb='50px' direction='column' gap='3' w='100%' p='2' mb='4'>
					<Text mb='3' fontFamily='ClearSans-Bold' fontSize='36px' >The Marketplace for ingredients,Polymers and Chemistry.</Text>
					<Text mb='0' cursor='pointer' w='80%'>Search, Learn, Engage ,sample , quote and purchase from thousands of distributors - all in one platform.Access all easily.</Text>
				</Flex>			
				
				<Flex direction='column' gap='2' w='100%'>
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='24px'>Industries</Text>
					<Flex wrap='Wrap' w='100%' justify='space-between'>
						{industries_data?.slice(0,8).map((item)=>{
							return(
								<Flex cursor='pointer' key={item._id} w='45%' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
									<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
									<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' fontSize='20px' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
								</Flex>
							)
						})}
					</Flex>
					<Button bg='#009393' color='#fff' onClick={(()=>{router.push(`/Industries/all`)})}>Explore All industries</Button>
				</Flex>
				<Flex direction='column' gap='2' w='100%'>
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='24px'>Technologies</Text>
					<Flex wrap='Wrap' w='100%' justify='space-between'>
						{technologies_data?.slice(0,8).map((item)=>{
							return(
								<Flex cursor='pointer' key={item._id} w='45%' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
									<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
									<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' fontSize='20px' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
								</Flex>
							)
						})}
					</Flex>
					<Button bg='#009393' color='#fff' onClick={(()=>{router.push(`/Technologies/all`)})}>Explore All Technologies</Button>
				</Flex>
				<Text mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Featured Products</Text>
				{products_data?.slice(0,4).map((content)=>{
					return(
						<div key={content._id} style={{margin:'5px'}} >
							<ProductItem content={content}/>
						</div>
					)
				})}
				<Text  mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Top Distributors </Text>
				{distributors_data?.slice(0,4).map((distributor)=>{
					return(
						<Flex direction='column' bg='#eee' p='1' mb='1' key={distributor._id}>
							<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.company_name}</Text>
							<Text mb='0' >{distributor.description}</Text>
							<Text mb='0' fontSize='14px' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/account/distributor/${distributor._id}`)})}> view &gt;&gt; </Text>
						</Flex>
					)
				})}
				<Text  mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Top Manufacturers </Text>
				{manufacturers_data?.slice(0,4).map((manufacturer)=>{
					return(
						<Flex direction='column' bg='#eee' mb='1' p='1' key={manufacturer._id} gap='2'>
							<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.company_name}</Text>
							<Text mb='0' overflow='hidden' h='20px'>{manufacturer.description}</Text>
							<Text mb='0' fontSize='14px' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/account/manufacturer/${manufacturer._id}`)})}> view &gt;&gt; </Text>
						</Flex>
					)
				})}
				<Center>
					<Flex justify='space-around'>
						{numbers.map((item)=>{
							return(
								<Flex key={item.id} textAlign='center' align='center' direction='column' m='5'>
									<Text mb='0' color='#009393' fontSize='32px' fontFamily='ClearSans-Bold'>{item.numbers}</Text>
									{item.icon}
									<Text mb='0' fontSize='20px'>{item.title}</Text>
									<Text mb='0'>made</Text>
								</Flex>
							)
						})}
					</Flex>
				</Center>
				<Promo router={router}/>
			</Flex>
			
		</Flex>
	)
}

export default _Home;

const numbers=[
	{
		id:'1',
		title:'Quotation requests',
		numbers:'1k',
		icon:<CloudDownloadIcon/>,
	},
	{
		id:'2',
		title:'Search results',
		numbers:'200k',
		icon:<QueryStatsIcon/>,
	},
	{
		id:'3',
		title:'Sample requests',
		numbers:'2k',
		icon:<CloudDownloadIcon/>,
	},
]

const Promo=({router})=>{
	return(
		<Flex bg='#000' p='2' borderRadius='5'>
			<Flex className={styles.promotext} p='2' direction='column' color='#fff' gap='3'>
				<Text mb='0'  fontSize='48px'>Want to Sell Products?</Text>
				<Text mb='0'  >Register as a Manufacturer or Distributor to start marketing your products in Africa.</Text>
				<Text  mb='0' >Boost your sales and access a wide market for your company or business.</Text>
				<Button bg='#000' border='1px solid #fff'>Request a demo <PlayArrowIcon /></Button>
				<Button bg='#009393' color='#fff' borderRadius='0' onClick={(()=>{router.push('/account/1')})}>Create an Account</Button>
			</Flex>
		</Flex>
	)
}

const ProductItem=({content,categ})=>{
	const router = useRouter();
	return(
		<Flex position='relative' gap='2' align='center' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${content._id}`)})}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../Pro.png' alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold'>{content.name_of_product}</Text>
				<Text fontSize='14px'>distributed by: {content.distributed_by}</Text>
			</Flex>
		</Flex>
	)
}