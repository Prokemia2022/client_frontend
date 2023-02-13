import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Get_Products from '../api/product/get_products.js'
import Feature_Product from '../api/product/feature_product.js'
import Un_Feature_Product from '../api/product/un_feature_product.js'
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Inventory({manufacturer_data}){
	const router = useRouter();
	const [products_data,set_products_data]=useState([]);
	const [searchquery,set_searchquery]=useState('')

	useEffect(()=>{
		get_Data()
		////console.log(manufacturer_data)
	},[searchquery])


	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			//console.log(response.data)
			let data = response.data
			const result_data = data.filter((item)=> item.verification_status && item.email_of_lister?.includes(manufacturer_data?.email_of_company))
			const result = result_data.filter((item)=> item.name_of_product?.toLowerCase().includes(searchquery.toLowerCase()) || item.industry?.toLowerCase().includes(searchquery.toLowerCase()) || item.technology?.toLowerCase().includes(searchquery.toLowerCase()))
			//console.log(result)
			set_products_data(result)
		})
	}
	return(
		<Flex direction='column' gap='3' p='2' w='100%' overflowY='scroll' h='100vh'>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Inventory</Text>
			<Flex gap='2'>
				<Select w='150px' placeholder='sort'>
					<option>A-Z</option>
					<option>Z-A</option>
				</Select>
				<Input placeholder='search products by name, industry' onChange={((e)=>{set_searchquery(e.target.value)})}/>
			</Flex>
			{products_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
					<Text textAlign='center' fontSize='32px' fontWeight='bold' color='gray'>You have not listed any products<br/>or<br/>Your product is awaiting approval</Text>
				</Flex>
			:
				<>
				{products_data?.map((product)=>{
					return(
						<div key={product?._id} style={{margin:'5px'}}>
							<Item product={product} router={router} manufacturer_data={manufacturer_data}/>
						</div>
					)
				})}
				</>
			}
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

export default Inventory;

const Item=({router,product,manufacturer_data})=>{
	const toast = useToast()

	const payload = {
		_id : product._id
	}
	const handle_feature_product=async()=>{
		if (manufacturer_data?.subscription !== true){
			toast({
				title: 'Could not feature product.',
				description: `you are not subscribed to a premium plan.`,
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			await Feature_Product(payload).then(()=>{
				toast({
					title: '',
					description: `${product?.name_of_product} has been featured`,
					status: 'info',
					isClosable: true,
				});
			}).catch((err)=>{
				toast({
					title: '',
					description: 'could not feature this product',
					status: 'error',
					isClosable: true,
				});
			})	
		}
		
	}
	const handle_un_feature_product=async()=>{
		if (manufacturer_data?.subscription !== true){
			toast({
				title: 'Could not un-feature product.',
				description: `you are not subscribed to a premium plan.`,
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			await Un_Feature_Product(payload).then(()=>{
				toast({
					title: '',
					description: `${product?.name_of_product} has been removed from feature list`,
					status: 'info',
					isClosable: true,
				});
			}).catch((err)=>{
				toast({
					title: '',
					description: 'could not edit this product',
					status: 'error',
					isClosable: true,
				});
			})
		}
	}
	return(
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#eee' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
			<Flex direction='column' position='relative' p='2'>
				<Text color='#009393' fontWeight='bold' fontSize="24px">{product?.name_of_product}</Text>
				<Flex gap='2'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{product?.industry}</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{product?.technology}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' justify='space-around' p='2' textAlign='center'>
				{product?.sponsored === true ? 
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' onClick={handle_un_feature_product} align='center'>
						<Text fontWeight='bold' >Un-Feature</Text>
						<HighlightOffIcon/>
					</Flex>
					:
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' onClick={handle_feature_product} align='center'>
						<Text fontWeight='bold' >Feature</Text>
						<VerifiedIcon style={{color:'gold'}}/>
					</Flex>
				}
				<Text fontWeight='bold' color='#009393' bg='#fff' p='1' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/edit_config/${product?._id}`)})}>View</Text>
			</Flex>
		</Flex>
	)
}