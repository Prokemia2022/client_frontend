import {useState,useEffect} from 'react';
import {Flex,Text,Input,Button,Image} from '@chakra-ui/react';
import styles from '../styles/Search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import Script from 'next/script';
import {useRouter} from 'next/router'
import Get_Products from '../pages/api/product/get_products.js'
import Get_Industries from '../pages/api/control/get_industries.js'
import Get_Technologies from '../pages/api/control/get_technologies.js'
import Get_Distributors from '../pages/api/auth/distributor/get_distributors.js'
import Get_Manufacturers from '../pages/api/auth/manufacturer/get_manufacturers.js'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Search({setsearchbaractive,query_search,setquery_search}){
	const [active,set_active]=useState(false);
	const [search_value,set_search_value]=useState('');

	const [products_data,set_products_data]=useState([]);
	const [industries_data,set_industries_data]=useState([]);
	const [technologies_data,set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [product_isfetching, set_product_isfetching]=useState(true);
	const [distributor_isfetching, set_distributor_isfetching]=useState(true);
	const [manufacturers_isfetching, set_manufacturers_isfetching]=useState(true);
	const [industries_isfetching, set_industries_isfetching]=useState(true);
	const [technologies_isfetching, set_technologies_isfetching]=useState(true);
	const [is_querying,set_is_querying]=useState(false);

	const debounce_search_value = useDebounceValue(search_value)

	useEffect(()=>{
		//console.log(search_value)
		if(query_search?.length > 0){
			set_search_value(query_search)
		}
		(async ()=>{
			set_is_querying(true);
			//console.log(debounce_search_value);
			if (debounce_search_value.length == 0){
				set_active(false);
			}
			if (debounce_search_value.length > 0){
				set_active(true);
				get_Products_Data()
				get_Industries_Data()
				get_Technologies_Data()
				get_Distributors_Data()
				get_Manufacturers_Data();
				set_is_querying(false)
			}
		})();
	},[debounce_search_value,query_search,search_value])

	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status && !item.suspension_status)
			const result = result_data.filter((item) => item.name_of_product?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.industry?.toLowerCase().includes(debounce_search_value.toLowerCase()) || 
														item.function?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.chemical_name?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.email_of_lister?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.manufactured_by?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.distributed_by?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||
														item.technology?.toLowerCase().includes(debounce_search_value.toLowerCase()))
			set_products_data(result);
		}).then(()=>{
			set_product_isfetching(false);
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.title?.toLowerCase().includes(debounce_search_value.toLowerCase()))
			set_industries_data(result);
		}).then(()=>{
			set_industries_isfetching(false);
		});
	}
	const get_Technologies_Data=async()=>{
		await Get_Technologies().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status)
			const result = result_data.filter(item => item.title?.toLowerCase().includes(debounce_search_value.toLowerCase()))
			set_technologies_data(result);
		}).then(()=>{
			set_technologies_isfetching(false);
		});
	}
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status && !item.suspension_status)
			const result = result_data.filter(item => item.company_name?.toLowerCase().includes(debounce_search_value.toLowerCase()))
			set_distributors_data(result);
		}).then(()=>{
			set_distributor_isfetching(false);
		});
	}
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			const data = response?.data
			const result_data = data.filter((item)=> item.verification_status && !item.suspension_status)
			const result = result_data.filter(item => item.company_name?.toLowerCase().includes(debounce_search_value.toLowerCase()))
			set_manufacturers_data(result);
		}).then(()=>{
			set_manufacturers_isfetching(false);
		});
	}
	return(
			<Flex direction='column' className={styles.search_body}>
				<Flex className={styles.result_bar_body}>
					<Flex className={styles.search_input_on_result_bar} gap='1'>
						<ArrowBackIcon onClick={(()=>{set_search_value('');setsearchbaractive(false)})}/>
						<Input value={search_value} autoComplete="off" type='text' placeholder='Search for products, sellers, industries, technologies' onChange={((e)=>{set_search_value(e.target.value);setquery_search(e.target.value);set_active(true)})}/>
						{search_value? 
							<Button color='#fff' bg='#009393' borderRadius='5px' onClick={(()=>{set_search_value('');setquery_search('')})}><CloseIcon/></Button>
							:
							<Button color='#fff' bg='#009393' borderRadius='5px'><SearchIcon/></Button>
						}
					</Flex>
					{active ?
						<Result 
									is_querying={is_querying}
									product_isfetching={product_isfetching} 
									distributor_isfetching={distributor_isfetching} 
									manufacturers_isfetching={manufacturers_isfetching} 
									industries_isfetching={industries_isfetching} 
									technologies_isfetching={technologies_isfetching}
									setquery_search={setquery_search}
									set_active={set_active} 
									products_data={products_data} 
									distributors_data={distributors_data} 
									manufacturers_data={manufacturers_data} 
									industries_data={industries_data}
									setsearchbaractive={setsearchbaractive}
									technologies_data={technologies_data}/> 
						:
						null
					}
				</Flex>
			</Flex>
	)
}

const Result=({
				product_isfetching,
				distributor_isfetching,
				manufacturers_isfetching,
				industries_isfetching,
				technologies_isfetching,
				products_data,
				distributors_data,
				manufacturers_data,
				industries_data,
				technologies_data,
				setquery_search,
				setsearchbaractive
			})=>{
	const router = useRouter();
	return(
		<Flex className={styles.ResultsBar}>
			{products_data?.length === 0 && distributors_data?.length === 0 && manufacturers_data?.length === 0 && industries_data?.length === 0 && technologies_data?.length === 0 && !product_isfetching && !distributor_isfetching && !manufacturers_isfetching && !industries_isfetching && !technologies_isfetching?
				<Flex className={styles.Results_Info}>
					<Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
					<lord-icon src="https://cdn.lordicon.com/gqzfzudq.json" trigger="loop" delay="500" style={{marginTop:'20px',width:'70px',height:"70px",}} >
					</lord-icon>
					<Text w='50%' textAlign='center'>Sorry! We could not find items that match your search</Text>
				</Flex>
				:
				<>
					{product_isfetching?
						<Flex w='100%' direction={'column'} gap='2'>
							<Text fontSize='24px' color='#009393' p='1' borderRadius='5'>Products</Text>
							<Loading/>
							<Loading/>
						</Flex>
						:
						<>
							{products_data?.length === 0?
								null
								:
								<Flex direction='column' p='1' gap='2'>
									<Text fontSize='24px' p='1' color='#009393' borderRadius='5'>Products</Text>
									{products_data?.slice(0,4).map((item)=>{
										return(
											<Product_Item router={router} item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>	
										)
									})}
								</Flex>
							}
						</>
					}
					
					{distributor_isfetching?
						<Flex w='100%' direction={'column'} gap='2'>
							<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Distributors</Text>
							<Loading/>
							<Loading/>
						</Flex>
						:
						<>
						{distributors_data?.length === 0?
								null
								:
								<Flex direction='column' p='1' gap='2'>
									<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Distributors</Text>
									{distributors_data?.slice(0,2).map((item)=>{
										return(
											<Distributor_Item router={router} item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
										)
									})}
								</Flex>
							}
						</>
					}
					
					{manufacturers_isfetching?
						<Flex w='100%' direction={'column'} gap='2'>
							<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Manufacturers</Text>
							<Loading/>
							<Loading/>
						</Flex>
						:
						<>
						{manufacturers_data?.length === 0?
							null
							:
							<Flex direction='column' p='1' gap='2'>
								<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Manufacturers</Text>
								{manufacturers_data?.slice(0,2).map((item)=>{
									return(
										<Manufacturer_Item router={router} item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
									)
								})}
							</Flex>
						}
						</>
					}
					
					{industries_isfetching?
						<Flex w='100%' direction={'column'} gap='2'>
							<Flex justify='space-between' align='center' p='2'>
									<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Industries</Text>
									<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Industries/all')})} cursor='pointer'>see more</Text>
								</Flex>
							<Loading/>
							<Loading/>
						</Flex>
						:
						<>
						{industries_data?.length === 0?
							null
							:
							<Flex direction='column' p='1' gap='2'>
								<Flex justify='space-between' align='center' p='2'>
									<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Industries</Text>
									<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Industries/all')})} cursor='pointer'>see more</Text>
								</Flex>
								{industries_data?.slice(0,2).map((item)=>{
									return(
										<Industry_Item router={router} item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
									)
								})}
							</Flex>
						}
						</>
					}
					{technologies_isfetching?
						<Flex w='100%' direction={'column'} gap='2'>
							<Flex justify='space-between' align='center' p='2'>
								<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Technologies</Text>
								<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Technologies/all')})} cursor='pointer'>see more</Text>
							</Flex>
							<Loading/>
							<Loading/>
						</Flex>
						:
						<>
						{technologies_data?.length === 0?
							null
							:
							<Flex direction='column' p='1' gap='2'>
								<Flex justify='space-between' align='center' p='2'>
									<Text mt='2' fontSize='24px' color='#009393' p='1' borderRadius='5'>Technologies</Text>
									<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Technologies/all')})} cursor='pointer'>see more</Text>
								</Flex>
								{technologies_data?.slice(0,2).map((item)=>{
									return(
										<Technology_Item router={router} item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
									)
								})}
							</Flex>
						}
						</>
					}
				</>
				
			}
		</Flex>
	)
}

const Product_Item=({item,router,setquery_search,setsearchbaractive})=>{
	const handle_route=()=>{
		router.push(`/product/${item._id}`);
		setquery_search('')
		setsearchbaractive(false)
	}
	return(
		<Flex key={item._id} position='relative' gap='2' align='center' onClick={handle_route} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../../Pro.png' alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.name_of_product}</Text>
				<Text fontSize='14px'>{item.distributed_by}</Text>
				<Flex gap='2' fontSize='10px' color='grey'>
					<Text>{item.industry}</Text>
					<Text borderLeft='1px solid grey' paddingLeft='2'>{item.technology}</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

const Distributor_Item=({item,router,setquery_search,setsearchbaractive})=>{
	const handle_route=()=>{
		router.push(`/account/distributor/${item?._id}`);
		setquery_search('')
		setsearchbaractive(false);
	}
	return(
		<Flex key={item._id} position='relative' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='lg' onClick={handle_route}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.profile_photo_url == '' || !item?.profile_photo_url? '../../Pro.png' : item?.profile_photo_url} alt='next'/>
			<Flex direction='column'>
				<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.company_name}</Text>
				<Text fontSize='14px' w='90%' h='40px' overflow='hidden' whiteSpace='no-wrap'>{item.description}</Text>
			</Flex>
		</Flex>
	)
}

const Manufacturer_Item=({item,router,setquery_search,setsearchbaractive})=>{
	const handle_route=()=>{
		router.push(`/account/manufacturer/${item?._id}`);
		setquery_search('')
		setsearchbaractive(false);
	}
	return(
		<Flex key={item._id} position='relative' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='lg' onClick={handle_route}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.profile_photo_url == '' || !item?.profile_photo_url? '../../Pro.png' : item?.profile_photo_url} alt='next'/>
			<Flex direction='column'>
				<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.company_name}</Text>
				<Text fontSize='14px' w='90%' p='' h='40px' overflow='hidden' whiteSpace='no-wrap'>{item.description}</Text>
			</Flex>
		</Flex>
	)
}

const Industry_Item=({item,router,setquery_search,setsearchbaractive})=>{
	const handle_route=()=>{
		router.push(`/products/${item.title}`);
		setquery_search('')
		setsearchbaractive(false)
	}
	return(
		<Flex key={item._id} position='relative' gap='2' align='center' onClick={handle_route} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.cover_image == '' || !item?.cover_image?'../../Pro.png':item?.cover_image} alt='next'/>
			<Flex direction='column'>
				<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
			</Flex>
		</Flex>
	)
}

const Technology_Item=({item,router,setquery_search,setsearchbaractive})=>{
	const handle_route=()=>{
		router.push(`/products/${item.title}`);
		setquery_search('')
		setsearchbaractive(false)
	}
	return(
		<Flex key={item._id} position='relative' gap='2' align='center' onClick={handle_route} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.cover_image == '' || !item?.cover_image?'../../Pro.png':item?.cover_image} alt='next'/>
			<Flex direction='column'>
				<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
				
			</Flex>
		</Flex>
	)
}


const Loading=()=>{
	return(
		<Flex h='80px' bg='#fff' position='relative' gap='2' align='center' boxShadow='lg' p='2' flex='1'>
			<Flex w='50px' h='50px' borderRadius='10px' bg='#eee'/>
			<Flex direction='column' flex='1' gap='3'>
				<Flex bg='#eee' w='100%' h='20px' borderRadius='5'/>
				<Flex bg='#eee' w='100%' h='20px' borderRadius='5'/>
			</Flex>
		</Flex>
	)
}

const useDebounceValue=(value, time = 500)=>{
	const [debounceValue, setDebounceValue]=useState(value);

	useEffect(()=>{
		const timeout = setTimeout(()=>{
			setDebounceValue(value);
		}, time);

		return () => {
			clearTimeout(timeout);
		}
	},[value, time]);

	return debounceValue;
}

// <Flex className={styles.ResultsBar} direction='column' p='2' borderRadius='10' bg='#eee' overflowY='scroll' h='60vh' >
// 			<Text fontSize='20px' color='#009393' p='1' borderRadius='5'>Products</Text>
// 			{isfetching?
// 				<Flex w='100%' direction={'column'} gap='2'>
// 					<Loading/>
// 					<Loading/>
// 				</Flex>
// 				:
// 				<>
// 					{products_data?.length === 0?
// 						<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
// 							<Text w='50%' textAlign='center'>We could not find products that match your search</Text>
// 						</Flex>
// 						:
// 						<Flex direction='column' p='1' gap='2'>
// 							{products_data?.slice(0,4).map((item)=>{
// 								return(
// 									<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/product/${item._id}`);setsearchbaractive(false);set_active(false)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
// 										<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../../Pro.png' alt='next'/>
// 										<Flex direction='column'>
// 											<Text fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.name_of_product}</Text>
// 											<Text fontSize='14px'>{item.distributed_by}</Text>
// 										</Flex>
// 									</Flex>
// 								)
// 							})}
// 						</Flex>
// 					}
// 				</>
// 			}
// 			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Distributors</Text>
// 			{isfetching?
// 				<Flex w='100%' direction={'column'} gap='2'>
// 					<Loading/>
// 					<Loading/>
// 				</Flex>
// 				:
// 				<>
// 				{distributors_data?.length === 0?
// 						<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
// 							<Text w='50%' textAlign='center'>We could not find distributors that match your search</Text>
// 						</Flex>
// 						:
// 						<Flex direction='column' p='1' gap='2'>
// 							{distributors_data?.slice(0,2).map((item)=>{
// 								return(
// 									<Flex key={item._id} position='relative' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='lg' onClick={(()=>{router.push(`/account/distributor/${item?._id}`)})}>
// 										<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.profile_photo_url == '' || !item?.profile_photo_url? '../../Pro.png' : item?.profile_photo_url} alt='next'/>
// 										<Flex direction='column'>
// 											<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.company_name}</Text>
// 											<Text fontSize='14px' w='90%' h='40px' overflow='hidden' whiteSpace='no-wrap'>{item.description}</Text>
// 										</Flex>
// 									</Flex>
// 								)
// 							})}
// 						</Flex>
// 					}
// 				</>
// 			}
// 			<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Manufacturers</Text>
// 			{isfetching?
// 				<Flex w='100%' direction={'column'} gap='2'>
// 					<Loading/>
// 					<Loading/>
// 				</Flex>
// 				:
// 				<>
// 				{manufacturers_data?.length === 0?
// 					<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
// 						<Text w='50%' textAlign='center'>We could not find manufacturers that match your search</Text>
// 					</Flex>
// 					:
// 					<Flex direction='column' p='1' gap='2'>
// 						{manufacturers_data?.slice(0,2).map((item)=>{
// 							return(
// 								<Flex key={item._id} position='relative' gap='2' align='center' bg='#fff' p='1' borderRadius='5' boxShadow='lg' onClick={(()=>{router.push(`/account/manufacturer/${item?._id}`)})}>
// 									<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.profile_photo_url == ''? '../../Pro.png' : item?.profile_photo_url} alt='next'/>
// 									<Flex direction='column'>
// 										<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{item.company_name}</Text>
// 										<Text fontSize='14px' w='90%' p='' h='40px' overflow='hidden' whiteSpace='no-wrap'>{item.description}</Text>
// 									</Flex>
// 								</Flex>
// 							)
// 						})}
// 					</Flex>
// 				}
// 				</>
// 			}
// 			<Flex justify='space-between' align='center' p='2'>
// 				<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Industries</Text>
// 				<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Industries/all')})} cursor='pointer'>see more</Text>
// 			</Flex>
// 			{isfetching?
// 				<Flex w='100%' direction={'column'} gap='2'>
// 					<Loading/>
// 					<Loading/>
// 				</Flex>
// 				:
// 				<>
// 				{industries_data?.length === 0?
// 					<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
// 						<Text w='50%' textAlign='center'>We could not find Industries that match your search</Text>
// 					</Flex>
// 					:
// 					<Flex direction='column' p='1' gap='2'>
// 						{industries_data?.slice(0,2).map((item)=>{
// 							return(
// 								<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/products/${item.title}`);setsearchbaractive(false);set_active(false)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
// 									<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.cover_image == ''?'../Pro.png':item?.cover_image} alt='next'/>
// 									<Flex direction='column'>
// 										<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
// 									</Flex>
// 								</Flex>
// 							)
// 						})}
// 					</Flex>
// 				}
// 				</>
// 			}
// 			<Flex justify='space-between' align='center' p='2'>
// 				<Text mt='2' fontSize='20px' color='#009393' p='1' borderRadius='5'>Technologies</Text>
// 				<Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push('/Technologies/all')})} cursor='pointer'>see more</Text>
// 			</Flex>
// 			{isfetching?
// 				<Flex w='100%' direction={'column'} gap='2'>
// 					<Loading/>
// 					<Loading/>
// 				</Flex>
// 				:
// 				<>
// 				{technologies_data?.length === 0?
// 					<Flex align='center' justify='center' bg='#eee' h='150px' p='3'>
// 						<Text w='50%' textAlign='center'>We could not find Technologies that match your search</Text>
// 					</Flex>
// 					:
// 					<Flex direction='column' p='1' gap='2'>
// 						{technologies_data?.slice(0,2).map((item)=>{
// 							return(
// 								<Flex key={item._id} position='relative' gap='2' align='center' onClick={(()=>{router.push(`/products/${item.title}`);setsearchbaractive(false);set_active(false)})} bg='#fff' p='1' borderRadius='5' boxShadow='lg'>
// 									<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={item?.cover_image == ''?'../Pro.png':item?.cover_image} alt='next'/>
// 									<Flex direction='column'>
// 										<Text mb='0' fontSize='16px' fontFamily='ClearSans-Bold'>{item.title}</Text>
										
// 									</Flex>
// 								</Flex>
// 							)
// 						})}
// 					</Flex>
// 				}
// 				</>
// 			}
// 		</Flex>