//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Image,useToast,Grid,GridItem} from '@chakra-ui/react';
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


export default function Categories(){
	/**
	 * Categories: Fetches all items in the industry and technology catgory.
	 * Props:
	 * 		categ (string): Shows the current category selected by user,i.e industries or technologies.
	 */
	//utils
	const router = useRouter();
	let categ = router.query;
	const toast = useToast();
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
		/**
		 * Fetches all industries
		 */
		await Get_Industries().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_industries_data(result);
		}).then(()=>{
			set_isloading(false)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while fetching data`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	/**fetch technologies */
	const get_Technologies_Data=async()=>{
		/**
		 * Fetches all technologies
		 */
		await Get_Technologies().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_technologies_data(result);
		}).then(()=>{
			set_isloading(false)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while fetching data`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	/*fetch manufacturers */
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
	/**fetch distributors */
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			const shuffled_data = shuffle(result_data.filter((item)=> item?.subscription));
			set_distributors_data(shuffled_data)
			//console.log(shuffled_data)
			//console.log(result_data)
		}).then(()=>{
			set_isloading(false)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while fetching data`,
				status: 'error',
				isClosable: true,
			});
		});
	}
	/**fetch manufacturers */
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status)
			const shuffled_data = shuffle(result_data.filter((item)=> item?.subscription));
			set_manufacturers_data(shuffled_data)
			////console.log(response.data)
		}).then(()=>{
			set_isloading(false)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while fetching data`,
				status: 'error',
				isClosable: true,
			});
		});
	}
	//useEffects
	useEffect(()=>{
		if(!categ){
			toast({
				title: 'Could not get data parameters',
				description: `we are redirecting you`,
				status: 'error',
				isClosable: true,
			});
			setTimeout(()=>{
				router.back();
			},500)
		}
		if(categ.category === 'Industries'){
			get_Industries_Data()
		}else if(categ.category === 'Technologies'){
			get_Technologies_Data()
		}else{
			toast({
				title: 'broken link',
				description: `we are redirecting you`,
				status: 'info',
				isClosable: true,
			});
			router.back();
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
						<Flex direction='column' w='100%' justify='space-evenly'>
							{!isloading ?
								<>
									{industries_data?.map((item)=>{
										return(
											<Industry_Card item={item} key={item._id}/>
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
				:
					<Flex direction='column' gap='2' w='100%'>
						<Text fontSize='28px' fontFamily='ClearSans-Bold' >{categ.category}</Text>
						<Flex direction='column' w='100%' justify='space-evenly'>
							{!isloading ?
								<>
									{technologies_data?.map((item)=>{
										return(
											<Technology_Card item={item} key={item._id}/>
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
				}
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

const Industry_Card=({item})=>{
	const router = useRouter();
	return(
		<Flex bg='#fff' mb='1' borderRadius='5' gap='2' onClick={(()=>{router.push(`/products/${item.title}`)})} cursor='pointer'>
			<Image objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' boxSize='100px'/>
			<Flex direction='column' p='2' gap='2' flex='1' bg='#eee'>
				<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{item.title}</Text>
				<Text mb='0' w='80%' overflow='hidden' fontSize='14px'>{!item?.description || item?.description == ''? '-' : item?.description}</Text>
			</Flex>
		</Flex>
	)
}

const Technology_Card=({item})=>{
	const router = useRouter();
	return(
		<Flex bg='#fff' mb='1' borderRadius='5' gap='2' onClick={(()=>{router.push(`/products/${item.title}`)})} cursor='pointer'>
			<Image objectFit='cover' src={item?.cover_image == ''? "../Pro.png":item?.cover_image} alt='photo' boxShadow='lg' boxSize='100px'/>
			<Flex direction='column' p='2' gap='2' flex='1' bg='#eee'>
				<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{item.title}</Text>
				<Text mb='0' w='80%' overflow='hidden' fontSize='14px'>{!item?.description || item?.description == ''? '-' : item?.description}</Text>
			</Flex>
		</Flex>
	)
}