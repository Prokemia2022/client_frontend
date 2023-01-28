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

	const [manufacturer_data,set_manufacturer_data] = useState('')
	const [recents,set_recents]=useState(manufacturer_data?.recents)
	const [products,set_products]=useState([])
	//useEffects
	//functions
	//api calls
	const get_manufacturer_data=async(payload)=>{
		await Get_Manufacturer(payload).then((response)=>{
			console.log(response)
			set_manufacturer_data(response?.data)
			const email = response?.data?.email_of_company
			get_products_data(email)
		}).catch((err)=>{
			//console.log(err)
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
			console.log(result)
		}).catch((err)=>{
			//console.log(err)
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
					<Flex gap='2' p='2'>
						{manufacturer_data?.profile_photo_url == '' || !manufacturer_data?.profile_photo_url? 
							<Flex gap='2' >
								<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
							</Flex>
						: 
							<Flex gap='2' >
								<Image borderRadius='5' boxSize='150px' src={manufacturer_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
					</Flex>
					<Flex direction='column' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
							<Text>Email: {manufacturer_data?.email_of_company}</Text>
							<Text>Mobile:{manufacturer_data?.mobile_of_company}</Text>
							<Text>Address: {manufacturer_data?.address_of_company}</Text>
					</Flex>
					<Flex direction='column'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Description</Text>
						{manufacturer_data?.description === ''? 
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not created a bio/description</Text>
							</Flex>
							:
							<Flex mt='2' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
								<Text>{manufacturer_data?.description}</Text>
							</Flex>
						}
					</Flex>
					{products?.length === 0?
						<Flex align='center' justify='center' bg='#eee' h='10vh' p='3'>
							<Text w='50%' textAlign='center'>This Account has not listed any product yet</Text>
						</Flex>
						:
						<Flex direction='column' gap='2'>
							{products?.map((item)=>{
								return(
									<ProductItem key={item?._id} item={item}/>
								)
							})}
						</Flex>
					}
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
						{manufacturer_data?.experts?.length === 0 ?
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not added experts to this profile.</Text>
							</Flex>
						:
						<Flex m='1' p='' borderRadius='5' gap='3' direction='column'> 
							{manufacturer_data?.experts?.map((item)=>{
								return(
									<Flex key={item._id} direction='' bg='#eee' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
										<Flex direction='column'>
											<Text fontWeight='bold'>Name: {item.name}</Text>
											<Text >Email: {item.email}</Text>
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
					<Flex p='2' gap='2'>
						<Button flex='1' bg='#009393' color='#fff'>
		                    <Link href={`mailto: ${manufacturer_data?.email_of_company}`} isExternal>Email Distributor</Link>
		                </Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Distributor;

const ProductItem=({item,})=>{
	const router = useRouter();
	return(
		<Flex position='relative' gap='2' align='center' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${item._id}`)})}>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={'../../Pro.png'} lt='next'/>
			<Flex direction='column'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold'>{item.name_of_product}</Text>
				<Text fontSize='14px'>distributed by: {item.distributed_by}</Text>
			</Flex>
		</Flex>
	)
}