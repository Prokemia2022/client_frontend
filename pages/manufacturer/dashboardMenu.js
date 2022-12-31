/*useHooks*/
import React,{useState} from 'react';
import {useRouter} from 'next/router';
/*chakea-ui*/
import {Flex,Text,Input,Button,Image} from '@chakra-ui/react';
/*icons*/
import {LocationCity,Add} from '@mui/icons-material/';
/*modals*/
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import AddNewDistributor from '../../components/modals/addNewDistributor.js';
import Suggest_Industry from '../api/control/suggest_industry.js'
import Suggest_Technology from '../api/control/suggest_technology.js'

function DashboardMenu({setCurrentValue,manufacturer_data}){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);
	const [addnewInd,setaddnewInd]=useState(false);
	const [addnewTech,setaddnewTech]=useState(false);

	const router = useRouter();

	const id = manufacturer_data?._id

	return (
		<Flex p='1' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='manufacturer'/>
			<AddNewDistributor isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible} id={id}/>
			<Flex gap='3'>
				<LocationCity style={{fontSize:'150px',backgroundColor:"",borderRadius:'150px',padding:'10px'}}/>
				<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='28px' fontWeight='bold' color='#009393'>{manufacturer_data?.first_name} {manufacturer_data?.last_name}</Text>
					<Text>company_name: {manufacturer_data?.company_name}</Text>
					<Text>email: {manufacturer_data?.email_of_company}</Text>
					<Text>mobile: {manufacturer_data?.mobile_of_company}</Text>	
					<Text>Address: {manufacturer_data?.address_of_company}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='24px' fontWeight='bold' color='#009393'>Description</Text>
					<Text>{manufacturer_data?.description}</Text>
				</Flex>
			<Flex gap='3' direction='column'>
				<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/product/add_product')})}><Add/>Add new Product</Button>
				<Flex gap='2'>
					<Button flex='1' bg='#fff' border='1px solid #000' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add new Expert</Button>
					<Button flex='1' bg='#fff' border='1px solid #000' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
				</Flex>
			</Flex>
			<Text mb='0'>Operating in an industry or Technology not included in our options?</Text>
			{addnewInd || addnewTech ? 
				<>	{addnewInd ? <AddNewIndustry setaddnewInd={setaddnewInd}/> : <AddNewTechnology setaddnewTech={setaddnewTech}/>} </>
				:
				<Flex cursor='pointer' gap='2' direction='column'>
					<Text color='#009393' onClick={(()=>{setaddnewInd(true)})}>Suggest a new Industry</Text>
					<Text color='#009393' onClick={(()=>{setaddnewTech(true)})}>Suggest a new Technology</Text>
				</Flex>
			}
		</Flex>
	)
}

export default DashboardMenu;


const AddNewIndustry=({setaddnewInd})=>{
	const [suggest_industry,set_suggest_industry]=useState(false);

	const payload = {
		title: suggest_industry
	}

	const handle_suggest_industry=async()=>{
		setaddnewInd(false)
		console.log(payload)

		await Suggest_Industry(payload).then((response)=>{
			alert("success")
		})
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Industry</Text>
			<Input bg='#fff' type='text' placeholder='Suggest industry' onChange={((e)=>{set_suggest_industry(e.target.value)})}/>
			<Flex gap='2'>
				<Button bg='#009393' onClick={handle_suggest_industry}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{setaddnewInd(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const AddNewTechnology=({setaddnewTech})=>{
	const [suggest_technology,set_suggest_technology]=useState(false);

	const payload = {
		title: suggest_technology
	}

	const handle_suggest_technology=async()=>{
		setaddnewTech(false)
		console.log(payload)

		await Suggest_Technology().then((response)=>{
			alert("success")
		})
	}
	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Technology</Text>
			<Input bg='#fff' type='text' placeholder='Suggest technology' onChange={((e)=>{set_suggest_technology(e.target.value)})}/>
			<Flex gap='2'>
				<Button bg='#009393' onClick={handle_suggest_technology}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{setaddnewTech(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}


const ProductItem=({router})=>{
	return(
		<Flex p='2' bg='#eee' m='2' borderRadius='5px' direction='column'>
			<Image bg='#fff' w='100%' h='50px' borderRadius='5px' alt='photo'/>
			<Text color='#009393' fontWeight='bold' fontSize="24px">Cereal</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Industry:</Text>
				<Text>Agriculture</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Technology:</Text>
				<Text>crops</Text>
			</Flex>
			<Text fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/manufacturer/product/cereals`)})}>View product -&gt;  </Text>
			</Flex>
	)
}