import React,{useState} from 'react'
import {Flex,Text,Input,Button,Image} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import AddNewManufacturer from '../../components/modals/addNewManufacturer.js';
import Suggest_Industry from '../api/control/suggest_industry.js'
import Suggest_Technology from '../api/control/suggest_technology.js'

function DashboardMenu({setCurrentValue,distributor_data}){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);


	const [addnewInd,setaddnewInd]=useState(false);
	const [addnewTech,setaddnewTech]=useState(false);

	const router = useRouter();

	const [experts,set_experts]=useState(distributor_data?.experts)
	const [industries,set_industries]=useState(distributor_data?.industries)
	const [technologies,set_technologies]=useState(distributor_data?.technologies)
	const [manufacturers,set_manufacturers]=useState(distributor_data?.manufacturers)

	const id = distributor_data?._id
	return (
		<Flex p='1' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='distributor'/>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible} id={id}/>
			<Flex gap='3'>
				{distributor_data?.profile_photo_url == ''? 
					<LocationCityIcon style={{fontSize:'150px',padding:'10px'}}/> 
				: 
					<Image boxSize='200px' src={distributor_data?.profile_photo_url} alt='profile photo' boxShadow='lg'/>
				}
				<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='28px' fontWeight='bold' color='#009393'>{distributor_data?.first_name} {distributor_data?.last_name}</Text>
					<Text>company_name: {distributor_data?.company_name}</Text>
					<Text>email: {distributor_data?.email_of_company}</Text>
					<Text>mobile: {distributor_data?.mobile_of_company}</Text>	
					<Text>Address: {distributor_data?.address_of_company}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='24px' fontWeight='bold' color='#009393'>Description</Text>
					<Text>{distributor_data?.description}</Text>
				</Flex>
			<Flex gap='3' wrap='Wrap'>
				<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/product/add_product')})}>Add new Product</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add new Experts</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
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

			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Experts</Text>
					<Text color='#009393' fontWeight='bold' cursor='pointer' onClick={(()=>{setCurrentValue('experts')})}>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
				{experts?.length === 0 ?
						<Flex justify='center' align='center' h='20vh' direction='column' gap='2'>
							<Text>You have not listed any experts</Text>
							<Button bg='#009393' color='#fff' onClick={(()=>{setCurrentValue('experts')})}>Add a new Expert</Button>
						</Flex>
					:
					<Flex direction='column' p='1' gap='2'>
						{experts?.slice(0,3).map((item)=>{
							return(
								<Flex key={item.id} p='3' bg='#eee' borderRadius='5px' direction='column'>
									<Text>{item.name}</Text>
									<Text>{item.mobile}</Text>
								</Flex>
							)
						})}
						<Button bg='#009393' color='#fff' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
					</Flex>
				}
				</Flex>
			</Flex>
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

		await Suggest_Industry().then((response)=>{
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

/**
<Flex direction='column' gap='2'>
	<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
		<Text fontWeight='bold' fontSize='20px'>Products</Text>
		<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('inventory')})} cursor='pointer'>view all</Text>
	</Flex>
	<Flex direction='column' gap='2'>
		<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
			<Text>Cereals</Text>
			<Text>Agriculture</Text>
		</Flex>
		<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
			<Text>Fertilisers</Text>
			<Text>Agriculture</Text>
		</Flex>
	</Flex>
</Flex>

*/