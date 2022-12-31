import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,Link} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import styles from '../../../styles/Home.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import Header from '../../../components/Header.js';
/*Modals*/
import QuotationModal from '../../../components/modals/Quotation.js';
import SampleModal from '../../../components/modals/Sample.js';
import EditProductModal from '../../../components/modals/EditProduct.js';
import DeleteProductModal from '../../../components/modals/DeleteProduct.js';
import ListProductShortExpiryModal from '../../../components/modals/ListProductShortExpiry.js';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Get_Product from '../../api/product/get_product.js';
import Delete_Product from '../../api/product/delete_product.js';
import Edit_Product from '../../api/product/edit_product.js';

import {storage} from '../../components/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

function Product(){
	const router = useRouter();
	const id = router.query;

	const [isquotationModalvisible,setisquotationModalvisible]=useState(false);
	const [issampleModalvisible,setissampleModalvisible]=useState(false);
	const [iseditproductModalvisible,setiseditProductModalvisible]=useState(false);
	const [isdeleteproductModalvisible,setisdeleteProductModalvisible]=useState(false);
	const [isshortexpproductModalvisible,setisshortexpproductModalvisible]=useState(false);
	
	const [edit,set_edit]=useState(false)
	const payload = {
		_id : id.id
	}
	const [product_data,set_product_data]=useState('')

	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			console.log(response.data)
		})
	}
	useEffect(()=>{
		if (!payload || payload._id === 'undefined'){
			alert("missing info could not fetch data")
			router.back()
		}else{
			//console.log(payload)
			get_Data(payload)
		}
	},[payload])
	const handle_Delete_Product=async()=>{
		await Delete_Product(payload).then(()=>{
			router.back()
			alert("successfuly deleted")
		})
	}
	return(
		<Flex direction='column'>
			<Header />
			{edit?
				<Edit_Info product_data={product_data}/>
				:
				<Flex direction='column'>
				<Flex p='2' direction='column' gap='2' className={styles.productsection1} position='relative' flex='1'>
					<Flex position='absolute' top='1' right='1' p='1' bg='#009393' borderRadius='5' color='#fff'>
						<DoneAllOutlinedIcon />
						<Text>{product_data?.sponsored}</Text>
					</Flex>
					<Text fontFamily='ClearSans-Bold' fontSize='32px'>{product_data?.name_of_product}</Text>
					<Flex>
						<Text>Manufactured by:</Text>
						<Text color='grey'>{product_data?.manufactured_by}</Text>
					</Flex>
					<Flex>
						<Text>Manufactured date:</Text>
						<Text color='grey'>{product_data?.manufactured_date}</Text>
					</Flex>
					<Flex>
						<Text>Expiry by:</Text>
						<Text color='grey'>{product_data?.manufactured_date}</Text>
					</Flex>
					<Flex>
						<Text>Distributed by:</Text>
						<Text color='grey'>{product_data?.distributed_by}</Text>
					</Flex>
					<Flex direction='column'>
						<Text color='#000' fontWeight='bold'>Description</Text>
						<Text>{product_data?.description}</Text>
						<Text mt='4'>{product_data?.chemical_name}</Text>
					</Flex>
					<Flex direction='column' gap='2' mt='2'>
						<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Product Data Sheet</Link>
						<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Safety Data Sheet</Link>
						<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Formulation Document</Link>
					</Flex>
					<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
						<Text fontWeight='bold'>Features & Benefits</Text>
						<Text>{product_data?.features_of_product}</Text>
					</Flex>
					<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
						<Text fontWeight='bold'>Applications and benefits</Text>
						<Text>{product_data?.application_of_product}</Text>
					</Flex>
					<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
						<Text fontWeight='bold'>Packaging</Text>
						<Text>{product_data?.packaging_of_product}</Text>
					</Flex>
					<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
						<Text fontWeight='bold'>Storage & Handling</Text>
						<Text>{product_data?.storage_of_product}</Text>
					</Flex>
				</Flex>
				<Flex p='2' gap='2' direction='column'>
					<Button color='#fff' borderRadius='0' bg='#009393' onClick={(()=>{setisquotationModalvisible(true)})}><DescriptionIcon />Request Quotation</Button>
					<Button color='#fff' borderRadius='0' bg='#000' onClick={(()=>{setissampleModalvisible(true)})}><DescriptionIcon />Request Sample</Button>
					<Text textAlign='center'>or</Text>
					<Button bg='#eee' borderRadius='0' border='1px solid #000' p='1' onClick={(()=>{set_edit(true)})}>Edit Product</Button>
					<Button bg='#eee' borderRadius='0' border='1px solid #000' p='1'>List as short Expiry</Button>
					<Button bg='#eee' color='red' borderRadius='0' border='1px solid red' p='1' onClick={handle_Delete_Product}>Delete Product</Button>
				</Flex>
				</Flex>
			}
		</Flex>
	)
}

export default Product;


const Edit_Info=({product_data})=>{
	const router = useRouter()
	console.log(product_data)
	const [name_of_product,set_name_of_product]=useState(product_data?.name_of_product);
	const [email_of_lister,set_email_of_lister]=useState(product_data?.email_of_lister);
	const [listed_by_id,set_listed_by_id]=useState(product_data?.listed_by_id);
	const [short_on_expiry,set_short_on_expiry]=useState(product_data?.short_on_expiry);
	//manufacturer information
	const [manufactured_by,set_manufactured_by]=useState(product_data?.manufactured_by);
	const [manufactured_date,set_manufactured_date]=useState(product_data?.manufactured_date);
	const [expiry_date,set_expiry_date]=useState(product_data?.expiry_date);
	//seller information
	const [distributed_by,set_distributed_by]=useState(product_data?.distributed_by);
	const [website_link_to_Seller,set_website_link_to_Seller]=useState(product_data?.website_link_to_Seller);
	//product information
	const [description_of_product,set_description_of_product]=useState(product_data?.description_of_product);
	const [chemical_name,set_chemical_name]=useState(product_data?.chemical_name);
	const [product_function,set_product_function]=useState(product_data?.product_function);
	const [brand,set_brand]=useState(product_data?.brand);
	const [features_of_product,set_features_of_product]=useState(product_data?.features_of_product);
	const [application_of_product,set_application_of_product]=useState(product_data?.application_of_product);
	const [packaging_of_product,set_packaging_of_product]=useState(product_data?.packaging_of_product);
	const [storage_of_product,set_storage_of_product]=useState(product_data?.storage_of_product);
	//documents
	const [data_sheet,set_data_sheet]=useState(product_data?.data_sheet);
	const [data_sheet_url,set_data_sheet_url]=useState(product_data?.data_sheet);

	const [safety_data_sheet,set_safety_data_sheet]=useState(product_data?.safety_data_sheet);
	const [safety_data_sheet_url,set_safety_data_sheet_url]=useState(product_data?.safety_data_sheet);

	const [formulation_document,set_formulation_document]=useState(product_data?.formulation_document);
	const [formulation_document_url,set_formulation_document_url]=useState(product_data?.formulation_document);
	//category_of_product
	const [industry,set_industry]=useState(product_data?.industry);
	const [technology,set_technology]=useState(product_data?.technology);

	const payload = {
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
		data_sheet_url,
		safety_data_sheet_url,
		formulation_document_url,
		industry,
		technology,
	}

const handle_data_sheet_file_upload=async()=>{
		if (data_sheet == ''){
			return alert('err')
		}
		const data_sheet_documentRef = ref(storage, `data_sheet/${data_sheet.name + v4()}`);
		await uploadBytes(data_sheet_documentRef,data_sheet).then(snapshot => {
			getDownloadURL(snapshot.ref).then((url) => {
				console.log(url)
				set_data_sheet_url(url)
			});
		})
	}

	const handle_safety_sheet_file_upload=async()=>{
		if (safety_data_sheet == ''){
			return alert('err')
		}
		const safety_data_sheet_documentRef = ref(storage, `safety_data_sheet/${safety_data_sheet.name + v4()}`);
		await uploadBytes(safety_data_sheet_documentRef,safety_data_sheet).then(snapshot => {
			getDownloadURL(snapshot.ref).then((url) => {
				console.log(url)
				set_safety_data_sheet_url(url)
			});
		})
	}

	const handle_formulation_document_file_upload=async()=>{
		if (formulation_document == ''){
			return alert('err')
		}
		const formulation_document_documentRef = ref(storage, `formulation_document/${formulation_document.name + v4()}`);
		await uploadBytes(formulation_document_documentRef,formulation_document).then(snapshot => {
	      getDownloadURL(snapshot.ref).then((url) => {
	      		console.log(url)
				set_formulation_document_url(url)
			});
	    })
	}


	const handle_File_Upload=async()=>{
		await handle_data_sheet_file_upload()
		await handle_safety_sheet_file_upload()
		await handle_formulation_document_file_upload()
		console.log(data_sheet_url,safety_data_sheet_url,formulation_document_url)
		console.log(payload)
	}

	const handle_edit_product=async()=>{
		console.log(payload)
		if(data_sheet === data_sheet_url || safety_data_sheet == safety_data_sheet_url || formulation_document == formulation_document_url){
			Edit_Product(payload).then(()=>{
					alert("successfully edited product")
					router.back()
				})
			console.log(payload)
		}else{
			handle_File_Upload()
			if(data_sheet_url === '' || safety_data_sheet_url === '' || formulation_document_url === ''){
				handle_File_Upload()
			}else{
				setTimeout(()=>{
					Edit_Product(payload).then(()=>{
							alert("successfully edited product")
							router.back()
						})
					console.log(payload)
				},10000)
			}
		}
	}

	return(
		<Flex className={styles.productbody} direction='column' p='3' gap='3'>
				<Text fontSize='32px' fontWeight='bold'>Edit Product</Text>
				<Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder={product_data.name_of_product} variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured by:</Text>
					<Input type='text' placeholder={product_data.manufactured_by} variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Distributed by</Text>
					<Input type='text' placeholder={product_data.distributed_by} variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured date</Text>
					<Input type='date' placeholder={product_data.manufactured_date} variant='filled' onChange={((e)=>{set_manufactured_date(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Description</Text>
					<Textarea type='text' placeholder={product_data.description_of_product} variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Chemical name</Text>
					<Input type='text' placeholder={product_data.chemical_name} variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold'>Industry</Text>
					<Select variant='filled' placeholder={product_data.industry} onChange={((e)=>{set_industry(e.target.value)})}>
			          <option value='personalcare'>Personal Care</option>
			          <option value='hi&i'>H I & I</option>
			          <option value='building&construction'>Building and Construction</option>
			          <option value='food&nutrition'>Food and Nutrition</option>
			        </Select>
				</Flex>
				<Flex direction='column' gap='3'>
					<Text fontFamily='ClearSans-Bold'>Technology</Text>
					<Select variant='filled' placeholder={product_data.technology} onChange={((e)=>{set_technology(e.target.value)})}>
			          <option value='pharmaceuticals'>Pharmaceuticals</option>
			          <option value='cosmetics'>Cosmetics</option>
			        </Select>
				</Flex>
				<Flex direction='column'>
					<Text>Function</Text>
					<Input type='text' placeholder={product_data.function} variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Brand</Text>
					<Input type='text' placeholder={product_data.brand} variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
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
					<Input type='text' placeholder={product_data.features_of_product} variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Application</Text>
					<Input type='text' placeholder={product_data.application_of_product} variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Packaging</Text>
					<Input type='text' placeholder={product_data.packaging_of_product} variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Storage & Handling</Text>
					<Input type='text' placeholder={product_data.storage_of_product} variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Website Link</Text>
					<Input type='text' placeholder={product_data.website_link_to_Seller} variant='filled' onChange={((e)=>{set_website_link_to_Seller(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>List as Short on Expiry</Text>
					<Checkbox defaultChecked bg='#eee' p='2' onChange={((e)=>{set_short_on_expiry(e.target.value)})}>Short on Expiry</Checkbox>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_edit_product}>Edit Product</Button>
                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.back()})}>Cancel</Button>
		</Flex>
	)
}