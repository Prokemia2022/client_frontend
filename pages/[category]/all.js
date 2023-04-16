//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Center,Image,useToast} from '@chakra-ui/react';
//components import
import Header from '../../components/Header.js';
//api calls imports
import Get_Industries from '../api/control/get_industries.js'
import Get_Technologies from '../api/control/get_technologies.js'
import Get_Distributors from '../api/auth/distributor/get_distributors.js'
import Get_Manufacturers from '../api/auth/manufacturer/get_manufacturers.js'
//utils
import {useRouter} from 'next/router';
//icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function All(){
	//utils
	const router = useRouter();
	let categ = router.query;
	const toast = useToast();
	//console.log(categ)
	//apis
	//states
	const [industries_data,set_industries_data]=useState([]);
	const [technologies_data,set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [isloading,set_isloading]=useState(true);
	//functions
	/**fetch industries */
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_industries_data(result)
			////console.log(result)
		}).then(()=>{
			set_isloading(false)
		})
	}
	/**fetch technologies */
	const get_Technologies_Data=async()=>{
		await Get_Technologies().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_technologies_data(result)
			////console.log(response.data)
		}).then(()=>{
			set_isloading(false)
		})
	}
	/**fetch distributors */
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_distributors_data(result_data)
			//console.log(result_data)
		}).then(()=>{
			set_isloading(false)
		})
	}
	/**fetch manufacturers */
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			set_manufacturers_data(result_data)
			////console.log(response.data)
		}).then(()=>{
			set_isloading(false)
		})
	}
	//useEffects
	useEffect(()=>{
		if(!categ){
			alert('could not get options')
			router.back()
		}
		if(categ.category === 'Industries'){
			////console.log('1')
			get_Industries_Data()
		}else if(categ.category === 'Technologies'){
			////console.log('2')
			get_Technologies_Data()
		}else{
			toast({
				title: '',
				description: `broken link, redirecting`,
				status: 'info',
				isClosable: true,
			});
			router.back()
		}
		get_Distributors_Data()
		get_Manufacturers_Data()
	},[categ])
	
	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Flex direction='column' gap='2' p='2'>
				{categ?.category === 'Industries'?
					<Flex direction='column' gap='2' w='100%'>
						<Text fontSize='28px' fontFamily='ClearSans-Bold' >{categ?.category}</Text>
						<Flex wrap='Wrap' w='100%' justify='space-between'>
							{!isloading ?
								<>
									{industries_data?.map((item)=>{
										return(
											<Flex cursor='pointer' key={item._id} w={window?.width > 500? '200px':'150px'} h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
												<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
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
				:
					<Flex direction='column' gap='2' w='100%'>
						<Text fontSize='28px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000' >{categ.category}</Text>
						<Flex wrap='Wrap' w='100%' justify='space-between'>
							{!isloading ?
								<>
									{technologies_data?.map((item)=>{
										return(
											<Flex cursor='pointer' key={item._id} w={window?.width > 500 ? '200px':'150px'} h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${item.title}`)})}>
												<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' w='100%'/>
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
				}
				<Flex p='2' direction='column' gap='2'>
					<Text color='#009393' fontSize='24px'> Featured Distributors </Text>
					{!isloading ?
						<>
							{distributors_data?.slice(0,4).map((distributor)=>{
								return(
									<Flex bg='#eee' mb='1' borderRadius='5' key={distributor._id} gap='2' onClick={(()=>{router.push(`/account/distributor/${distributor._id}`)})} cursor='pointer'>
										<Image objectFit='cover' src={distributor?.profile_photo_url} boxSize='100px' alt='profilelogo'/>
										<Flex direction='column' p='2' gap='2' flex='1'>
											<Text mb='0' fontSize='24px' fontFamily='ClearSans-Bold'>{distributor.company_name}</Text>
											<Text mb='0' w='80%' overflow='hidden' h='20px'>{distributor.description}</Text>
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
										<Flex bg='#eee' mb='1' borderRadius='5' key={manufacturer._id} gap='2' onClick={(()=>{router.push(`/account/manufacturer/${manufacturer._id}`)})} cursor='pointer'>
											<Image objectFit='cover' src={manufacturer?.profile_photo_url} w='100px' h='100px' alt='profilelogo'/>
											<Flex direction='column' p='2' gap='2' flex='1'>
												<Text mb='0' fontSize='24px' fontFamily='ClearSans-Bold'>{manufacturer.company_name}</Text>
												<Text mb='0' w='80%' overflow='hidden' h='20px'>{manufacturer.description}</Text>
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