import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Button,Image,useToast,Link} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../../../components/Header.js'
//import Product from '../../../components/Product.js';
//api calls
import Get_Distributor from '../../api/auth/distributor/get_distributor.js'
import Get_Products from '../../api/product/get_products.js'
//icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';

function Distributor(){
		//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id

	const payload = {
		_id : id
	}

	const toast = useToast();
	//states

	const [distributor_data,set_distributor_data] = useState('')
	const [recents,set_recents]=useState(distributor_data?.recents)
	const [products,set_products]=useState([]);
	const [industries,set_industries]=useState([])
	//useEffects
	//functions
	//api calls
	const get_distributor_data=async(payload)=>{
		await Get_Distributor(payload).then((response)=>{
			//console.log(response)
			set_distributor_data(response?.data)
			const email = response?.data?.email_of_company
			get_products_data(email)
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: `${err}`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	const get_products_data=async(email)=>{
		await Get_Products().then((response)=>{
			const res_data = response?.data
			const data =  res_data.filter(v => v.verification_status)
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email.toLowerCase()))
			set_products(result)
			const industry_values = result.map(item=>item?.industry)
			//console.log([...new Set(industry_values)])
			set_industries([...new Set(industry_values)])
			//console.log(result)
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: `${err.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	useEffect(()=>{
		if (!payload || id === undefined){
			toast({
				title: '',
				description: `...broken link,we are redirecting you`,
				status: 'info',
				isClosable: true,
			});
			router.back()
		}else{
			get_distributor_data(payload)
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Flex direction='column' p='2'>
				<Flex p='1' direction='column' gap='2'>
					<Flex gap='3' w='100%'>
						{distributor_data?.profile_photo_url == ''? 
							<LocationCityIcon style={{fontSize:'150px',padding:'10px'}}/> 
						: 
							<Image boxSize='100px' src={distributor_data?.profile_photo_url} alt='profile photo' boxShadow='lg' borderRadius='5'/>
						}
						<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
							<Text fontSize='32px' fontWeight='bold' color='#009393'>{distributor_data?.company_name}</Text>
						</Flex>
					</Flex>
					<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
						<Text>Email: <Link fontWeight='bold' color='#009393' href={`mailto: ${distributor_data?.email_of_company}`} isExternal>
		                    {distributor_data?.email_of_company}
		                </Link></Text>
						<Text>Mobile: <span style={{fontWeight:'bold'}}>{distributor_data?.mobile_of_company}</span></Text>	
						<Text>Address: <span style={{fontWeight:'bold'}}>{distributor_data?.address_of_company}</span></Text>
					</Flex>
					<Flex gap='2'>
						<Link w='100vw' p='2' borderRadius='5' textAlign='center' bg='#009393' color='#fff' href={`mailto: ${distributor_data?.email_of_company}`} isExternal>
		                    Contact Us
		                </Link>
					</Flex>
					<Flex direction='column'>
						<Text fontWeight='bold' fontSize='20px'>Description</Text>
						{distributor_data?.description === ''? 
							<Flex align='center' justify='center' bg='#eee' h='20vh' p='3' borderRadius='5' boxShadow='lg'>
								<Text>The User has not added a bio</Text>
							</Flex>
							:
							<Flex mt='2' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
								<Text>{distributor_data?.description}</Text>
							</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
						{distributor_data?.experts?.length === 0 ?
							<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' boxShadow='lg'>
								<Text>The User has not attached experts to this account.</Text>
							</Flex>
						:
						<Flex m='1' p='2' borderRadius='5' bg='#eee' gap='3' direction='column' boxShadow='lg'> 
							{distributor_data?.experts?.map((item)=>{
								return(
									<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
										<Flex direction='column'>
											<Text fontWeight='bold'>Name: {item.name}</Text>
											<Text>Email: <Link fontWeight='bold' color='#009393' href={`mailto: ${item?.email}`} isExternal>
		                    {item?.email}
		                </Link></Text>
											<Text>Mobile: {item.mobile}</Text>
											<Text>Role: {item.role}</Text>
											<Text>Description: {item.description}</Text>
										</Flex>
									</Flex>
								)
							})}
						</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='18px' fontWeight='bold' borderBottom='1px solid #000'>Industries by this Manufacturer</Text>
						{industries?.length === 0 ?
								<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
									<Text>The User has not seletected an industry to specialize in yet</Text>
								</Flex>
								:
								<Flex direction='column'> 
								{industries?.map((item)=>{
									return(
										<Industry key={item.id} item={item}/>
									)
								})}
							</Flex>
							}
					</Flex>
					{products?.length === 0?
						<Flex align='center' justify='center' bg='#eee' h='40vh' p='3' borderRadius='5' boxShadow='lg'>
							<Text w='50%' textAlign='center'>No products have been listed under by this account.</Text>
						</Flex>
						:
						<Flex direction='column' h='50vh' overflowY='scroll'>
							<Text fontWeight='bold' fontSize='24px'>Products</Text>
							{products?.map((item)=>{
								return(
									<Flex key={item?._id} position='relative' gap='2' bg='#eee' m='2' align='center' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${item?._id}`)})}>
										<Image  boxSize='100px' objectFit='cover' src='../../Pro.png' alt='next'/>
										<Flex direction='column' p='2' gap='2'>
											<Text color='#009393' fontSize='20px' fontFamily='ClearSans-Bold'>{item?.name_of_product}</Text>
											<Text fontSize='16px'>{item?.industry}</Text>
										</Flex>
									</Flex>
								)
							})}
						</Flex>
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Distributor;

const ProductItem=({item,})=>{
	const router = useRouter();
	return(
		<Flex flex='1' gap='2' align='center' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${item._id}`)})}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../Pro.png' alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold'>{item.name_of_product}</Text>
				<Text fontSize='14px'>distributed by: {item.distributed_by}</Text>
			</Flex>
		</Flex>
	)
}

const Industry=({item})=>{
	const router = useRouter()
	return(
		<Flex flex='1' borderRadius='5' mb='1' position='relative' bg='#eee' p='2'>
			<Text fontSize='18px' fontFamily='ClearSans-Bold' color='#009393' onClick={(()=>{router.push(`/products/${item}`)})}>{item}</Text>
		</Flex>
	)
}