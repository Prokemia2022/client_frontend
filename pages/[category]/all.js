//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text, SimpleGrid, Box} from '@chakra-ui/react';

import { useRouter } from 'next/router';
// hooks
import { useProductsSrt } from '../../hooks/product/useProductSrt.js';
import { useIndustriesSrt } from '../../hooks/industries/useIndustriesSrt.js';
import { useTechnologiesSrt } from '../../hooks/technology/useTechnologiesSrt.js';
import useShuffle from '../../hooks/lib/useShuffle.js';
import { useManufacturerSrt } from '../../hooks/manufacturer/useManufacturerSrt.js';
import { useDistributorSrt } from '../../hooks/distributor/useDistributorSrt.js';
// components
import Loading_Card from '../../components/ui/Product/Loading_Card.js';
import Item_Card from '../../components/ui/Category/Item_Card.js';
import { Supplier_Section } from '../../components/ui/Supplier/Card_section.js';
import { Product_Section } from '../../components/ui/Product/Card_Section.js';
//icons


export default function Categories(){
	/**
	 * Categories: Fetches all items in the industry and technology catgory.
	 * Props:
	 * 		categ (string): Shows the current category selected by user,i.e industries or technologies.
	 */
	//utils
	const router = useRouter();
	let categ = router.query;
	//apis

	const [products_data,set_products_data]=useState([]);
	const [data,set_data] = useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isloading,set_isloading]=useState(true);

	useEffect(()=>{
		get_Products_Data()
		if(categ?.category === 'Industries'){
			get_Industries_Data()
		}else if(categ?.category === 'Technologies'){
			get_Technologies_Data()
		}
		get_Distributors_Data()
		get_Manufacturers_Data()
		set_isloading(false)
	},[categ?.category])
	
	async function get_Products_Data(){
		let data = await useProductsSrt();
		set_products_data(data)
	}
	async function get_Industries_Data(){
		let data = await useIndustriesSrt();
		set_data(data)
	}
	async function get_Technologies_Data(){
		let data = await useTechnologiesSrt();
		set_data(data)
	}
	async function get_Distributors_Data(){
		let data = await useDistributorSrt();
		const shuffled_data = useShuffle(data.filter((item)=> item?.subscription));
		set_distributors_data(shuffled_data)
	}
	async function get_Manufacturers_Data(){
		let data = await useManufacturerSrt();
		const shuffled_data = useShuffle(data.filter((item)=> item?.subscription));
		set_manufacturers_data(shuffled_data)
		set_isloading(false)
	}
	//useEffects
	const [searchbaractive, setsearchbaractive]=useState(null);
    const [query_search, setquery_search]=useState('');
	return(
		<Flex direction='column' gap='2' p='4'>
			<Box w='100vw' h='30vh' position={'absolute'} zIndex='-10' top='70px' left={'0'}/>
			<Text fontSize='28px' fontFamily='ClearSans-Bold' >{categ?.category}</Text>
			<SimpleGrid minChildWidth='150px' spacing='20px'>
				{isloading ?
					<>
						{Array.from({length:4})?.map((i, idx)=>{return(<Loading_Card key={idx}/>)})}
					</>
					:
					<>
						{data?.map((item)=>{
							return(
								<Item_Card item={item} key={item?._id} active={categ?.category}/>
							)
						})}
					</>
					
				}				
			</SimpleGrid>
			<Product_Section isloading={isloading} data={products_data} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
			<Supplier_Section isloading={isloading} title='Top Distributors' data={distributors_data} link_tag='distributor'/>
			<Supplier_Section isloading={isloading} title='Top Manufacturers' data={manufacturers_data} link_tag='manufacturer'/>
		</Flex>
	)
}