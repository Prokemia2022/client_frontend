/*useHooks*/
import React,{useState,useEffect} from 'react';
/*icons*/
import {LocationCity,Add} from '@mui/icons-material/';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
/*modals*/
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import AddNewDistributor from '../../components/modals/addNewDistributor.js';
//api
import Suggest_Industry from '../api/control/suggest_industry.js'
import Suggest_Technology from '../api/control/suggest_technology.js';
import Email_Verification from '../api/email_handler/email_verification.js';
//utils
import {Flex,Text,Input,Button,Image,useToast,Textarea} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';



export default function DashboardMenu({manufacturer_data}){
	/**
	 * DashboardMenu: Dashboard for the manufacturer profile.
	*/
	
	//modals state handlers
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);

	//category suggestion form visibility handlers.
	const [_suggest_new_ind,set_suggest_new_ind]=useState(false);
	const [_suggest_new_technology,set_suggest_new_technology]=useState(false);

	//utils
	const router = useRouter();
	const cookies = new Cookies();
	const toast = useToast();

	const id = manufacturer_data?._id;

	const Generate_Code=async()=>{
		/**
		 * Generates a random code sent to client.
		 * Returns:
		 * 			sets the code to cookies.
		 * 			returns the code.
		 */
  		const characters = '0123456789';
  		let result = ''
  		const charactersLength = characters.length

  		for (let i = 0;i<6;i++){
  			result += characters.charAt(Math.floor(Math.random() * charactersLength));
  		}
  		cookies.set('verification_code', result, { path: '/' });
  		return result;
  	}
	//console.log(typeof(manufacturer_data?.valid_email_status))
	
	const Handle_Email_Verification=async()=>{
		/**
		 * Handle_Email_Verification: handles the sending of the code to the client.
		 * Props:
		 * 		code (string): contains the code sent.
		 * 		email_payload (obj): payload sent to the api call.
		 */
		const code = await Generate_Code()
		const email_payload={
			email: manufacturer_data.email_of_company,
			code: code,
			link: `https://prokemia.com/verify/${'manufacturer'}/${manufacturer_data._id}`
		}
		await Email_Verification(email_payload).then(()=>{
			router.push(`/verify/${'manufacturer'}/${manufacturer_data._id}`)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while verifying your account.`,
				status: 'error',
				isClosable: true,
			});
		});
	}
	const isCompleteProfile=async()=>{
		//console.log(manufacturer_data);
		const contact_email = manufacturer_data?.contact_email;
		const address_of_company = manufacturer_data?.address_of_company;
		const mobile_of_company = manufacturer_data?.mobile_of_company;
		const contact_person_name = manufacturer_data?.contact_person_name;
		const description = manufacturer_data?.description;
		const profile_photo_url = manufacturer_data?.profile_photo_url;
		if (contact_email == '' || address_of_company == '' || mobile_of_company == '' || contact_person_name == '' || description == "" || profile_photo_url == ''){
			toast({
				title: '',
				variant: 'subtle',
				position: 'top-left',
				description: `Your profile is incomplete, you need to fill company details for customers to understand what you do.`,
				status: 'info',
				isClosable: true,
			});
		}else{
			return;
		}
	}
	useEffect(()=>{
		isCompleteProfile()
	},[manufacturer_data])
	return (
		<Flex p='2' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewExpertsModal router={router} isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='manufacturer'/>
			<AddNewDistributor isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible} id={id}/>
			{!manufacturer_data?.valid_email_status?
				<Flex w='100%' p='1' borderRadius='5' bg='#009393' align='center' justify='space-between' color='#fff'>
					<Flex align='center' gap='2'>
						<InfoOutlinedIcon />
						<Flex direction='column'>
							<Text fontSize='18px' fontWeight='bold'>Verify your email.</Text>
							<Text fontSize={'14px'}>Get access to all features.</Text>
						</Flex>
					</Flex>
					<Button bg='#fff' color='#000' onClick={Handle_Email_Verification}>Verify Email</Button>
				</Flex>
			: null
			}
			<Flex gap='2' align={'center'}>
				{manufacturer_data?.profile_photo_url == ''? 
					<LocationCity style={{fontSize:'100px',padding:'5px'}}/> 
				: 
					<Image boxSize='150px' src={manufacturer_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit={'cover'}/>
				}
				<Flex direction='column' gap='1' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg' fontSize={'14px'}>
					<Text fontSize='28px' fontWeight='bold' color='#009393'>{manufacturer_data?.company_name}</Text>
					<Text>Email: {manufacturer_data?.email_of_company}</Text>
					<Text>Mobile: {manufacturer_data?.mobile_of_company}</Text>	
					<Text>Address: {manufacturer_data?.address_of_company}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2' bg='#eee' p='2' w='100%' borderRadius='8' boxShadow='lg'>
					<Text fontSize='24px' fontWeight='bold' color='#009393'>Description</Text>
					<Text>{manufacturer_data?.description}</Text>
				</Flex>
			<Flex gap='3' direction='column'>
				<Button bg='#009393' color='#fff' onClick={(()=>{router.push('/product/add_product')})}><Add/>Add new Product</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add new Experts</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
			</Flex>
			<Text mb='0'>Operating in an industry or Technology not included in our options?</Text>
			{_suggest_new_ind || _suggest_new_technology ? 
				<>	{_suggest_new_ind ? <Suggest_New_Industry set_suggest_new_ind={set_suggest_new_ind}/> : <Suggest_New_Technology set_suggest_new_technology={set_suggest_new_technology}/>} </>
				:
				<Flex cursor='pointer' gap='2' direction='column'>
					<Text color='#009393' onClick={(()=>{set_suggest_new_ind(true)})}>Suggest a new Industry</Text>
					<Text color='#009393' onClick={(()=>{set_suggest_new_technology(true)})}>Suggest a new Technology</Text>
				</Flex>
			}

		</Flex>
	)
}

const Suggest_New_Industry=({set_suggest_new_ind})=>{
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
		set_suggest_new_ind(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Industry</Text>
			<Input bg='#fff' type='text' placeholder='Title of Industry' onChange={((e)=>{set_suggest_industry_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Industry' onChange={((e)=>{set_suggest_industry_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_industry}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{set_suggest_new_ind(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const Suggest_New_Technology=({set_suggest_new_technology})=>{
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
		set_suggest_new_technology(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Technology</Text>
			<Input bg='#fff' type='text' placeholder='Title of Technology' onChange={((e)=>{set_suggest_technology_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Technology' onChange={((e)=>{set_suggest_technology_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_technology}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{set_suggest_new_technology(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}