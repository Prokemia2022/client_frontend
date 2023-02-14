import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Button,Image,useToast,Link} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../../../components/Header.js'
//import Product from '../../../components/Product.js';
//api calls
import Get_Manufacturer from '../../api/auth/manufacturer/get_manufacturer.js'
import Get_Products from '../../api/product/get_products.js'
//icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';

export default function Manufacturer(){
		//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id

	const payload = {
		_id : id
	}

	const toast = useToast();
	//states

	const [manufacturer_data,set_manufacturer_data] = useState('')
	const [recents,set_recents]=useState(manufacturer_data?.recents)
	const [products,set_products]=useState([])
	//useEffects
	//functions
	//api calls
	const get_manufacturer_data=async(payload)=>{
		await Get_Manufacturer(payload).then((response)=>{
			//console.log(response)
			set_manufacturer_data(response?.data)
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
			const data = response?.data
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email))
			set_products(result)
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
			get_manufacturer_data(payload)
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Flex direction='column' p='2'>
				<Flex p='1' direction='column' gap='2'>
					<Text fontSize='24px' fontWeight='bold'>{manufacturer_data?.company_name}</Text>
					<Flex direction='column'>
						{manufacturer_data?.description === ''? 
							<Flex align='center' justify='center' bg='#eee' h='20vh' p='3' borderRadius='5' boxShadow='lg'>
								<Text>The User has not added a bio</Text>
							</Flex>
							:
							<Flex mt='2' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
								<Text>{manufacturer_data?.description}</Text>
							</Flex>
						}
					</Flex>
					{products?.length === 0?
						<Flex align='center' justify='center' bg='#eee' h='40vh' p='3' borderRadius='5' boxShadow='lg'>
							<Text w='50%' textAlign='center'>No products have been listed under by this account.</Text>
						</Flex>
						:
						<Flex direction='column' gap='2' h='50vh' overflowY='scroll'>
							<Text fontWeight='bold'>Products</Text>
							{products?.map((item)=>{
								return(
									<Flex key={item?._id} position='relative' gap='2' align='center' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${item?._id}`)})}>
										<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src='../../Pro.png' alt='next'/>
										<Flex direction='column'>
											<Text color='#009393' fontSize='16px' fontFamily='ClearSans-Bold'>{item?.name_of_product}</Text>
											<Text fontSize='14px'>distributed by: {item?.distributed_by}</Text>
										</Flex>
									</Flex>
								)
							})}
						</Flex>
					}
					<Flex p='' gap='2'>
						<Link w='100vw' p='2' borderRadius='5' textAlign='center' bg='#009393' color='#fff' href={`mailto: ${manufacturer_data?.email_of_company}`} isExternal>
		                    Contact Us
		                </Link>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

const ProductItem=({item,})=>{
	const router = useRouter();
	return(
		<Flex position='relative' gap='2' align='center' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${item._id}`)})}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={'../../Pro.png'} alt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold'>{item.name_of_product}</Text>
				<Text fontSize='14px'>distributed by: {item.distributed_by}</Text>
			</Flex>
		</Flex>
	)
}