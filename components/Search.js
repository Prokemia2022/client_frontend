import { useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import { Flex,Text,Image, Spinner } from '@chakra-ui/react';
// hooks
import { useDebounceValue } from '../hooks/lib/useDebounce.hook.js';
import { useProductsSearch } from '../hooks/product/useProductSearch.hook.js';
import { useIndustriesSrt } from '../hooks/industries/useIndustriesSrt.js';
import { useTechnologiesSrt } from '../hooks/technology/useTechnologiesSrt.js';
import { useDistributorSrt } from '../hooks/distributor/useDistributorSrt.js';
import { useManufacturerSrt } from '../hooks/manufacturer/useManufacturerSrt.js';
// components
import { Product_Card } from './ui/Product/Item_Card.js';
import { Item_accordion } from './ui/header_navigation/accordion.js';
import Script from 'next/script';
// styles
import styles from '../styles/Search.module.css';

export default function Search({setsearchbaractive,query_search,setquery_search}){
	const [products_data,set_products_data]=useState([]);
	const [industries_data,set_industries_data]=useState([]);
	const [technologies_data,set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isfetching, set_isfetching]=useState(null);
	const debounce_search_value = useDebounceValue(query_search.trimStart());

	useEffect(()=>{
		set_isfetching(true);
		(async ()=>{
			if (debounce_search_value.length > 0){
				get_Products_Data();
				get_Industries_Data();
				get_Technologies_Data();
				get_Distributors_Data();
				get_Manufacturers_Data();
				setTimeout(()=>{
					set_isfetching(false);
				},500)
			}else{
				set_isfetching(false);
			}
		})();
	},[debounce_search_value])

	async function get_Products_Data(){
		const query_params = { query : debounce_search_value };
		let data = await useProductsSearch(query_params);
		set_products_data(data);
	}
	async function get_Industries_Data(){
		let data = await useIndustriesSrt();
		const filtered_result = data?.filter(item => item.title?.toLowerCase().includes(debounce_search_value.toLowerCase()));
		set_industries_data(filtered_result);
	}
	async function get_Technologies_Data(){
		let data = await useTechnologiesSrt();
		const filtered_result = data?.filter(item => item.title?.toLowerCase().includes(debounce_search_value.toLowerCase()));
		set_technologies_data(filtered_result);
	}
	async function get_Distributors_Data(){
		let data = await useDistributorSrt();
		const result = data.filter(item => item.company_name?.toLowerCase().includes(debounce_search_value.toLowerCase()));
		set_distributors_data(result);
	}
	async function get_Manufacturers_Data(){
		let data = await useManufacturerSrt();
		const result = data.filter(item => item.company_name?.toLowerCase().includes(debounce_search_value.toLowerCase()));
		set_manufacturers_data(result);
	}
	return(
			<Flex direction='column' className={styles.search_body}>
				<Flex className={styles.result_bar_body}>
					{isfetching?
						<Flex justify={'center'} align={'center'} h='100%'>
							<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#009393' size='xl' />
						</Flex>
					  	:
						<>
							{products_data.length === 0 && distributors_data.length === 0 && manufacturers_data.length === 0 && industries_data.length === 0 && technologies_data.length === 0 ?
								<Flex className={styles.Results_Info}>
									<Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
									<lord-icon src="https://cdn.lordicon.com/gqzfzudq.json" trigger="loop" delay="500" style={{marginTop:'20px',width:'70px',height:"70px",}} ></lord-icon>
									<Text w='50%' textAlign='center'>Sorry! We could not find items that match your search</Text>
								</Flex>
								:
								<Result setquery_search={setquery_search} products_data={products_data}  distributors_data={distributors_data}  manufacturers_data={manufacturers_data}  industries_data={industries_data} setsearchbaractive={setsearchbaractive} technologies_data={technologies_data}/>
							}
						</>
					}
				</Flex>
			</Flex>
	)
}

const Result=(props)=>{
	const { products_data,distributors_data,manufacturers_data,industries_data,technologies_data,setquery_search,setsearchbaractive } = {...props};
	return(
		<Flex className={styles.ResultsBar}>
			<Item_accordion title={'Products'} item_no={products_data?.length}>
				{products_data?.map((item)=>{
					return(
						<Product_Card item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
					)
				})}
			</Item_accordion>
			<Item_accordion title={'Distributors'} item_no={distributors_data?.length}>
				{distributors_data?.map((item)=>{
					return(
						<Item_card image={item?.profile_photo_url} title={item?.company_name} description={item?.description} base_route={`/supplier?id=${item?._id}&supplier=distributor`} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
					)
				})}
			</Item_accordion>
			<Item_accordion title={'Manufacturers'} item_no={manufacturers_data?.length}>
				{manufacturers_data?.map((item)=>{
					return(
						<Item_card image={item?.profile_photo_url} title={item?.company_name} description={item?.description} base_route={`/supplier?id=${item?._id}&supplier=manufacturer`}  key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
					)
				})}
			</Item_accordion>
			<Item_accordion title={'Industries'} item_no={industries_data?.length}>
				{industries_data?.map((item)=>{
					return(
						<Item_card image={item?.cover_image} title={item?.title} description={null} base_route={`/products/${item?.title}?type=Industries`} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
					)
				})}
			</Item_accordion>
			<Item_accordion title={'Technologies'} item_no={technologies_data?.length}>
				{technologies_data?.map((item)=>{
					return(
						<Item_card image={item?.cover_image} title={item?.title} description={null} base_route={`/products/${item?.title}?type=Technologies`} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
					)
				})}
			</Item_accordion>
		</Flex>
	)
}

export const Item_card=(props)=>{
	const router = useRouter();
	const { image, title, description, base_route, route, setquery_search, setsearchbaractive} = {...props};
	const handleClick=()=>{
		router.push(base_route);
		setquery_search('');
		setsearchbaractive(false);
	}
	return(
		<Flex cursor={'pointer'} my='2' mx='1' gap='2' align='center' onClick={handleClick}>
			<Image w='60px' h='60px' boxShadow={'md'} borderRadius='10px' objectFit='cover' src={image == '' || !image? '../../Pro.png' : image} alt='next'/>
			<Flex direction='column' bg='#fff' p='2' borderRadius='5' boxShadow='md' flex='1' >
				<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{title}</Text>
				<Text fontSize='14px' w='90%' h='40px' overflow='hidden' whiteSpace='no-wrap' fontFamily={'clearSans-Regular'}>{description}</Text>
			</Flex>
		</Flex>
	)
}