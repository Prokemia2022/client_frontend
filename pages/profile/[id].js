//modules imports
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,InputGroup,InputRightElement,Select} from '@chakra-ui/react';
import bcrypt from 'bcryptjs';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//icons-imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
//components imports
import Header from '../../components/Header.js';
//api-calls
import Get_Client from '../api/auth/client/get_client.js'
import Edit_Client from '../api/auth/client/edit_client.js'
import Change_Password from '../api/auth/distributor/change_password.js'
import Delete_Client from '../api/auth/client/delete_client_account.js'

function Settings(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);

  	const id = router.query
  	
	const payload = {
		_id: id.id
	}

	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [active,setActive]=useState(false);
	const [edit,setedit]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	

	const cookies = new Cookies();
	const token = cookies.get('user_token');
 
	const [account,setAccount]=useState('user')
	const [client_data,set_client_data]=useState("");

	useEffect(()=>{
		if(!token){
			alert('could not get userid')
		}else{
			const details = jwt_decode(token)
			console.log(details)
			const payload = {
				email_of_company : details?.email,
				_id: details.id
			}
			Get_Client(payload).then((response)=>{
				console.log(response.data)
				set_client_data(response.data)
			})
		}
	},[payload])
	
	// const get_Data=async(payload)=>{
	// 	console.log(payload)
	// 	await Get_Client(payload).then((response)=>{
	// 		console.log(response.data)
	// 		set_client_data(response.data)
	// 	})
	// }
	const Handle_Change_Password=async()=>{
		alert('success')
		// await Change_Password(password_payload).then(()=>{
		// 	alert('success')
		// })
	}

	const Handle_Delete_Client=async()=>{
		if(!payload && id !== undefined){
			await Delete_Client(payload).then(()=>{
				cookies.remove('user_token', { path: '/' });
				router.push("/")
				alert('success')
				
			})
		}else{
			alert('error in deleteing account')
		}
	}
	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Flex p='2' direction='column' gap='2' w='100%'>
				<Text fontSize='34px' fontWeight='bold'>Welcome,<br/> {client_data?.first_name} {client_data?.last_name}</Text>
				{edit ?
					<EditProfile setedit={setedit} client_data={client_data}/>
				:
					<Flex direction='column' gap='2'>
						<Flex gap='3' direction='column'>
							<Flex direction='column' gap='1' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='dark-lg'>
								<Text p='1' borderRadius='5'>Email: {client_data?.email_of_company}</Text>
								<Text p='1' borderRadius='5'>Mobile: {client_data?.mobile_of_company}</Text>	
								<Text p='1' borderRadius='5'>Gender: {client_data?.gender}</Text>
								<Text p='1' borderRadius='5'>Company name: {client_data?.company_name}</Text>
								<Text p='1' borderRadius='5'>Position: {client_data?.position}</Text>
								<Text p='1' borderRadius='5'>Address: {client_data?.address}</Text>
								
							</Flex>
							<Button onClick={(()=>{setedit(true)})} bg='#009393' color='#fff'>Edit Profile</Button>	
						</Flex>
						<Flex borderBottom='1px solid #000' p='1' direction='column'>
							<Text fontSize='20px' fontWeight='bold'>Security</Text>
							<Flex gap='2' direction='column' >
								<Text fontWeight='bold'>Password</Text>
								<InputGroup size='md'>
									<Input
									pr='4.5rem'
									type={show ? 'text' : 'password'} placeholder='password' onChange={((e)=>{set_new_password(e.target.value)})}
									/>
										<InputRightElement width='4.5rem'>
										<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
										{show ? <VisibilityOff/> : <Visibility/>}
										</Button>
									</InputRightElement>
								</InputGroup>
								<Button bg='#ff' border='1px solid #000' onClick={Handle_Change_Password}>Change Password</Button>
							</Flex>
						</Flex>
						<Flex p='1' color='red' direction='column'>
							<Text fontSize='20px' color='red' fontWeight='bold' >Delete Account</Text>
							<Flex direction='column'>
								<Text>By deleting your account , all your information, products and activities in our platform will be erased as your account will be permamnetly deleted and will not be restored.</Text>
								<Button bg='#ff' border='1px solid red' onClick={Handle_Delete_Client}>Delete Account</Button>
							</Flex>
						</Flex>
					</Flex>
				}
			</Flex>
		</Flex>
	)
}

export default Settings;

const EditProfile=({setedit,client_data})=>{
	const [first_name,set_first_name]=useState(client_data?.first_name);
	const [last_name,set_last_name]=useState(client_data?.last_name);
	const [email_of_company,set_email_of_company]=useState(client_data?.email_of_company);
	const [mobile_of_company,set_mobile_of_company]=useState(client_data?.mobile_of_company);
	const [address_of_company,set_address_of_company]=useState(client_data?.address_of_company);
	const [company_name,set_company_name]=useState(client_data?.company_name);
	const [gender,set_gender]=useState(client_data?.gender);
	const [position,set_position]=useState(client_data?.position);

	const payload = {
		_id: client_data?._id,
		first_name,
		last_name,
		email_of_company,
		mobile_of_company,
		address_of_company,
		company_name,
		gender,
		position,
	}
	const handle_Edit_Profile=async()=>{
		await Edit_Client(payload).then(()=>{
			console.log(payload)
			alert('success')
			setedit(false)
		})
		
	}
	return(	
		<Flex gap='3' direction='column' overflowY='scroll' h='80vh'>
			<Flex gap='2' align='center'>
				<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
				<Text>Edit profile Photo</Text>
			</Flex>
			<Flex direction='column' gap='3' w='100%'>
					<Flex direction='column'>
						<Text>First_Name</Text>
						<Input type='text' placeholder={client_data?.first_name} variant='filled' onChange={((e)=>{set_first_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Last_Name</Text>
						<Input type='text' placeholder={client_data?.last_name} variant='filled' onChange={((e)=>{set_last_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' placeholder={client_data?.mobile_of_company} variant='filled' onChange={((e)=>{set_mobile_of_company(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Company_name</Text>
						<Input type='text' placeholder={client_data?.company_name} variant='filled' onChange={((e)=>{set_company_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Position</Text>
						<Input type='text' placeholder={client_data?.position} variant='filled' onChange={((e)=>{set_position(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Gender</Text>
						<Select variant='filled' placeholder='Select Gender' onChange={((e)=>{set_gender(e.target.value)})}>
				          <option value='Male'>Male</option>
				          <option value='Female'>Female</option>
				          <option value='I would rather not say'>I would rather not say</option>
				        </Select>
					</Flex>
					<Flex direction='column'>
						<Text>Address</Text>
						<Input type='text' placeholder={client_data?.address_of_company} variant='filled' onChange={((e)=>{set_address_of_company(e.target.value)})}/>
					</Flex>
					<Button onClick={handle_Edit_Profile} bg='#009393' color='#fff'>Save</Button>
				</Flex>
			</Flex>
	)
}
