import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Link,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import styles from '../../styles/Home.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import QuotationModal from '../../components/modals/Quotation.js';
import SampleModal from '../../components/modals/Sample.js';
import Header from '../../components/Header.js';
import Get_Product from '../api/product/get_product.js';
//import Delete_Product from '../api/product/delete_product.js';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

function Product(){
	const router = useRouter();
	const id = router.query;
	const toast = useToast()
	const [isquotationModalvisible,setisquotationModalvisible]=useState(false);
	const [issampleModalvisible,setissampleModalvisible]=useState(false);

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
		if (!payload._id == undefined || id.id === undefined){
			toast({
              title: '',
              description: 'This link is broken,',
              status: 'info',
              isClosable: true,
            });
			router.back()
		}else{
			//console.log(payload)
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
				{product_data?.sponsored?
					<Flex position='absolute' top='1' right='1' p='1' bg='#009393' borderRadius='5' color='#fff'>
						<DoneAllOutlinedIcon />
						<Text>{product_data?.sponsored}</Text>
					</Flex>
					:null}
				<Text fontFamily='ClearSans-Bold' fontSize='32px'>{product_data?.name_of_product}</Text>
				<Flex>
					<Text>Manufactured by:</Text>
					<Text color='grey'>{product_data?.manufactured_by}</Text>
				</Flex>
				<Flex>
					<Text>Distributed by:</Text>
					<Text color='grey'>{product_data?.distributed_by}</Text>
				</Flex>
				<Flex direction='column'>
					<Text color='#000' fontWeight='bold'>Description</Text>
					<Text>{product_data?.description_of_product}</Text>
				</Flex>
				<Flex>
					<Text>chemical_name:</Text>
					<Text>{product_data?.chemical_name}</Text>
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
				<Flex p='2' gap='2' direction='column' w='100%'>
					
					<Button color='#fff' borderRadius='0' bg='#009393' onClick={(()=>{setisquotationModalvisible(true)})}><DescriptionIcon />Request Quotation</Button>
					<Button color='#fff' borderRadius='0' bg='#000' onClick={(()=>{setissampleModalvisible(true)})}><DescriptionIcon />Request Sample</Button>
					<Text textAlign='center'>or</Text>
					<Button bg='#fff' borderRadius='0' border='1px solid #000' p='1'>
	                    <Link href={`mailto: ${product_data?.email_of_lister}`} isExternal>contact</Link>
	                </Button>
					<Link href={product_data?.website_link_to_Seller} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Website link</Link>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Product;

/**<Button color='#000' borderRadius='0' bg='#e5e5e5'><FavoriteIcon />Add to WishList</Button>**/