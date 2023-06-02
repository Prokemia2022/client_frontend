import {useState,useEffect} from 'react';
import {Flex,Text,Button,Link,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//icons
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import LanguageIcon from '@mui/icons-material/Language';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedIcon from '@mui/icons-material/Verified';
//components
import QuotationModal from '../../components/modals/Quotation.js';
import SampleModal from '../../components/modals/Sample.js';
import Header from '../../components/Header.js';
//api
import Get_Product from '../api/product/get_product.js';
//utils
import styles from '../../styles/Home.module.css';

export default function Product(){
	const router = useRouter();
	const id = router.query;
	const [isquotationModalvisible,setisquotationModalvisible]=useState(false);
	const [issampleModalvisible,setissampleModalvisible]=useState(false);
	
	const toast = useToast();
	const cookies = new Cookies();
	const token = cookies.get('user_token');
	const [is_signed_in,set_is_signed_in]=useState(false);
	//const [is_signed_in,set_is_signed_in]=useState(false);
	const Send_Info=()=>{
		toast({
			title: '',
			description: 'You need to have an account to access this document. Sign In or create an account to get access.',
			position: 'top-left',
			variant:"subtle",
			status: 'info',
			isClosable: true,
		});
		return ;
	}

	useEffect(()=>{
		if(token){
			set_is_signed_in(true)
		}else{
			set_is_signed_in(false)
		}
	},[token])
	const payload = {
		_id : id?.id
	}
	const [product_data,set_product_data]=useState('')

	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			//console.log(response.data)
		})
	}
	useEffect(()=>{
		if (id.id === undefined){
			return;
		}else{
			get_Data(payload)
		}
	},[id])
	return(
		<Flex  direction='column'>
			<QuotationModal isquotationModalvisible={isquotationModalvisible} setisquotationModalvisible={setisquotationModalvisible} product_data={product_data}/>
			<SampleModal issampleModalvisible={issampleModalvisible} setissampleModalvisible={setissampleModalvisible} product_data={product_data}/>
			<Header/>
			<Flex direction='column' gap='2' className={styles.productbody}>
			<Flex p='2' direction='column' gap='2' className={styles.productsection1} position='relative'>
				{product_data?.sponsored ? 
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' align='center' position='absolute' top='15px' right='15px'>
						<Text fontWeight='bold' >Featured</Text>
						<VerifiedIcon style={{color:'gold'}}/>
					</Flex>
					:
					null
				}
				<Flex gap='2' fontSize={'14px'} color='grey'>
					<Flex direction={'column'}>
						<Text fontWeight={'bold'}>Industry:</Text>
						<Text color='#009393' cursor='pointer' textDecoration='underline' onClick={(()=>{router.push(`/products/${product_data?.industry}`)})}>{product_data?.industry}</Text>
					</Flex>
					<Flex direction={'column'} borderLeft='1px solid grey' pl='2'>
						<Text fontWeight={'bold'}>Technology:</Text>
						<Text color='#009393' cursor='pointer' textDecoration='underline' onClick={(()=>{router.push(`/products/${product_data?.technology}`)})}>{product_data?.technology}</Text>
					</Flex>
				</Flex>
				<Text fontFamily='ClearSans-Bold' fontSize='32px' color='#009393'>{product_data?.name_of_product}</Text>
				<Text>{product_data?.description_of_product}</Text>
				<Flex gap='2'>
					<Text fontWeight={'bold'}>Manufactured by:</Text>
					<Text color='grey'>{product_data?.manufactured_by}</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight={'bold'}>Distributed by:</Text>
					<Text color='grey'>{product_data?.distributed_by}</Text>
				</Flex>
				<Text fontWeight='bold'>Chemical_name:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.chemical_name}</Text>
				</Flex>
				<Text fontWeight='bold'>Functions:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.function}</Text>
				</Flex>
				<Flex direction='column' gap='2' mt='2' mb='2'>
					<Text fontWeight='bold'>Attachments</Text>
					{product_data?.data_sheet === ''? 
						<Text bg='#eee' p='2' textAlign='center' borderRadius='5'>No data sheet attached</Text> 
						: 
						<>
							{is_signed_in?
								<Link href={product_data?.data_sheet} bg='' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' isExternal fontSize='20px'><DescriptionIcon style={{color:'#EA9DB0',fontSize:'18px'}} /> Product Data Sheet</Link>
								:
								<Text onClick={Send_Info} bg='' cursor='pointer' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' fontSize='20px'><DescriptionIcon style={{color:'#EA9DB0',fontSize:'18px'}} /> Product Data Sheet</Text>
							}
						</>
					}
					{product_data?.formulation_document === ''?
						<Text bg='#eee' p='2' textAlign='center' borderRadius='5'>No formulation document attached</Text>
						: 
						<>
							{is_signed_in?
								<Link href={product_data?.formulation_document} bg='' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' isExternal fontSize='20px'><DescriptionIcon style={{color:'#5D95B4',fontSize:'18px'}} /> Fomulation document</Link>
								:
								<Text onClick={Send_Info} bg='' cursor='pointer' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' fontSize='20px'><DescriptionIcon style={{color:'#5D95B4',fontSize:'18px'}} /> Fomulation document</Text>
							}
						</>
					}
					{product_data?.safety_data_sheet === ''?
						<Text bg='#eee' p='2' textAlign='center' borderRadius='5'>No safety data sheet attached</Text>
						: 
						<>
							{is_signed_in?
								<Link href={product_data?.safety_data_sheet} bg='' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' isExternal fontSize='20px'><DescriptionIcon style={{color:'#8c52ff',fontSize:'18px'}} /> Safety Data Sheet</Link>
								:
								<Text onClick={Send_Info} bg='' cursor='pointer' border='1px solid #eee' borderRadius='5' boxShadow='lg' color='#000' align='center' p='1' fontSize='20px'><DescriptionIcon style={{color:'#8c52ff',fontSize:'18px'}} /> Safety Data Sheet</Text>
							}
						</>
					}
				</Flex>
				<Text fontWeight='bold'>Features & Benefits:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.features_of_product}</Text>
				</Flex>
				<Text fontWeight='bold'>Applications and benefits:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.application_of_product}</Text>
				</Flex>
				<Text fontWeight='bold'>Packaging:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.packaging_of_product}</Text>
				</Flex>
				<Text fontWeight='bold'>Storage & Handling:</Text>
				<Flex direction='column'  borderRadius='5' p=''>
					<Text>{product_data?.storage_of_product}</Text>
				</Flex>
			</Flex>
				<Flex p='2' gap='2' direction='column' w='100%'>
					
					<Button color='#fff' borderRadius='0' bg='#009393' onClick={(()=>{setisquotationModalvisible(true)})}><DescriptionIcon />Request Quotation</Button>
					<Button color='#fff' borderRadius='0' bg='#000' onClick={(()=>{setissampleModalvisible(true)})}><DescriptionIcon />Request Sample</Button>
	                {product_data?.website_link_to_Seller === ''? <Text bg='#eee' p='2' textAlign='center' borderRadius='5'>Website link is not attached</Text> : <Link href={product_data?.website_link_to_Seller} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Website link</Link>}
					
				</Flex>
			</Flex>
		</Flex>
	)
}
