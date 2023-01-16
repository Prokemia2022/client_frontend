//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Image} from '@chakra-ui/react';
//api calls
import Get_Products from '../api/product/get_products.js'
import Get_Distributors from '../api/auth/distributor/get_distributors.js'
import Get_Manufacturers from '../api/auth/manufacturer/get_manufacturers.js'
//icons
//components
import Header from '../../components/Header.js';
//utils
import {useRouter} from 'next/router';

function Explore(){
	//utils
	const router = useRouter();
	const categ = router.query; //gets the category object in the query i.e industry/technology
	console.log(categ?.id)
	//states
	const [products_data,set_products_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	//functions
	
	//api calls
	/**fetch products data*/
	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			const result = data.filter((item)=> item?.industry.includes(categ?.id) || item?.technology.includes(categ?.id))
			//console.log(response.data)
			set_products_data(result)
		})
	}
	/*fetch manufacturers */
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			set_manufacturers_data(response?.data)
			//console.log(response.data)
		})
	}
	/**fetch distributors */
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			set_distributors_data(response.data)
			//console.log(response.data)
		})
	}
	//useEffects
	useEffect(()=>{
		get_Products_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
	},[categ])
	return(
		<Flex direction='column'>
			<Header/>
			<Flex p='2' direction='column' gap='2'>
				<Text fontSize='28px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000' >{categ.id}</Text>
				{products_data?.length === 0?
					<Flex bg='#eee' p='2' justify='center' align='center' h='40vh' boxShadow='lg'>
						<Text>No products have been listed under this category</Text>
					</Flex>
					:
					<>
						{products_data?.map((item)=>{
							return(
								<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/product/${item._id}`)})} bg='#eee' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
									<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src="../Pro.png" alt='next' />
									<Flex direction='column'>
										<Text fontSize='16px' fontFamily='ClearSans-Bold'>{item.name_of_product}</Text>
										<Text fontSize='16px'>{item.industry}</Text>
									</Flex>
								</Flex>
							)
						})}
					</>
				}
			</Flex>
			<Flex p='2' direction='column' gap='2'>
				<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Distributors </Text>
				{distributors_data?.map((distributor)=>{
					return(
						<Flex direction='column' bg='#eee' p='1' mb='1' key={distributor.id} borderRadius='5' boxShadow='lg'>
							<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.company_name}</Text>
							<Text mb='0' >Industry: </Text>
							<Flex>
							{distributor.industries?.map((ind)=>{
								return(
									<Flex key={ind.id}>
										<Text mb='0' fontSize='14px'>{ind},</Text>
									</Flex>
								)
							})}
							</Flex>
							<Text mb='0' fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
						</Flex>
					)
				})}
				<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Manufacturers </Text>
				{manufacturers_data?.map((manufacturer)=>{
					return(
						<Flex direction='column' bg='#eee' mb='1' p='1' key={manufacturer._id} borderRadius='5' boxShadow='lg'>
							<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.company_name}</Text>
							<Text mb='0' >Industry: </Text>
							<Flex wrap='flex'>
								{manufacturer.industries?.map((ind)=>{
									return(
										<Flex key={ind.id}>
											<Text mb='0' fontSize='14px'>{ind},</Text>
										</Flex>
									)
								})}
							</Flex>
							<Text mb='0' fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
						</Flex>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Explore;
