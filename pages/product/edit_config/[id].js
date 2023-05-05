//modules import
import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//components import
import Header from '../../../components/Header';
import Edit_Files from './edit_files.js'
import Loading from '../../../components/Loading';
//api calls
import Get_Product from '../../api/product/get_product.js';
import Edit_Product from '../../api/product/edit_product.js';
import Get_Industries from '../../api/control/get_industries';
import Get_Technologies from '../../api/control/get_technologies';
import Get_Distributors from '../../api/auth/distributor/get_distributors';
import Get_Manufacturers from '../../api/auth/manufacturer/get_manufacturers';
//utils
//utils
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//styles
import styles from '../../../styles/Home.module.css';

export default function Edit_Product_Details(){
	/**
	 * Edit_Product_Details: Form that enables the editing of an existing product.
	 */
	//modules
	const toast = useToast();
    const router = useRouter();
    const cookies = new Cookies();
	//utils
	const id = router.query;
	const product_payload = {
		_id : id?.id
	}
	//apis
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		})
	}
	const get_Distributors_Data=async()=>{
		/** api call to fetch distributors data*/
		await Get_Distributors().then((response)=>{
			const data = response?.data;
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status); //filters users that are only verified and not suspended
			let filtered_data = result_data.filter((item) =>item?.company_name?.toLowerCase().includes(distributed_by?.toLowerCase()))
			//console.log(filtered_data.length)
			set_distributors_data(filtered_data); //
			if (filtered_data.length === 0) {
				set_distributed_by_suggestion_query_modal(false);
			}
		})
	}
	
	const get_Manufacturers_Data=async()=>{
		/** api call to fetch manufacturers data*/
		await Get_Manufacturers().then((response)=>{
			const data = response?.data;
			const result_data = data.filter((item)=> item?.verification_status && !item?.suspension_status); //filters users that are only verified and not suspended
			let filtered_data = result_data.filter((item) =>item?.company_name?.toLowerCase().includes(manufactured_by?.toLowerCase()))
			//console.log(filtered_data.length)
			set_manufacturers_data(filtered_data);
			if (filtered_data.length === 0) {
				set_manufactured_by_suggestion_query_modal(false);
			}
		})
	}
	const get_Product_Data=async()=>{
		await Get_Product(product_payload).then((response)=>{
			set_product_data(response.data)
			console.log(response.data)
		})
	}

	//usestates:
	const [distributed_by_suggestion_query_modal,set_distributed_by_suggestion_query_modal]=useState(false);
	const [manufactured_by_suggestion_query_modal,set_manufactured_by_suggestion_query_modal]=useState(false);
	
	//data
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);
	const [distributors_data,set_distributors_data]=useState([]);
	const [manufacturers_data,set_manufacturers_data]=useState([]);
	const [product_data,set_product_data]=useState('');
	

	//states
	const [is_submitting,set_is_submitting]=useState(false)
	const [isfileupload,set_isfileupload]=useState(false);
	const [is_editfiles,set_iseditfiles]=useState(false)
	
	//payload 
		const [name_of_product,set_name_of_product]=useState(product_data?.name_of_product);
		//manufacturer information
		const [manufactured_by,set_manufactured_by]=useState(product_data?.manufactured_by);
		//seller information
		const [distributed_by,set_distributed_by]=useState(product_data?.distributed_by);
		//product information
		const [description_of_product,set_description_of_product]=useState(product_data?.description_of_product);
		const [chemical_name,set_chemical_name]=useState(product_data?.chemical_name);
		const [product_function,set_product_function]=useState(product_data?.product_function);
		const [brand,set_brand]=useState(product_data?.brand);
		const [features_of_product,set_features_of_product]=useState(product_data?.features_of_product);
		const [application_of_product,set_application_of_product]=useState(product_data?.application_of_product);
		const [packaging_of_product,set_packaging_of_product]=useState(product_data?.packaging_of_product);
		const [storage_of_product,set_storage_of_product]=useState(product_data?.storage_of_product);
		//category_of_product
		const [industry,set_industry]=useState(product_data?.industry);
		const [technology,set_technology]=useState(product_data?.technology);
		//website_link	
		const [website_link,set_website_link]=useState(product_data?.website_link_to_Seller)

		const payload = {
			_id: product_data?._id,
			name_of_product,
			manufactured_by,
			distributed_by,
			website_link_to_Seller: website_link,
			description_of_product,
			chemical_name,
			function : product_function,
			brand,
			features_of_product,
			application_of_product,
			packaging_of_product,
			storage_of_product,
			industry,
			technology
		}

	//useEffects
	useEffect(()=>{
		if (!payload._id == undefined || id.id === undefined){
			toast({
			  title: 'This link is broken,',
			  description: 'we are taking you back',
			  status: 'info',
			  isClosable: true,
			});
			router.back()
		  }else{
			get_Industries_Data()
			get_Technology_Data()
			get_Product_Data()
		  }
	},[])
	useEffect(()=>{
		get_Distributors_Data()
	},[distributed_by])
	useEffect(()=>{
		get_Manufacturers_Data()
	},[manufactured_by])
	
	const Handle_Edit_Product=async()=>{
		/**
		 * Handle_Edit_Product: sends edited product payload to server to save product to db.
		 * Props:
		 * 		payload(obj): json data containing product details.
		*/
		set_is_submitting(true);
		console.log(payload);
		const response = await Edit_Product(payload).then((res)=>{
			/**
				sends a payload data to server to edit product.
				payload (object): json obj containing information for the product.

				Return:
					alerts user whether function runs successfully or not.
				catch:
					alerts user when function fails
			*/
				toast({
					title: '',
					position: 'top-left',
					variant:"subtle",
					description: `${payload.name_of_product} has been edited successfully`,
					status: 'success',
					isClosable: true,
				});
				const response = {
					_id : product_data?._id,
					status: 200
				}
				router.back()
				console.log(response)
				return response;
			}).catch((err)=>{
				//console.log(err)
				toast({
					position: 'top-left',
					variant:"subtle",
					title: 'could not edit product',
					description: err.response.data,
					status: 'error',
					isClosable: true,
				})
				const response = {
					status: err.response.status
				}
				return response;
			}).finally(()=>{
				set_is_submitting(false);
			})
		console.log(response)
		return response;
	}

	return(
		<Flex direction='column'>
			<Header />
			{is_editfiles?
				<Edit_Files product_data={product_data} payload={payload} set_iseditfiles={set_iseditfiles}/>
			:
				<Flex className={styles.productbody} direction='column' p='3' gap='3'>
					<Text fontSize='32px' fontWeight='bold'>Edit Product</Text>
					<Flex direction='column'>
						<Text>Name/Title of product</Text>
						<Input type='text' value={name_of_product} placeholder={product_data.name_of_product} variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Brand Name</Text>
						<Input type='text' value={brand} placeholder={product_data.brand} variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Chemical Family</Text>
						<Input type='text' value={chemical_name} placeholder={product_data.chemical_name} variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Description</Text>
						<Textarea type='text' value={description_of_product} placeholder={product_data.description_of_product} variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
					</Flex>
					<Flex gap='2'>
						<Flex direction='column' flex='1'>
							<Text>Manufactured by:</Text>
							<Input type='text' value={manufactured_by} placeholder={product_data.manufactured_by} variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
						</Flex>
						<Flex direction='column' flex='1'>
							<Text>Distributed by</Text>
							<Input type='text' value={distributed_by} placeholder={product_data.distributed_by} variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
						</Flex>
					</Flex>
					<Flex gap='1'>
						<Flex direction='column' gap='2' flex='1'>
							<Text fontFamily='ClearSans-Bold'>Industry<span style={{color:"orange"}}>[{product_data?.industry}]</span></Text>
							<Select variant='filled' value={industry} placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
								{industries_data?.map((item)=>{
										return(
											<option key={item?._id} value={item?.title}>{item?.title}</option>

										)
									})}
							</Select>
						</Flex>
						<Flex direction='column' gap='2' flex='1'>
							<Text fontFamily='ClearSans-Bold'>Technology<span style={{color:"orange"}}>[{product_data?.technology}]</span></Text>
							<Select variant='filled' value={technology} placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
								{technologies_data?.map((item)=>{
									return(
										<option key={item?._id} value={item?.title}>{item?.title}</option>

									)
								})}
							</Select>
						</Flex>
					</Flex>
					<Flex direction='column'>
						<Text>Function</Text>
						<Textarea type='text' value={product_function} placeholder={product_data.function} variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Features & Benefits</Text>
						<Textarea type='text' value={features_of_product} placeholder={product_data.features_of_product} variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Application</Text>
						<Textarea type='text' value={application_of_product} placeholder={product_data.application_of_product} variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Packaging</Text>
						<Textarea type='text' value={packaging_of_product} placeholder={product_data.packaging_of_product} variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Storage & Handling</Text>
						<Textarea type='text' value={storage_of_product} placeholder={product_data.storage_of_product} variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>website_link</Text>
						<Input type='text' value={website_link} placeholder={product_data.website_link_to_Seller} variant='filled' onChange={((e)=>{set_website_link(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='3' flex='1'>
						<Text fontFamily='ClearSans-Bold'>Short on Expiry</Text>
						<Select variant='filled' value={product_data?.short_on_expiry == 'true'? 'Product wil be expiring soon':'Product is not set to expire soon'} placeholder='List As Short on Expiry' onChange={((e)=>{e.target.value === 'true'? set_short_on_expiry(true): set_short_on_expiry(false)})}>
							<option value='false'>Product is not set to expire soon</option>
							<option value='true'>Product wil be expiring soon</option>
				        </Select>
					</Flex>
					<Flex gap='2'>
	                	<Button flex='1' bg='#009393' borderRadius='0' color='#fff' onClick={Handle_Edit_Product}>Edit Product</Button>
	                	<Button flex='1' bg='#000' borderRadius='0' color='#fff' onClick={(()=>{set_iseditfiles(true)})}>Edit Files</Button>
	                </Flex>
	                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.back()})}>Cancel</Button>
				</Flex>
			}
		</Flex>
	)
}