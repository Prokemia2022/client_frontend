import React,{useState,useEffect} from 'react'
import {Flex,Image,Button,Text,Input,Select,Circle,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router';
import Get_Products from '../../pages/api/product/get_products.js';
import Feature_Product from '../../pages/api/product/feature_product.js'
import Un_Feature_Product from '../../pages/api/product/un_feature_product.js'
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Supplier_Inventory({manufacturer_data,distributor_data,acc_type}){
    /**
     * Supplier (distributor, manufacturer) page to view, manage existing inventory.
     * Tailored to support each type of account user, i.e each type of account can access the inventory.
     * Props:
     *      manufacturer_data (obj): Contains the data for current user.
     *      distributor_data (obj): Contains the data for current user.
     *      acc_type (string): shows the type of account of current user.
     *      current_account_email (string): email for the current user and account.Used to filter products listed by this email.
     *      is_subscribed (Boolean): Shows whether the user's account is subscribed to a paid plan or not.
     */

	const router = useRouter(); //handles routing of pages
    const toast = useToast();
    let current_account_email = '';
	const [products_data,set_products_data]=useState([]); //stores fetched products.
	const [searchquery,set_searchquery]=useState(''); //stores value for search query
	const [sort,set_sort]=useState('desc'); //stores sorting value
	const [is_subscribed, set_is_subscribed]=useState(true); //handles the loading state of data
    const [is_fetching, set_isfetching]=useState(false); //handles the fetching state of products data
    const [changed_data,set_changed_data]=useState(false); //handles the status of data to keep track if data changes.

	useEffect(()=>{
        if (acc_type === 'manufacturer') {
            set_is_subscribed(manufacturer_data?.subscription);
            fetch_products_data(current_account_email = manufacturer_data?.email_of_company);
        }else if (acc_type === 'distributor'){
            set_is_subscribed(distributor_data?.subscription);
            fetch_products_data(current_account_email = distributor_data?.email_of_company);
        }
	},[sort,searchquery,acc_type,changed_data])


	const fetch_products_data=async(current_account_email)=>{
        /**
         * Fetches data from get all products api, sorts and filters fetched data.
         * Props:
         *      data (json): destructured data from the response.
         *      result_data (json): first level of filtered data (consists of only verified and products listed by the current user.)
         *      result (json): second level of filtered data (consists of products that filtered based on parameters from searchquery).
         *      current_account_email (string): email to use in filtering products.
         *      sorted_result (json): sorted data in either ascending or descending order on name of product.
         * 
         * Finally :
         *      sets the state of is fetching to false.
         */
        set_isfetching(true);
		await Get_Products().then((response)=>{
			let data = response.data
			const result_data = data.filter((item)=> item.verification_status && item.email_of_lister?.includes(current_account_email));
			const result = result_data.filter((item)=> 	item.name_of_product?.toLowerCase().includes(searchquery.toLowerCase()) ||
														item.industry?.toLowerCase().includes(searchquery.toLowerCase()) ||
														item.technology?.toLowerCase().includes(searchquery.toLowerCase()));

			if (sort == 'desc'){
				const sorted_result = result.sort((a, b) => a.name_of_product.localeCompare(b.name_of_product))	
				set_products_data(sorted_result);
			}else if (sort == 'asc'){
				const sorted_result = result.sort((a, b) => b.name_of_product.localeCompare(a.name_of_product))
				set_products_data(sorted_result);
			}
		}).catch((err)=>{
			console.error(err);
		}).finally(()=>{
            set_isfetching(false);
		});
	}
	return(
		<Flex direction='column' gap='3' p='2' w='100%' h='100vh'>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Inventory</Text>
			<Flex gap='2'>
				<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
					<option value='desc'>A - Z</option>
					<option value='asc'>Z - A</option>
				</Select>
				<Input placeholder='search products by name, industry' value={searchquery} type='text' onChange={((e)=>{set_searchquery(e.target.value)})}/>
			</Flex>
			{is_fetching? 
				<Flex direction={'column'} h='100vh'>
					<Item_Loading/>
					<Item_Loading/>
				</Flex>
				 :
				<>
					{products_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
							<Text textAlign='center' fontSize='24px' color='gray'>You have not listed any products<br/>or<br/>products are awaiting review</Text>
						</Flex>
					:
						<Flex direction={'column'} h='100vh' overflowY='scroll'>
						{products_data?.map((product)=>{
							return(
								<div key={product?._id} style={{margin:'5px'}}>
									<Product_Card_Item 
                                                        set_changed_data={set_changed_data}
                                                        changed_data={changed_data} 
                                                        product={product} 
                                                        router={router} 
                                                        toast={toast} 
                                                        is_subscribed={is_subscribed}/>
								</div>
							)
						})}
						</Flex>
					}
				</>
			}
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

const Product_Card_Item=({router,product,manufacturer_data,toast,is_subscribed,set_changed_data,changed_data})=>{
    /**
     * Product card component
     * Props:
     *      product (json): contains data to each product.
     *      router : handles the routing function.
     *      toast: handles alert boxes on ui.
     *      is_subscribed (Boolean): Shows the subscription status of the user's account.
     */
	
	const payload = {
		_id : product._id
	}
	const feature_product_handler=async()=>{
		if (!is_subscribed){
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
			}).finally(()=>{
                set_changed_data(!changed_data);
            });	
		}		
	}
	const handle_un_feature_product=async()=>{
		if (!is_subscribed){
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
					description: `${product?.name_of_product} has been removed from featured list`,
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
			}).finally(()=>{
                set_changed_data(!changed_data);
            })
		}
	}
	return(
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#fff' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1' position='relative'>
			<Flex direction='column' p='2' w='100%'>
				<Text color='#009393' fontWeight='bold' fontSize="24px">{product?.name_of_product}</Text>
				<Flex gap='1' fontSize={'14px'} color='grey' direction="column">
					<Flex >
						<Text fontWeight={'bold'}>Industry:</Text>
						<Text color='#009393' cursor='pointer' textDecoration='underline' onClick={(()=>{router.push(`/products/${product?.industry}`)})}> {product?.industry}</Text>
					</Flex>
					<Flex>
						<Text fontWeight={'bold'}>Technology:</Text>
						<Text color='#009393' cursor='pointer' textDecoration='underline' onClick={(()=>{router.push(`/products/${product?.technology}`)})}>{product?.technology}</Text>
					</Flex>
				</Flex>
				{product?.sponsored === true ? <VerifiedIcon style={{color:'gold',position:'absolute',top:'10px',right:'15px'}}/> : null}
				<Flex gap='2' mt='2' mb='2' w='100%'>
					<Text w='75px' align='center' fontWeight='bold' color='#000' bg='#eee' p='2' borderRadius='5' cursor='pointer' onClick={(()=>{router.push(`/product/view_product/${product?._id}`)})}>View</Text>
                    <Text w='75px' align='center' fontWeight='bold' color='#000' bg='#eee' p='2' borderRadius='5' cursor='pointer' onClick={(()=>{router.push(`/product/edit_config/${product?._id}`)})}>Edit</Text>
                </Flex>
                {product?.sponsored ? 
                    <Flex bg='#eee' p='2' gap='2' borderRadius='5' cursor='pointer' onClick={handle_un_feature_product} align='center'>
                        <Text fontWeight='bold' >Remove from featured list</Text>
                        <HighlightOffIcon/>
                    </Flex>
                    :
                    <Flex bg='#eee' p='2' borderRadius='5' cursor='pointer' onClick={feature_product_handler} align='center'>
                        <Text fontWeight='bold' >Feature this product</Text>
                        
                    </Flex>
                }
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

const Error_Handler=()=>{
    return(
        <Text>Error While fetching products</Text>
    )
}