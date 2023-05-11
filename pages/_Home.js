import React,{useState,useEffect} from 'react'
import { Flex,Text,Image,Center,Select,Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
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
	const [products_data,set_products_data]=useState([]);
	const [industries_data,set_industries_data]=useState([]);
	const [technologies_data,set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [window,set_window]=useState({});
	const [isloading,set_isloading]=useState(true);

	useEffect(()=>{
		const client = {
			width: document?.documentElement?.clientWidth,
			height: document?.documentElement?.clientHeight
		}
		//console.log(typeof(client))
		if (client != {}){
			set_window(client)
		}else{
			set_window({})
		}
		get_Products_Data()
		get_Industries_Data()
		get_Technologies_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
	},[])

	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			set_isloading(false);
			const data = response?.data;
			const result_data = data.filter((item)=> item?.verification_status);
			set_products_data(result_data);
		}).catch((err)=>{
			//console.log(err);
		});		
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
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status);
			const shuffled_data = shuffle(result_data.filter((item)=> item?.subscription));
			set_distributors_data(shuffled_data)
			//console.log(shuffled_data)
		})
	}
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			const shuffled_data = shuffle(result_data.filter((item)=> item?.subscription));
			set_manufacturers_data(shuffled_data)
			//console.log(shuffled_data)
		})
	}
	function shuffle(array) {
		let currentIndex = array.length,  randomIndex;
	  
		// While there remain elements to shuffle.
		while (currentIndex != 0) {
	  
		  // Pick a remaining element.
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex--;
	  
		  // And swap it with the current element.
		  [array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	  
		return array;
	  }
	return(
		<Flex direction='column' position='relative' gap='2'>
		<Header products_data={products_data} distributors_data={distributors_data} manufacturers_data={manufacturers_data} industries_data={industries_data} technologies_data={technologies_data}/>
		<Flex p='4' direction='column' >
			<Flex mt={window.width > 500? '10vh' : ''} mb='50px' direction='column' gap='3' w='100%' p='2'>
				<Text mb='3' fontFamily='ClearSans-Bold' fontSize='38px' >The <span style={{color:"#009393"}}>Marketplace</span> for Ingredients, Polymers and Chemistry.</Text>
				<Text mb='0' w='80%'>Search, earn, engage, sample, quote and purchase from thousands of suppliers - all in one platform.</Text>
			</Flex>
			<Flex direction='column' gap='2' w='100%'>
				<Flex justify='space-between' align='center' p='2'>
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='24px'>Industries</Text>
					<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Industries/all')})} cursor='pointer'>see more</Text>
				</Flex>
				<Flex wrap='Wrap' w='100%' justify=''>
					{!isloading ?
						<>
							{industries_data?.slice(0,4).map((item)=>{
								return(
									<Flex cursor='pointer' key={item._id} w={window?.width > 500? '175px':'150px'} h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
										<Image objectFit={item?.cover_image == ''? "contain":'cover'} src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
										<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' w='80%' fontSize='20px' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
									</Flex>
								)
							})}
						</>:
						<>
							<Item_Loading />
							<Item_Loading />
						</>
					}				
				</Flex>
			</Flex>
			<Flex direction='column' gap='3' w='100%' mt='2'>
				<Flex p='2' justify='space-between' alighn='center'>
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='24px'>Technologies</Text>
					<Text mb='0' color='#009393' fontSize='18px' onClick={(()=>{router.push("/Technologies/all")})}>see more</Text>
				</Flex>
				<Flex wrap='Wrap' w='100%' justify=''>
					{!isloading ?
						<>
							{technologies_data?.slice(0,4).map((item)=>{
								return(
									<Flex cursor='pointer' key={item._id} w={window?.width > 500 ? '175px':'150px'} h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
										<Image objectFit={item?.cover_image == ''? "contain":'cover'} src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
										<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' fontSize='20px' w='80%' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
									</Flex>
								)
							})}
						</>:
						<>
							<Item_Loading />
							<Item_Loading />
						</>
					}
				</Flex>
			</Flex>
			<Text mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Featured Products</Text>
			{!isloading ?
				<Flex direction={'column'} gap='2'>
					{products_data?.slice(0,4).map((item)=>{
						return(
							<Product_Cart_Item item={item} key={item?._id}/>
						)
					})}
				</Flex>:
				<>
					<Loading />
					<Loading />
				</>
			}
			<Text  mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Top Distributors </Text>
			{!isloading ?
				<>
					{distributors_data?.slice(0,4).map((distributor)=>{
						return(
							<Flex bg='#eee' mb='1' borderRadius='5' key={distributor?._id} gap='2' onClick={(()=>{router.push(`/account/distributor/${distributor?._id}`)})} cursor='pointer'>
								<Image objectFit={distributor?.profile_photo_url == '' || !distributor?.profile_photo_url? "contain":'cover'} src={distributor?.profile_photo_url == '' || !distributor?.profile_photo_url? "../Pro.png":distributor?.profile_photo_url} boxSize='100px' alt='profilelogo'/>
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
			<Text  mt='4' fontSize='24px' fontFamily='ClearSans-Bold'>Top Manufacturers </Text>
			{!isloading ?
				<>
					{manufacturers_data?.slice(0,4).map((manufacturer)=>{
						return(
							<Flex bg='#eee' mb='1' borderRadius='5' key={manufacturer?._id} gap='2' onClick={(()=>{router.push(`/account/manufacturer/${manufacturer?._id}`)})} cursor='pointer'>
								<Image objectFit={manufacturer?.profile_photo_url == '' || !manufacturer?.profile_photo_url? "contain":'cover'} src={manufacturer?.profile_photo_url == '' || !manufacturer?.profile_photo_url? "../Pro.png":manufacturer?.profile_photo_url} w='100px' h='100px' alt='profilelogo'/>
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
				<Text mb='0'  fontSize='48px'>Interested in Selling Products?</Text>
				<Text mb='0'  >Register as a Manufacturer or Distributor to start marketing your products in East, Central and Southern Africa.</Text>
				<Text  mb='0' >Boost your sales and access a wide market for your company or business.</Text>
				<Button bg='#000' border='1px solid #fff'>Request a demo <PlayArrowIcon /></Button>
				<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/account/1')})}>Start selling</Button>
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

const Item_Loading=()=>{
	return(
		<Flex w='150px' h='225px' m='1' position='relative' bg='#fff' boxShadow='lg'>
			<Flex bg='#eee' p='4' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' w='80%' h='50px'/>
		</Flex>
	)
}
