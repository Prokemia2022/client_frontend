import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Image,useToast,Link, Wrap} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../../../components/Header.js';
//api calls
import Get_Manufacturer from '../../api/auth/manufacturer/get_manufacturer.js'
import Get_Products from '../../api/product/get_products.js'
//error handlers
//styles
import styles from '../../../styles/Home.module.css';

export default function Manufacturer(){
	/**
	 * Manufacturer: Page that returns details about a specific supplier(manufacturer) to be viewed by a user.
     *      user refers to the type of account i.e manufacturer
     * Props:
     *      id (string): id of user in db.
	 *      payload(obj): data sent to fetch the particular user account.
     *       
	 */
	
	//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id

	const payload = {
		_id : id
	}

	const toast = useToast();
	//states

	const [manufacturer_data,set_manufacturer_data] = useState(''); //fetched user data
	const [products,set_products]=useState([]); //fetched products data
	const [industries,set_industries]=useState([]); //filtered industry data
	const [technologies,set_technologies]=useState([]); //filtered technology data
	
	//useEffects
	//functions

	//api calls
	const fetch_manufacturer_data=async(payload)=>{
		/**
		 * fetches manufacturer data.
         * 
         * props:
         *      payload(obj): data sent to server to fetch a specific user.
         *      email(string): email to be used to filter data tailored to the user.
         * 
         * calls the fetch products function.
         * Return:
         *       returns null
		 */
		await Get_Manufacturer(payload).then((response)=>{
			//console.log(response)
			set_manufacturer_data(response?.data)
			const email = response?.data?.email_of_company;
			fetch_products_data(email);
		}).catch((err)=>{
            //console.log(err.response.status);
			toast({
                title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
			router.back();
		}).finally(()=>{
            return ;
        })
	}
	const fetch_products_data=async(email)=>{
        /**
         * fetches products.
         * filters products listed by the user,
         * finds industries & technologies selected by the user.
         * Props:
         *      email(string): used to filter products listed by the req user account.
         */
		await Get_Products().then((response)=>{
			const res_data = response?.data;
			const data =  res_data.filter(v => v.verification_status && !v.suspension_status); //filters data that are verified and not suspended
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email.toLowerCase())); //filters data only listed by the req user.
			set_products(result)
			const industry_values = result.map(item=>item?.industry);
			set_industries([...new Set(industry_values)]);
			const technology_values = result.map(item=>item?.technology);
			set_technologies([...new Set(technology_values)]);
		}).catch((err)=>{
			//console.log(err)
			toast({
				title: '',
				description: `${err.data}`,
				status: 'error',
				isClosable: true,
			});
		}).finally(()=>{
            return ;
        })
	}
	//useEffects
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
			fetch_manufacturer_data(payload)
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Flex p='3' direction='column' gap='2' bg=''>
					<Flex gap='3' w='100%' align={'center'}>
						<Image 
								boxSize='100px' 
								objectFit={manufacturer_data?.profile_photo_url == '' || !manufacturer_data?.profile_photo_url? "contain":'cover'} 
								src={manufacturer_data?.profile_photo_url == '' || !manufacturer_data?.profile_photo_url? "../../Pro.png":manufacturer_data?.profile_photo_url} 
								alt='profile photo' 
								boxShadow='lg' 
								borderRadius='5'/>
						<Text fontSize='2rem' fontWeight='bold' color='#009393' h='100px' w='100%' p='2'>{manufacturer_data?.company_name}</Text>
					</Flex>
					<Flex direction='column' mt='2' gap='2'>
						{manufacturer_data?.description === ''? 
							null
							:
							<Text fontWeight='bold' fontSize='20px'>Description</Text>
						}
						{manufacturer_data?.description === ''? 
							null
							:
							<Text>{manufacturer_data?.description}</Text>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold'>Experts</Text>
						{manufacturer_data?.experts?.length === 0 ?
							<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' boxShadow='lg'>
								<Text>The user has not attached any experts.</Text>
							</Flex>
						:
						<Flex borderRadius='5' gap='3' direction='column' h='25vh' overflowY={'scroll'} className={styles.scrollbar}> 
							{manufacturer_data?.experts?.map((item)=>{
								return(
									<Flex bg='#eee' direction='column' key={item._id} p='2' borderRadius='5' boxShadow='lg' cursor='pointer' fontSize={'14px'}>
										<Text><span style={{fontWeight:"bold"}}>Name: </span>{item.name}</Text>
										<Text>{item?.description}</Text>
										<Link bg='#009393' p='1' w='120px' borderRadius='5' fontWeight='bold' color='#fff' href={`mailto: ${item?.email}`} isExternal>
											Email this expert
										</Link>
									</Flex>
								)
							})}
						</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='18px' fontWeight='bold'>Industries by this manufacturer</Text>
						{industries?.length === 0 ?
								<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
									<Text>Not specializing in any industries.</Text>
								</Flex>
								:
								<Flex gap='1' flexWrap={'wrap'}> 
									{industries?.map((item,id)=>{
										return(
											<Industry_Card_Item key={id} item={item}/>
										)
									})}
								</Flex>
							}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='18px' fontWeight='bold'>Technologies by this manufacturer</Text>
						{technologies?.length === 0 ?
								<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
									<Text>Not specializing in any technologies.</Text>
								</Flex>
								:
								<Flex gap='1' flexWrap={'wrap'}> 
									{technologies?.map((item,id)=>{
										return(
											<Technology_Card_Item key={id} item={item}/>
										)
									})}
								</Flex>
							}
					</Flex>
					<Text fontSize='18px' fontWeight='bold'>Products</Text>
					{products?.length === 0?
						<Flex align='center' justify='center' bg='#eee' h='40vh' p='3' borderRadius='5' boxShadow='lg'>
							<Text w='50%' textAlign='center'>No products have been listed.</Text>
						</Flex>
						:
						<Flex direction='column' h='50vh' overflowY='scroll' gap='2' className={styles.scrollbar}>
							{products?.map((item)=>{
								return(
									<Product_Item item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
		</Flex>
	)
}

const Product_Item=({item})=>{
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


const Industry_Card_Item=({item})=>{
	//console.log(item)
	let link = item?item:'undefined';
	return(
		<Link bg='#eee' p='1' borderRadius='5' fontWeight='bold' color='#009393' href={`/products/${link}`}>{link == 'undefined'?null:link}</Link>
	)
}

const Technology_Card_Item=({item})=>{
	let link = item?item:'undefined';
	return(
		<Link bg='#eee' p='1' borderRadius='5' fontWeight='bold' color='#009393' href={`/products/${link}`}>{link == 'undefined'?null:link}</Link>
	)
}