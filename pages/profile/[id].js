//modules imports
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,InputGroup,InputRightElement,Select,Image,useToast} from '@chakra-ui/react';
import bcrypt from 'bcryptjs';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//icons-imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
//components imports
import Header from '../../components/Header.js';
import Delete_Account_Modal from '../../components/modals/accounts/delete_account_modal.js'
//api-calls
import Get_Client from '../api/auth/client/get_client.js'
import Edit_Client from '../api/auth/client/edit_client.js'
import Change_Password from '../api/auth/distributor/change_password.js'
import Delete_Client from '../api/auth/client/delete_client_account.js'
//utils
import {storage} from '../../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import axios from 'axios';

function Settings(){
	//utils
	const router = useRouter();
	const id = router.query;

	const cookies = new Cookies();
	const token = cookies.get('user_token');

	//states
	const [client_data,set_client_data]=useState("");
	const [uid,set_uid]=useState("");
	const [u_email,set_u_email]=useState("");
	const [edit,setedit]=useState(false);

	const [show, setShow] = useState(false);
  	
  	const [is_delete_account_Modalvisible,set_is_delete_account_Modalvisible]=useState(false)
	//functions
	const handleClick = () => setShow(!show);

	const Handle_Change_Password=async()=>{
		alert('success')
		// await Change_Password(password_payload).then(()=>{
		// 	alert('success')
		// })
	}
	//api calls'
	
	const Get_Client_Data=async(payload)=>{
		console.log(payload)
		if (!payload || payload._id == '' || payload.email == ''){
			return;
		}else{
			await Get_Client(payload).then((response)=>{
				console.log(response.data)
				set_client_data(response.data)
			})
		}
	}
	//useEffects
	
	useEffect(()=>{
		if(!token){
			alert('could not get userid')
		}else{
			const details = jwt_decode(token);
			//console.log(details)
			set_uid(details?.id)
			set_u_email(details?.email)
			const payload = {
				email_of_company : details?.email,
				_id: details?.id
			}
			//console.log(payload)
			Get_Client_Data(payload)
		}
	},[token])

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
			email: client_data.email_of_company,
			code: code
		}
		await axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/email_verification",email_payload).then(()=>{
			router.push(`/verify/${'client'}/${client_data._id}`)
		})
	}
	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Flex p='2' direction='column' gap='2' w='100%'>
				<Delete_Account_Modal is_delete_account_Modalvisible={is_delete_account_Modalvisible} set_is_delete_account_Modalvisible={set_is_delete_account_Modalvisible} client_data={client_data} acc_type='client'/>
				<Text fontSize='34px' fontWeight='bold'>Welcome,<br/> {client_data?.first_name} {client_data?.last_name}</Text>
				{client_data?.valid_email_status == false || !client_data?.valid_email_status?
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
				{edit ?
					<EditProfile setedit={setedit} client_data={client_data}/>
				:
					<Flex direction='column' gap='2'>
						<Flex gap='3' direction='column'>
							<Flex direction='column' gap='1' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='dark-lg'>
								<Text>Email: {client_data?.email_of_company}</Text>
								<Text>Mobile: {client_data?.mobile_of_company}</Text>	
								<Text>Gender: {client_data?.gender}</Text>
								<Text>Company name: {client_data?.company_name}</Text>
								<Text>Position: {client_data?.position}</Text>
								<Text>Address: {client_data?.address}</Text>
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
								<Button bg='#ff' border='1px solid red' onClick={(()=>{set_is_delete_account_Modalvisible(true)})}>Delete Account</Button>
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
	//utils
	const toast = useToast();
	const cookies = new Cookies();
	//states		
		const [first_name,set_first_name]=useState(client_data?.first_name);
		const [last_name,set_last_name]=useState(client_data?.last_name);
		const [email_of_company,set_email_of_company]=useState(client_data?.email_of_company);
		const [mobile_of_company,set_mobile_of_company]=useState(client_data?.mobile_of_company);
		const [address_of_company,set_address_of_company]=useState(client_data?.address_of_company);
		const [company_name,set_company_name]=useState(client_data?.company_name);
		const [gender,set_gender]=useState(client_data?.gender);
		const [position,set_position]=useState(client_data?.position);
		const [profile_photo,set_profile_photo]=useState('');
		const [profile_photo_url,set_profile_photo_url]=useState(client_data?.profile_photo_url);

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
			profile_photo_url
		}
	//api calls
	const profile_upload_function=async()=>{
		/**handles uploads profile image functions to firebase storage**/
		console.log(profile_photo)
		if (profile_photo == ''){
			toast({
				title: '',
				description: 'Missing image details',
				status: 'info',
				isClosable: true,
			});
		}else{
			await handle_profile_image_upload().then((res)=>{
				if (res == null || res == undefined || !res){
					return;
				}else{
					const img_payload = {
						_id: client_data?._id,
						profile_photo_url: res
					}
					Edit_Client(img_payload).then(()=>{
						toast({
							title: '',
							description: 'successfuly updated your profile photo',
							status: 'success',
							isClosable: true,
						});
					}).then(()=>{
						setedit(false)
					}).catch((err)=>{
						toast({
							title: '',
							description: `${err.response.data}`,
							status: 'error',
							isClosable: true,
						});
					})
				}
			})
		}
	}

	const handle_profile_image_upload=async()=>{
		/**uploads profile image to firebase storage**/
		if (profile_photo?.name == undefined){
			toast({
				title: 'upload process cancelled',
				description: 'could not find image selected',
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			console.log(profile_photo?.name)
			const profile_photo_documentRef = ref(storage, `profile_photo/${profile_photo?.name + v4()}`);
			const snapshot= await uploadBytes(profile_photo_documentRef,profile_photo)
			const file_url = await getDownloadURL(snapshot.ref)
			cookies.set('profile_photo_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_Edit_Profile=async()=>{
		await Edit_Client(payload).then(()=>{
			toast({
				title: '',
				description: 'Your account has been edited successfully, refresh to see changes',
				status: 'success',
				isClosable: true,
			});
		}).then(()=>{
			//console.log(payload)
			setedit(false)
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	return(	
		<Flex gap='3' direction='column' overflowY='scroll' h='80vh'>
			{client_data?.profile_photo_url == '' || !client_data?.profile_photo_url? 
				<Flex gap='2' >
					<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
					<Flex direction='column' gap='2'>
						<Text>Select Image to set as Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={profile_photo == ''? true: false}>Upload profile photo</Button>
					</Flex>
				</Flex>
			: 
				<Flex gap='2' >
					<Image boxSize='200px' src={client_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
					<Flex direction='column' gap='2'>
						<Text>Select Image to change Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={profile_photo == ''? true: false}>Change profile photo</Button>
					</Flex>
				</Flex>
			}
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