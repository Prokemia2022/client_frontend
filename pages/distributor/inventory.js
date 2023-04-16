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

function Inventory({distributor_data}){
	const router = useRouter();
	const [products_data,set_products_data]=useState([]);
	const [edit,set_edit]=useState(false);
	const [searchquery,set_searchquery]=useState('');
	const [sort,set_sort]=useState('desc');
	const [is_loading, set_isloading]=useState(true);

	useEffect(()=>{
		get_Data();
	},[sort,searchquery])

	const get_Data=async()=>{
		set_isloading(true);
		await Get_Products().then((response)=>{
			//console.log(response.data)
			let data = response.data;
			const result_data = data.filter((item)=> item.verification_status && item.email_of_lister?.includes(distributor_data?.email_of_company));
			const result = result_data.filter((item)=> item.name_of_product?.toLowerCase().includes(searchquery.toLowerCase()) ||
													   item.industry?.toLowerCase().includes(searchquery.toLowerCase()) ||
													   item.technology?.toLowerCase().includes(searchquery.toLowerCase()));
			
			if (sort == 'desc'){
				const sorted_result = result.sort((a, b) => a.name_of_product.localeCompare(b.name_of_product))	
				set_products_data(sorted_result)
			}else{
				const sorted_result = result.sort((a, b) => b.name_of_product.localeCompare(a.name_of_product))
				set_products_data(sorted_result)
			}
		}).then(()=>{
			set_isloading(false);
		}).catch((err)=>{
			throw new Error("Fetching error");
			console.error(err)
		});
	}
	return(
		<Flex direction='column' gap='3' p='2' w='100%' overflowY='scroll' h='100vh'>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Inventory</Text>
			<Flex gap='2'>
				<Select w='150px' placeholder='sort' onChange={((e)=>{set_sort(e.target.value)})}>
					<option value='desc'>A - Z</option>
					<option value='asc'>Z - A</option>
				</Select>
				<Input placeholder='search products by name, industry' onChange={((e)=>{set_searchquery(e.target.value)})}/>
			</Flex>
			{is_loading? 
				<>
					<Item_Loading/>
					<Item_Loading/>
				</>
				 :
				<>
					{products_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
							<Text textAlign='center' fontSize='24px' color='gray'>You have not listed any products<br/>or<br/>products are awaiting review</Text>
						</Flex>
					:
						<>
						{products_data?.map((product)=>{
							return(
								<div key={product?._id} style={{margin:'5px'}}>
									<Item product={product} router={router} distributor_data={distributor_data}/>
								</div>
							)
						})}
						</>
					}
				</>
			}
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

export default Inventory;

const Item=({router,product,distributor_data})=>{
	const toast = useToast()

	const payload = {
		_id : product._id
	}
	const handle_feature_product=async()=>{
		if (distributor_data?.subscription !== true){
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
		if (distributor_data?.subscription !== true){
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
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#eee' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1' position='relative'>
			<Flex direction='column' p='2'>
				<Text color='#009393' fontWeight='bold' fontSize="24px">{product?.name_of_product}</Text>
				<Flex gap='2'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{product?.industry}</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{product?.technology}</Text>
				</Flex>
				{product?.sponsored === true ? <VerifiedIcon style={{color:'gold',position:'absolute',top:'10px',right:'15px'}}/> : null}
				<Flex direction='' justify='space-between' gap='2' mt='2'>
					<Text fontWeight='bold' color='#009393' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/edit_config/${product?._id}`)})}>View</Text>
					{product?.sponsored ? 
						<Flex bg='#fff' p='1' gap='2' borderRadius='5' cursor='pointer' boxShadow='lg' onClick={handle_un_feature_product} align='center'>
							<Text fontWeight='bold' >Remove from featured list</Text>
							<HighlightOffIcon/>
						</Flex>
						:
						<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' onClick={handle_feature_product} align='center'>
							<Text fontWeight='bold' >Feature this product</Text>
							
						</Flex>
					}
				</Flex>
			</Flex>
		</Flex>
	)
} 

const Item_Loading=()=>{
	return(
		<Flex bg='#fff' direction='column' borderRadius='5px' boxShadow='lg' justify='space-between' position='relative' p='2' gap='2'>
			<Flex bg='#eee' w='80%' h='25px' borderRadius='5px'/>
			<Flex gap='2'>
				<Flex bg='#eee' w='50px' h='25px' borderRadius='5px'/>
				<Flex bg='#eee' w='120px' h='25px' borderRadius='5px'/>
			</Flex>
			<Flex gap='2'>
				<Flex bg='#eee' w='50px' h='25px' borderRadius='5px'/>
				<Flex bg='#eee' w='120px' h='25px' borderRadius='5px'/>
			</Flex>
			<Flex bg='#eee' position='absolute' top='10px' right='15px' w='25px' h='25px' borderRadius='5px'/>
			<Flex gap='2'>
				<Flex bg='#eee' w='120px' h='35px' borderRadius='5px'/>
				<Flex bg='#eee' w='120px' h='35px' borderRadius='5px'/>
			</Flex>
		</Flex>
	)
}