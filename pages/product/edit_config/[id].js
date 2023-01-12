//modules import
import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//components import
import Header from '../../../components/Header';
import Edit_Files from './edit_files.js'
import Loading from '../../../components/Loading.js'
//api calls
import Get_Product from '../../api/product/get_product.js';
import Edit_Product from '../../api/product/edit_product.js';
import Get_Industries from '../../api/control/get_industries';
import Get_Technologies from '../../api/control/get_technologies'
//utils
import {storage} from '../../../components/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
//styles
import styles from '../../../styles/Home.module.css';

function Product(){
	//modules
	const router = useRouter();
	const toast = useToast();
	//utils
	const [product_data,set_product_data]=useState('');
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);
	const [is_editfiles,set_iseditfiles]=useState(false);

	const id = router.query;
	const payload = {
		_id : id.id
	}

	//apis
	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			console.log(response.data)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		})
	}

	//usehooks
	useEffect(()=>{
		if (!payload || id.id === undefined){
			//alert("missing info could not fetch data")
			//router.back()
		}else{
			console.log(payload)
			get_Data(payload)
			get_Industries_Data()
			get_Technology_Data()
		}
	},[])

	const [name_of_product,set_name_of_product]=useState(product_data?.name_of_product);
	const [email_of_lister,set_email_of_lister]=useState(product_data?.email_of_lister);
	const [listed_by_id,set_listed_by_id]=useState(product_data?.listed_by_id);
	const [short_on_expiry,set_short_on_expiry]=useState(product_data?.short_on_expiry);
	//manufacturer information
	const [manufactured_by,set_manufactured_by]=useState(product_data?.manufactured_by);
	//seller information
	const [distributed_by,set_distributed_by]=useState(product_data?.distributed_by);
	const [website_link_to_Seller,set_website_link_to_Seller]=useState(product_data?.website_link_to_Seller);
	//product information
	const [description_of_product,set_description_of_product]=useState(product_data?.description_of_product);
	const [chemical_name,set_chemical_name]=useState(product_data?.chemical_name);
	const [product_function,set_product_function]=useState(product_data?.function);
	const [brand,set_brand]=useState(product_data?.brand);
	const [features_of_product,set_features_of_product]=useState(product_data?.features_of_product);
	const [application_of_product,set_application_of_product]=useState(product_data?.application_of_product);
	const [packaging_of_product,set_packaging_of_product]=useState(product_data?.packaging_of_product);
	const [storage_of_product,set_storage_of_product]=useState(product_data?.storage_of_product);
	//category_of_product
	const [industry,set_industry]=useState(product_data?.industry);
	const [technology,set_technology]=useState(product_data?.technology);

	const edit_payload = {
		_id: product_data?._id,
		email_of_lister,
		name_of_product,
		manufactured_by,
		distributed_by,
		website_link_to_Seller,
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
	
	const handle_edit_product=async()=>{
		await Edit_Product(edit_payload).then(()=>{
			toast({
              title: '',
              description: `${product_data.name_of_product} has been edited successfully`,
              status: 'success',
              isClosable: true,
            });
			router.back()
		})
		console.log(edit_payload)
		// if(data_sheet === data_sheet_url || safety_data_sheet == safety_data_sheet_url || formulation_document == formulation_document_url){
		// 	await Edit_Product(edit_payload).then(()=>{
		// 			alert("successfully edited product")
		// 			router.back()
		// 		})
		// 	console.log(edit_payload)
		// }else{
		// 	handle_File_Upload()
		// 	if(data_sheet_url === '' || safety_data_sheet_url === '' || formulation_document_url === ''){
		// 		handle_File_Upload()
		// 	}else{
		// 		setTimeout(()=>{
		// 			Edit_Product(edit_payload).then(()=>{
		// 					toast({
		// 		              title: '',
		// 		              description: `${edit_payload.name_of_product} has been edited successfully`,
		// 		              status: 'success',
		// 		              isClosable: true,
		// 		            });
		// 					router.back()
		// 				})
		// 			console.log(edit_payload)
		// 		},10000)
		// 	}
		// }
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
						<Input type='text' placeholder={product_data.name_of_product} variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Brand Name</Text>
						<Input type='text' placeholder={product_data.brand} variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Chemical Family</Text>
						<Input type='text' placeholder={product_data.chemical_name} variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Description</Text>
						<Textarea type='text' placeholder={product_data.description_of_product} variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
					</Flex>
					<Flex gap='2'>
						<Flex direction='column' flex='1'>
							<Text>Manufactured by:</Text>
							<Input type='text' placeholder={product_data.manufactured_by} variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
						</Flex>
						<Flex direction='column' flex='1'>
							<Text>Distributed by</Text>
							<Input type='text' placeholder={product_data.distributed_by} variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
						</Flex>
					</Flex>
					<Flex direction='column'>
						<Text>Contact Email</Text>
						<Input type='email' placeholder={product_data.email_of_lister} variant='filled' onChange={((e)=>{set_email_of_lister(e.target.value)})}/>
					</Flex>
					<Flex gap='1'>
						<Flex direction='column' gap='2' flex='1'>
							<Text fontFamily='ClearSans-Bold'>Industry</Text>
							<Select variant='filled' placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
								{industries_data?.map((item)=>{
										return(
											<option key={item?._id} value={item?.title}>{item?.title}</option>

										)
									})}
					        </Select>
						</Flex>
						<Flex direction='column' gap='3' flex='1'>
							<Text fontFamily='ClearSans-Bold'>Technology</Text>
							<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
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
						<Textarea type='text' placeholder={product_data.function} variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Features & Benefits</Text>
						<Textarea type='text' placeholder={product_data.features_of_product} variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Application</Text>
						<Textarea type='text' placeholder={product_data.application_of_product} variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Packaging</Text>
						<Textarea type='text' placeholder={product_data.packaging_of_product} variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Storage & Handling</Text>
						<Textarea type='text' placeholder={product_data.storage_of_product} variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>website_link</Text>
						<Input type='text' placeholder={product_data.website_link_to_Seller} variant='filled' onChange={((e)=>{set_website_link_to_Seller(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='3' flex='1'>
						<Text fontFamily='ClearSans-Bold'>Short on Expiry</Text>
						<Select variant='filled' placeholder='List As Short on Expiry' onChange={((e)=>{e.target.value === 'true'? set_short_on_expiry(true): set_short_on_expiry(false)})}>
							<option value='false'>Product is not set to expire soon</option>
							<option value='true'>Product wil be expiring soon</option>
				        </Select>
					</Flex>
					<Flex gap='2'>
	                	<Button flex='1' bg='#009393' borderRadius='0' color='#fff' onClick={handle_edit_product}>Edit Product</Button>
	                	<Button flex='1' bg='#000' borderRadius='0' color='#fff' onClick={(()=>{set_iseditfiles(true)})}>Edit Files</Button>
	                </Flex>
	                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.back()})}>Cancel</Button>
				</Flex>
			}
		</Flex>
	)
}

export default Product;

const Edit_Info=({product_data})=>{
	let [name_of_product,set_name_of_product]=useState(product_data?.name_of_product);
	let [email_of_lister,set_email_of_lister]=useState(product_data?.email_of_lister);
	let [listed_by_id,set_listed_by_id]=useState(product_data?.listed_by_id);
	let [short_on_expiry,set_short_on_expiry]=useState(product_data?.short_on_expiry);
	//manufacturer information
	let [manufactured_by,set_manufactured_by]=useState(product_data?.manufactured_by);
	let [manufactured_date,set_manufactured_date]=useState(product_data?.manufactured_date);
	let [expiry_date,set_expiry_date]=useState(product_data?.expiry_date);
	//seller information
	let [distributed_by,set_distributed_by]=useState(product_data?.distributed_by);
	let [website_link_to_Seller,set_website_link_to_Seller]=useState(product_data?.website_link_to_Seller);
	//product information
	let [description_of_product,set_description_of_product]=useState(product_data?.description_of_product);
	let [chemical_name,set_chemical_name]=useState(product_data?.chemical_name);
	let [product_function,set_product_function]=useState(product_data?.product_function);
	let [brand,set_brand]=useState(product_data?.brand);
	let [features_of_product,set_features_of_product]=useState(product_data?.features_of_product);
	let [application_of_product,set_application_of_product]=useState(product_data?.application_of_product);
	let [packaging_of_product,set_packaging_of_product]=useState(product_data?.packaging_of_product);
	let [storage_of_product,set_storage_of_product]=useState(product_data?.storage_of_product);
	//documents
	let [data_sheet,set_data_sheet]=useState(product_data?.data_sheet);
	let [safety_data_sheet,set_safety_data_sheet]=useState(product_data?.safety_data_sheet);
	let [formulation_document,set_formulation_document]=useState(product_data?.formulation_document);
	//category_of_product
	let [industry,set_industry]=useState(product_data?.industry);
	let [technology,set_technology]=useState(product_data?.technology);
	//featured status
	let [sponsored,set_sponsored]=useState(product_data?.sponsored);
	//verification_status
	let [verification_status,set_verification_status]=useState(product_data?.verification_status);

	let payload = {
		_id: product_data?._id,
		name_of_product,
		email_of_lister,
		listed_by_id,
		short_on_expiry :false,
		manufactured_by,
		manufactured_date,
		expiry_date,
		distributed_by,
		website_link_to_Seller,
		description_of_product,
		chemical_name,
		function : product_function,
		brand,
		features_of_product,
		application_of_product,
		packaging_of_product,
		storage_of_product,
		data_sheet,
		safety_data_sheet,
		formulation_document,
		industry,
		technology,
		sponsored,
		verification_status,
	}
	console.log(payload)
	const handle_edit_product=async()=>{
		console.log(edit_payload)
		// await Add_New_Product(payload).then(()=>{
		// 	alert("successfully created a new product")
		// 	router.push("/inventory")
		// })
	}

	return(
		<Flex className={styles.productbody} direction='column' p='3' gap='3'>
				<Text fontSize='32px' fontWeight='bold'>Edit Product</Text>
				<Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder={product_data?.name_of_product} variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured by:</Text>
					<Input type='text' placeholder={product_data?.email_of_lister} variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Distributed by</Text>
					<Input type='text' placeholder={product_data?.distributed_by} variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured date</Text>
					<Input type='date' placeholder={product_data?.manufactured_date} variant='filled' onChange={((e)=>{set_manufactured_date(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Description</Text>
					<Textarea type='text' placeholder={product_data?.description_of_product} variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Chemical name</Text>
					<Input type='text' placeholder={product_data?.chemical_name} variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold'>Industry</Text>
					<Select variant='filled' placeholder={product_data?.industry} onChange={((e)=>{set_industry(e.target.value)})}>
			          <option value='personalcare'>Personal Care</option>
			          <option value='hi&i'>H I & I</option>
			          <option value='building&construction'>Building and Construction</option>
			          <option value='food&nutrition'>Food and Nutrition</option>
			        </Select>
				</Flex>
				<Flex direction='column' gap='3'>
					<Text fontFamily='ClearSans-Bold'>Technology</Text>
					<Select variant='filled' placeholder={product_data?.technology} onChange={((e)=>{set_technology(e.target.value)})}>
			          <option value='pharmaceuticals'>Pharmaceuticals</option>
			          <option value='cosmetics'>Cosmetics</option>
			        </Select>
				</Flex>
				<Flex direction='column'>
					<Text>Function</Text>
					<Input type='text' placeholder={product_data?.function} variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Brand</Text>
					<Input type='text' placeholder={product_data?.brand} variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>expiry date</Text>
					<Input type='date' placeholder='expiry date' variant='filled' onChange={((e)=>{set_expiry_date(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Data Sheet</Text>
					<Input type='file' placeholder='product data sheet' variant='filled' onChange={((e)=>{set_data_sheet(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Formulation Document</Text>
					<Input type='file' placeholder='Formulation Dcument' variant='filled' onChange={((e)=>{set_formulation_document(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Safety Data Sheet</Text>
					<Input type='file' placeholder='safety_data_sheet Document' variant='filled' onChange={((e)=>{set_safety_data_sheet(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Features & Benefits</Text>
					<Input type='text' placeholder={product_data?.features_of_product} variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Application</Text>
					<Input type='text' placeholder={product_data?.application_of_product} variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Packaging</Text>
					<Input type='text' placeholder={product_data?.packaging_of_product} variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Storage & Handling</Text>
					<Input type='text' placeholder={product_data?.storage_of_product} variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>List as Short on Expiry</Text>
					<Checkbox defaultChecked bg='#eee' p='2' onChange={((e)=>{set_short_on_expiry(e.target.value)})}>Short on Expiry</Checkbox>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_edit_product}>Edited Product</Button>
                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.back()})}>Cancel</Button>
		</Flex>
	)
}