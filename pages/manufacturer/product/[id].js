import React,{useState} from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
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
import Delete_Product from '../../api/product/delete_product.js';

function Product(){
	const router = useRouter();
	const id = router.query;

	const [isquotationModalvisible,setisquotationModalvisible]=useState(false);
	const [issampleModalvisible,setissampleModalvisible]=useState(false);
	const [iseditproductModalvisible,setiseditProductModalvisible]=useState(false);
	const [isdeleteproductModalvisible,setisdeleteProductModalvisible]=useState(false);
	const [isshortexpproductModalvisible,setisshortexpproductModalvisible]=useState(false);

	return(
		<Flex className={styles.productbody}>
		
		<QuotationModal isquotationModalvisible={isquotationModalvisible} setisquotationModalvisible={setisquotationModalvisible}/>
		<SampleModal issampleModalvisible={issampleModalvisible} setissampleModalvisible={setissampleModalvisible}/>
		<EditProductModal iseditproductModalvisible={iseditproductModalvisible} setiseditProductModalvisible={setiseditProductModalvisible}/>
		<DeleteProductModal isdeleteproductModalvisible={isdeleteproductModalvisible} setisdeleteProductModalvisible={setisdeleteProductModalvisible}/>
		<ListProductShortExpiryModal isshortexpproductModalvisible={isshortexpproductModalvisible} setisshortexpproductModalvisible={setisshortexpproductModalvisible}/>
			<Flex p='' direction='column' gap='2' className={styles.productsection1}>
				<Header/>
				<Text fontFamily='ClearSans-Bold' fontSize='32px'>{id.id}</Text>
				<Flex>
					<Text>Manufactured by:</Text>
					<Text color='grey'>INC Manufacturers</Text>
				</Flex>
				<Flex>
					<Text>Distributed by:</Text>
					<Text color='grey'>Zoho Distributors limited</Text>
				</Flex>
				<Flex direction='column'>
					<Text color='#000' fontWeight='bold'>Description</Text>
					<Text >Luna-cure PACM is a cycloaliphatic diamine. Luna-cure PACM is mainly used as a hardener for epoxies. The curing of epoxy resins at high temperatures leads to excellent mechanical properties and good resistance against alkalis, acids, hydrocarbon solvents and water. This product is available in Europe, Asia and North America.</Text>
					<Text mt='4'>Chemical Name: 4,4-Diaminodicyclohexyl methane
							Function: Curing & Hardening Agent, Monomer
							CAS Number: 1761-71-3
							Chemical Family: Diamines</Text>
				</Flex>
				<Flex direction='column' gap='2' mt='2'>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Product Data Sheet</Button>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Safety Data Sheet</Button>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Formulation Document</Button>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Features & Benefits</Text>
					<Text>Luna-cure PACM is a cycloaliphatic diamine. Luna-cure PACM is mainly used as a hardener for epoxies. The curing of epoxy resins at high temperatures leads to excellent mechanical properties and good resistance against alkalis, acids, hydrocarbon solvents and water. This product is available in Europe, Asia and North America.</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Applications and benefits</Text>
					<Text>Luna-cure PACM is a cycloaliphatic diamine. Luna-cure PACM is mainly used as a hardener for epoxies. The curing of epoxy resins at high temperatures leads to excellent mechanical properties and good resistance against alkalis, acids, hydrocarbon solvents and water. This product is available in Europe, Asia and North America.</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Packaging</Text>
					<Text>IBC 1570 kg and as bulk</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Storage & Handling</Text>
					<Text>Amicult K 42 preferrably to be stored above 0c,as crystalization temperature for productis -O c.</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Button bg='#009393' borderRadius='0' p='1' color='#fff' onClick={(()=>{setiseditProductModalvisible(true)})}>Edit Product</Button>
					<Button bg='#fff' borderRadius='0' border='1px solid #000' p='1' onClick={(()=>{setisshortexpproductModalvisible(true)})}>List as short on Expiry</Button>
					<Button bg='#fff' color='red' borderRadius='0' border='1px solid red' p='1' onClick={(()=>{setisdeleteProductModalvisible(true)})}>Delete Product</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Product;
