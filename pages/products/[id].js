//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Image,Divider, Heading, Collapse, Button, Icon, Grid} from '@chakra-ui/react';
//components
//utils
import {useRouter} from 'next/router';
//styles
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import Product_Card from '../../components/ui/Category/Product_Card.ui.js';
import { UseDistributorSrt } from '../../hooks/distributor/useDistributorSrt.js';
import { UseManufacturerSrt } from '../../hooks/manufacturer/useManufacturerSrt.js';
import UseShuffle from '../../hooks/lib/useShuffle.js';
import { UseIndustryData } from '../../hooks/industries/useIndustryData.hook.js';
import { UseTechnologyData } from '../../hooks/technology/useTechnologyData.hook.js';
import { UseProductsSearch } from '../../hooks/product/useProductSearch.hook.js';

export default function Products(){
	//utils
	const router = useRouter();
	const categ = router.query; //gets the category object in the query i.e industry/technology
	//console.log(categ?.id)
	const category_title = categ?.id;
	const category_type = categ?.type;
	//states
	const [products_data,set_products_data]=useState([]);
	const [data,set_data]=useState('');
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isloading,set_isloading]=useState(true);

	//functions
	
	//api calls
	async function get_Products_Data(prop){
		const query_params = { query : prop?.title };
		let data = await UseProductsSearch(query_params);
		set_products_data(data)
	}
	async function get_Industry_data(){
		let data = await UseIndustryData(category_title);
		set_data(data);
		get_Products_Data(data)
	}
	async function get_Technology_data(){
		let data = await UseTechnologyData(category_title);
		set_data(data)
		get_Products_Data(data)
	}
	/**fetch products data*/
	async function get_Distributors_Data(){
		let data = await UseDistributorSrt();
		const shuffled_data = UseShuffle(data.filter((item)=> item?.subscription));
		set_distributors_data(shuffled_data)
	}
	async function get_Manufacturers_Data(){
		let data = await UseManufacturerSrt();
		const shuffled_data = UseShuffle(data.filter((item)=> item?.subscription));
		set_manufacturers_data(shuffled_data)
		set_isloading(false)
	}
	//useEffects
	useEffect(()=>{
		if (category_type === 'Industries'){
			get_Industry_data()
		}else if(category_type === 'Technologies'){
			get_Technology_data()
		}
		get_Distributors_Data()
		get_Manufacturers_Data()
	},[categ,category_title,category_type])
	const [show, setShow] = useState(false)

  const handleToggle = () => setShow(!show)
	return(
		<Flex direction='column' p='6'>	
			<Flex gap='2' flexDirection={{md:'row',base:'column'}}>
				<Image src={data?.cover_image} alt='image' boxSize={200} objectFit={'cover'} borderRadius={5}/>
				<Flex flexDirection={'column'} px='2' flex='1' >
					<Heading as={'h2'}>{data?.title}</Heading>
					<Collapse startingHeight={100} in={show}>
						{data?.description}
					</Collapse>
					<Text fontSize='sm' onClick={handleToggle} mt='1rem' bg='#eee' p='2' w='110px' borderRadius={'5'} cursor={'pointer'}>
						Show {show ? 'Less' : 'More'} {show ? <Icon as={IoIosArrowUp} boxSize={3}/> : <Icon as={IoIosArrowDown} boxSize={3}/>}
					</Text>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2'>
				<Text color='#009393' fontSize='24px' mt='2'>Products </Text>
				<Divider/>
				{products_data.length !== 0 ?
					<Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)'}} gap={'2'} mt='1'>
						{products_data?.map((item)=>{
							return(
								<Product_Card item={item} key={item?._id}/>
							)
						})}
					</Grid>
					:
					<Flex bg='#eee' p='2' justify='center' align='center' h='40vh' boxShadow='lg'>
						<Text>No products have been listed under this category</Text>
					</Flex>
				}
			</Flex>
			<Flex p='2' direction='column' gap='2'>
				<Text color='#009393' fontSize='24px'> Featured Distributors </Text>
				<Divider/>
					{!isloading ?
						<>
							{distributors_data?.slice(0,4).map((distributor)=>{
								return(
									<Flex bg='#eee' mb='1' borderRadius='5' key={distributor?._id} gap='2' onClick={(()=>{router.push(`/supplier?id=${distributor?._id}&supplier=distributor`)})} cursor='pointer'>
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
					<Divider/>
						{!isloading ?
							<>
								{manufacturers_data?.slice(0,4).map((manufacturer)=>{
									return(
										<Flex bg='#eee' mb='1' borderRadius='5' key={manufacturer?._id} gap='2' onClick={(()=>{router.push(`/supplier?id=${manufacturer?._id}&supplier=manufacturer`)})} cursor='pointer'>
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