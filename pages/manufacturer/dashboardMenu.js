/*useHooks*/
import React,{useState} from 'react';
import {useRouter} from 'next/router';
/*chakea-ui*/
import {Flex,Text,Input,Button,Image,useToast,Textarea} from '@chakra-ui/react';
/*icons*/
import {LocationCity,Add} from '@mui/icons-material/';
/*modals*/
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import AddNewDistributor from '../../components/modals/addNewDistributor.js';
import Suggest_Industry from '../api/control/suggest_industry.js'
import Suggest_Technology from '../api/control/suggest_technology.js'
import axios from 'axios';
import Cookies from 'universal-cookie';

function DashboardMenu({setCurrentValue,manufacturer_data}){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);
	const [addnewInd,setaddnewInd]=useState(false);
	const [addnewTech,setaddnewTech]=useState(false);

	const router = useRouter();
	const cookies = new Cookies();

	const id = manufacturer_data?._id
 	
 	const [code,set_code]=useState(false);

	const Generate_Code=async()=>{
  		const characters = '0123456789';
  		const result = ''
  		const charactersLength = characters.length

  		for (const i = 0;i<6;i++){
  			result += characters.charAt(Math.floor(Math.random() * charactersLength));
  		}
  		cookies.set('verification_code', result, { path: '/' });
  		return result
  	}
	
	const handle_verify_email=async()=>{
		const code = await Generate_Code()
		const email_payload={
			email: manufacturer_data.email_of_company,
			code: code
		}
		await axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/email_verification",email_payload).then(()=>{
			router.push(`/verify/${'manufacturer'}/${manufacturer_data._id}`)
		})
	}
	return (
		<Flex p='2' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='manufacturer'/>
			<AddNewDistributor isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible} id={id}/>
			<Flex gap='3'>
				{manufacturer_data?.profile_photo_url == ''? 
					<LocationCity style={{fontSize:'150px',padding:'10px'}}/> 
				: 
					<Image boxSize='150px' src={manufacturer_data?.profile_photo_url} alt='profile photo' boxShadow='lg'/>
				}
				<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='28px' fontWeight='bold' color='#009393'>{manufacturer_data?.company_name}</Text>
					<Text>Email: {manufacturer_data?.email_of_company}</Text>
					<Text>Mobile: {manufacturer_data?.mobile_of_company}</Text>	
					<Text>Address: {manufacturer_data?.address_of_company}</Text>
				</Flex>
			</Flex>
			{manufacturer_data?.valid_email_status == false || !manufacturer_data?.valid_email_status?
				<Flex direction='column' gap='3' w='100%' bg='' p='2' borderRadius='5'>
					<Text fontSize='28px'fontWeight='bold' color='#009393'>Verify your email.</Text>
					<Text >Get access to all features and be an active user on our platform by verifying your email.</Text>
					<Text >It wont take more than a minute.</Text>
					<Flex gap='2'>
						<Button bg='#fff' border='1px solid #000' color='#000' onClick={handle_verify_email}>Verify Email</Button>
					</Flex>
				</Flex>
			: null
			}
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
	const toast = useToast();
	const [suggest_industry_title,set_suggest_industry_title]=useState(false);
	const [suggest_industry_description,set_suggest_industry_description]=useState(false);

	const payload = {
		title: suggest_industry_title,
		description: suggest_industry_description
	}

	const handle_suggest_industry=async()=>{
		if (suggest_industry_title == '' || suggest_industry_description == ''){
			toast({
              title: '',
              description: `Ensure all inputs are filled`,
              status: 'info',
              isClosable: true,
            });
            return;
		}else{
			await Suggest_Industry(payload).then((response)=>{
				toast({
	              title: '',
	              description: `${payload.title} has been suggested successfully.`,
	              status: 'info',
	              isClosable: true,
	            });
			}).catch((err)=>{
				toast({
	              title: '',
	              description: err.response.data,
	              status: 'error',
	              isClosable: true,
	            });
			})
		}
		setaddnewInd(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Industry</Text>
			<Input bg='#fff' type='text' placeholder='Title of Industry' onChange={((e)=>{set_suggest_industry_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Industry' onChange={((e)=>{set_suggest_industry_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_industry}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{setaddnewInd(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const AddNewTechnology=({setaddnewTech})=>{
	const toast = useToast();
	const [suggest_technology_title,set_suggest_technology_title]=useState(false);
	const [suggest_technology_description,set_suggest_technology_description]=useState(false);

	const payload = {
		title: suggest_technology_title,
		description: suggest_technology_description
	}

	const handle_suggest_technology=async()=>{
		if (suggest_technology_title == '' || suggest_technology_description == ''){
			toast({
              title: '',
              description: `Ensure all inputs are filled`,
              status: 'info',
              isClosable: true,
            });
            return;
		}else{
			await Suggest_Technology(payload).then((response)=>{
				toast({
	              title: '',
	              description: `${payload.title} has been suggested successfully.`,
	              status: 'info',
	              isClosable: true,
	            });
			}).catch((err)=>{
				toast({
	              title: '',
	              description: err.response.data,
	              status: 'error',
	              isClosable: true,
	            });
			})
		}
		setaddnewTech(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Technology</Text>
			<Input bg='#fff' type='text' placeholder='Title of Technology' onChange={((e)=>{set_suggest_technology_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Technology' onChange={((e)=>{set_suggest_technology_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_technology}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{setaddnewTech(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}