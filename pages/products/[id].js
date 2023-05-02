//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Image} from '@chakra-ui/react';
//api calls
import Get_Products from '../api/product/get_products.js'
import Get_Distributors from '../api/auth/distributor/get_distributors.js'
import Get_Industries from '../api/control/get_industries.js'
import Get_Technologies from '../api/control/get_technologies.js'
import Get_Manufacturers from '../api/auth/manufacturer/get_manufacturers.js'
//icons
//components
import Header from '../../components/Header.js';
//utils
import {useRouter} from 'next/router';

export default function Products(){
	//utils
	const router = useRouter();
	const categ = router.query; //gets the category object in the query i.e industry/technology
	//console.log(categ?.id)
	const category_title = categ?.id
	//states
	const [products_data,set_products_data]=useState([]);
	const [industry_data,set_industry_data]=useState('')
	const [technology_data,set_technology_data]=useState('')
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isloading,set_isloading]=useState(true);

	//functions
	
	//api calls
	/**fetch products data*/
	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data;
			const result = data.filter((item)=> item?.industry.includes(categ?.id) || item?.technology.includes(categ?.id));
			////console.log(response.data)
			set_products_data(result);
			set_isloading(false);
		})
	}
	/*fetch manufacturers */
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_manufacturers_data(result_data)
			////console.log(response.data)
		})
	}
	/**fetch distributors */
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_distributors_data(result_data)
			////console.log(response.data)
		})
	}
	const get_Industry_data=async()=>{
		await Get_Industries().then((res)=>{
			//console.log(res.data)
			const industry = res.data
			const filtered_result = industry.filter((item)=> item?.title?.toLowerCase().includes(category_title?.toLowerCase()))
			set_industry_data(...filtered_result)
			//console.log(...filtered_result)
		})
	}
	const get_Technology_data=async()=>{
		await Get_Technologies().then((res)=>{
			//console.log(res.data)
			const technology = res.data
			const filtered_result = technology.filter((item)=> item?.title?.toLowerCase().includes(category_title?.toLowerCase()))
			set_technology_data(...filtered_result)
			///console.log(...filtered_result)
		})
	}
	//useEffects
	useEffect(()=>{
		get_Products_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
		get_Technology_data()
		get_Industry_data()
	},[categ])
	////console.log(industry_data)
	return(
		<Flex direction='column'>
			<Header/>
			<Flex p='2' direction='column' gap='2'>
				<Flex direction='column' mb='4'>
					<Text fontSize='32px' fontFamily='ClearSans-Bold' color='#009393'>{category_title}</Text>
					<Text>{industry_data == undefined? null : industry_data?.description}</Text>
					<Text>{technology_data == undefined? null : technology_data?.description}</Text>
				</Flex>
				{isloading ?
					<>
						<Loading/>
						<Loading/>
					</>
					:
					<>
						{products_data.length !== 0 ?
							<>
								{products_data?.map((item)=>{
									return(
										<Product_Cart_Item item={item} key={item?._id}/>
									)
								})}
							</>:
							<Flex bg='#eee' p='2' justify='center' align='center' h='40vh' boxShadow='lg'>
								<Text>No products have been listed under this category</Text>
							</Flex>
						}
					</>
				}
			</Flex>
			<Flex p='2' direction='column' gap='2'>
					<Text color='#009393' fontSize='24px'> Featured Distributors </Text>
					{!isloading ?
						<>
							{distributors_data?.slice(0,4).map((distributor)=>{
								return(
									<Flex bg='#eee' mb='1' borderRadius='5' key={distributor?._id} gap='2' onClick={(()=>{router.push(`/account/distributor/${distributor?._id}`)})} cursor='pointer'>
										<Image objectFit={distributor?.profile_photo_url == ''? "contain":'cover'} src={distributor?.profile_photo_url == '' || !distributor?.profile_photo_url? "../Pro.png":distributor?.profile_photo_url} alt='photo' boxShadow='lg' boxSize='100px'/>
										<Flex direction='column' p='2' gap='2' flex='1'>
											<Text mb='0' fontSize='24px' fontFamily='ClearSans-Bold'>{distributor?.company_name}</Text>
											<Text mb='0' w='80%' overflow='hidden' h='20px'>{!distributor?.description || distributor?.description == ''? '-' : distributor?.description}</Text>
										</Flex>
									</Flex>
								)
							})}
						</>:
						<>
							<Loading />
							<Loading />
						</>
					}
					<Text color='#009393' fontSize='24px'>Featured Manufacturers </Text>
						{!isloading ?
							<>
								{manufacturers_data?.slice(0,4).map((manufacturer)=>{
									return(
										<Flex bg='#eee' mb='1' borderRadius='5' key={manufacturer?._id} gap='2' onClick={(()=>{router.push(`/account/manufacturer/${manufacturer?._id}`)})} cursor='pointer'>
											<Image objectFit={manufacturer?.profile_photo_url == ''? "contain":'cover'} src={manufacturer?.profile_photo_url == '' || !manufacturer?.profile_photo_url? "../Pro.png":manufacturer?.profile_photo_url} alt='photo' boxShadow='lg' boxSize='100px'/>
											<Flex direction='column' p='2' gap='2' flex='1'>
												<Text mb='0' fontSize='24px' fontFamily='ClearSans-Bold'>{manufacturer?.company_name}</Text>
												<Text mb='0' w='80%' overflow='hidden' h='20px'>{!manufacturer?.description || manufacturer?.description == ''? '-' : manufacturer?.description}</Text>
											</Flex>
										</Flex>
									)
								})}
							</>:
							<>
								<Loading />
								<Loading />
							</>
						}
				</Flex>
		</Flex>
	)
}

const Loading=()=>{
	return(
		<Flex h='80px' position='relative' gap='2' align='center' boxShadow='lg' p='2'>
			<Flex w='50px' h='50px' borderRadius='10px' bg='#eee'/>
			<Flex direction='column' flex='1' gap='3'>
				<Flex bg='#eee' w='100%' h='20px' borderRadius='5'/>
				<Flex bg='#eee' w='100%' h='20px' borderRadius='5'/>
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