import React,{useState,useEffect} from 'react'
import { Flex,Text,Center,Button, Icon, SimpleGrid, Image, } from '@chakra-ui/react';
// utils
import {useRouter} from 'next/router';
// icons
import { FaFileDownload, FaSearch  } from "react-icons/fa";
// components
import { Section } from '../components/ui/Category/Card_section.js';
import { Supplier_Section } from '../components/ui/Supplier/Card_section.js';
import { Product_Section } from '../components/ui/Product/Card_Section.js';
// hooks
import { UseTechnologiesSrt } from '../hooks/technology/useTechnologiesSrt.js';
import { UseIndustriesSrt } from '../hooks/industries/useIndustriesSrt.js';
import { UseDistributorSrt } from '../hooks/distributor/useDistributorSrt.js';
import { UseManufacturerSrt } from '../hooks/manufacturer/useManufacturerSrt.js';
import { UseProductsSrt } from '../hooks/product/useProductSrt.js';
import UseShuffle from '../hooks/lib/useShuffle.js';

function Home(){
	const [products_data,set_products_data]=useState([]);
	const [industries_data,set_industries_data] = useState([]);
	const [technologies_data,set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isloading,set_isloading]=useState(true);
	let data = [...distributors_data,...manufacturers_data]

	useEffect(()=>{
		get_Products_Data()
		get_Industries_Data()
		get_Technologies_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
		set_isloading(false)
	},[])
	async function get_Products_Data(){
		let data = await UseProductsSrt();
		set_products_data(data)
	}
	async function get_Industries_Data(){
		let data = await UseIndustriesSrt();
		set_industries_data(data)
	}
	async function get_Technologies_Data(){
		let data = await UseTechnologiesSrt();
		set_technologies_data(data)
	}
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
    const [searchbaractive, setsearchbaractive]=useState(null);
    const [query_search, setquery_search]=useState('');
	return(
		<Flex direction='column' position='relative' gap='2'>
			<Flex p='4' direction='column' >
				<Flex mt={{md:'10vh', sm:''}} mb='50px' direction='column' gap='3' w='100%' p='2'>
					<Text mb='3' fontFamily='ClearSans-Bold' fontSize='38px' >The <span style={{color:"#009393"}}>Marketplace</span> for Ingredients, Polymers and Chemistry.</Text>
					<Text mb='0' w='80%'>Search, earn, engage, sample, quote and purchase from thousands of suppliers - all in one platform.</Text>
				</Flex>
				{/** industries section*/}
				<Section isloading={isloading} title='Industries' data={industries_data}/>
				{/** technologies section*/}
				<Section isloading={isloading} title='Technologies' data={technologies_data}/>
				{/** products section*/}
				<Product_Section isloading={isloading} data={products_data} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
				{/** suppliers section*/}
				<Supplier_Section isloading={isloading} title='Our Top Suppliers' data={data} link_tag='distributor'/>
				{/** stats section*/}
				<Center>
					<Flex justify='space-around'>
					{numbers.map((item)=>{
						return(
							<Flex key={item.id} textAlign='center' align='center' direction='column' m='5'>
								<Text mb='0' color='#009393' fontSize='32px' fontFamily='ClearSans-Bold'>{item.numbers}</Text>
								<Icon as={item?.icon} boxSize={6} mt='2'/>
								<Text mb='0' fontSize='20px'>{item.title}</Text>
								<Text mb='0'>made</Text>
							</Flex>
						)
					})}
					</Flex>
				</Center>
				{/** promo section*/}
				<Promo/>
			</Flex>
		</Flex>
	)
}

export default Home;

const numbers=[
	{
		id:'1',
		title:'Quotation requests',
		numbers:'1k',
		icon: FaFileDownload,
	},
	{
		id:'2',
		title:'Search results',
		numbers:'200k',
		icon: FaSearch ,
	},
	{
		id:'3',
		title:'Sample requests',
		numbers:'2k',
		icon: FaFileDownload,
	},
]

const Promo=({})=>{
	const router = useRouter();
	return(
		<SimpleGrid columns={{ base: 1, md: 2, }} spacing={0} bg='#343838' color={'white'} borderRadius={10}>
			<Flex bg="brand.400">
				<Image src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" alt="3 women looking at a laptop" fit="cover" w="full" h={{ base: 64, md: "full", }} bg="gray.100" loading="lazy" opacity={0.4}/>
			</Flex>
			<Flex direction="column" alignItems="start" justifyContent="center" px={{ base: 4, md: 8, lg: 20, }} py={24} zIndex={3} >
				<Text color="brand.600" fontSize="lg"textTransform="uppercase"fontWeight="extrabold">Interested in Selling Products?</Text>
				<Text mb={4} fontSize={{ base: "4xl", md: "4xl", lg: "5xl", }} fontWeight="bold" color="brand.600" lineHeight="shorter" textShadow="2px 0 currentcolor" > We&apos;re here to help </Text>
				<Text pr={{ base: 0, lg: 16, }} mb={4} fontSize="lg" color="brand.600"  letterSpacing="wider" > Register for a supplier account to start marketing your products in East, Central and Southern Africa.</Text>
				<Button bg='#009393' transition={'.6 ease-in-out'} onClick={(()=>{router.push('/demo')})} _hover={{bg:'#000'}}>
					REQUEST A DEMO
				</Button>
			</Flex>
		</SimpleGrid>
	)
}