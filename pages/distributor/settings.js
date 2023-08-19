//modules imports
import React,{useState} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,InputGroup,InputRightElement,Image,useToast} from '@chakra-ui/react';
import bcrypt from 'bcryptjs';
import Cookies from 'universal-cookie';
//icons-imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
//components imports
import Delete_Account_Modal from '../../components/modals/accounts/delete_account_modal.js'
//api-calls
import Edit_Distributor from '../api/auth/distributor/edit_distributor.js'
import Change_Password from '../api/auth/distributor/change_password.js'
//utils
import {storage} from '../../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
 
function Settings({distributor_data,set_refresh_data}){
	//utils
	const router = useRouter();
	const cookies = new Cookies();
	//states

  	const [is_delete_account_Modalvisible,set_is_delete_account_Modalvisible]=useState(false)
	//functions
	//api calls

	const [edit,setedit]=useState(false);
	const [new_password,set_new_password]=useState(distributor_data?.password)	

	const payload = {
		_id : distributor_data?._id,
	}

	const Handle_Change_Password=async()=>{
		router.push("/password_reset")
	}

	return(
		<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
			<Delete_Account_Modal is_delete_account_Modalvisible={is_delete_account_Modalvisible} set_is_delete_account_Modalvisible={set_is_delete_account_Modalvisible} distributor_data={distributor_data} acc_type='distributors'/>
			<Text fontSize='34px' fontWeight='bold'>MyProfile</Text>
			{edit ?
				<EditProfile setedit={setedit} distributor_data={distributor_data} set_refresh_data={set_refresh_data}/>
			:
				<Flex direction='column' gap='2'>
					<Flex gap='3' direction='column'>
						<Flex direction='column' gap='1' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='lg'>
							<Text p='1' fontWeight='bold'>Company Details</Text>
							<Text p='1' borderRadius='5'>Email: {distributor_data?.email_of_company}</Text>
							<Text p='1' borderRadius='5'>Mobile: {distributor_data?.mobile_of_company}</Text>
							<Text p='1' borderRadius='5'>Address: {distributor_data?.address_of_company}</Text>
						</Flex>
						<Flex direction='column' gap='1' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='lg'>
							<Text p='1' fontWeight='bold'>Description</Text>
							<Text p='1' borderRadius='5'>{distributor_data?.description}</Text>
						</Flex>
						<Flex direction='column' gap='1' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='lg'>
							<Text p='1' fontWeight='bold'>Key contact details</Text>
							<Text p='1' borderRadius='5'>Name: {distributor_data?.contact_person_name}</Text>
							<Text p='1' borderRadius='5'>Email: {distributor_data?.contact_email}</Text>
							<Text p='1' borderRadius='5'>Mobile: {distributor_data?.contact_mobile}</Text>
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
								type={'password'} value={new_password} placeholder='password' onChange={((e)=>{set_new_password(e.target.value)})}
								/>
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
	)
}

export default Settings;

const EditProfile=({setedit,distributor_data,set_refresh_data})=>{
	//utils
	const cookies = new Cookies();
	const toast = useToast();
	//states
	//apis
	//functions
	
	const [contact_person_name,set_contact_person_name]=useState(distributor_data?.contact_person_name);
	const [contact_mobile,set_contact_mobile]=useState(distributor_data?.contact_mobile);
	const [contact_email,set_contact_email]=useState(distributor_data?.contact_email);
	const [mobile_of_company,set_mobile_of_company]=useState(distributor_data?.mobile_of_company);
	const [address_of_company,set_address_of_company]=useState(distributor_data?.address_of_company);
	const [company_name,set_company_name]=useState(distributor_data?.company_name);
	const [description,set_description]=useState(distributor_data?.description);
	const [profile_photo,set_profile_photo]=useState('');
	const [profile_photo_url,set_profile_photo_url]=useState(distributor_data?.profile_photo_url);

	const payload = {
		_id: distributor_data?._id,
		contact_person_name,
		contact_mobile,
		contact_email,
		mobile_of_company,
		address_of_company,
		company_name,
		description,
		profile_photo_url
	}

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
						_id: distributor_data?._id,
						profile_photo_url: res
					}
					Edit_Distributor(img_payload).then(()=>{
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
		if (profile_photo.name == undefined){
			toast({
				title: 'upload process cancelled',
				description: 'could not find image selected',
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			console.log(profile_photo.name)
			const profile_photo_documentRef = ref(storage, `profile_photo/${profile_photo?.name + v4()}`);
			const snapshot= await uploadBytes(profile_photo_documentRef,profile_photo)
			const file_url = await getDownloadURL(snapshot.ref)
			cookies.set('profile_photo_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_Edit_Profile=async()=>{
		console.log(payload)
		await Edit_Distributor(payload).then(()=>{
			toast({
				title: '',
				description: 'Your account has been edited successfully, refresh to see changes',
				status: 'success',
				isClosable: true,
			});
		}).then(()=>{
			set_refresh_data(`${payload?.company_name} edited`)
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
			{distributor_data?.profile_photo_url == '' || !distributor_data?.profile_photo_url? 
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
					<Image boxSize='200px' src={distributor_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
					<Flex direction='column' gap='2'>
						<Text>Select Image to change Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={profile_photo == ''? true: false}>Change profile photo</Button>
					</Flex>
				</Flex>
			}
			<Flex direction='column' gap='3' w='100%'>
					<Text p='1' fontWeight='bold'>Company Details</Text>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' placeholder={distributor_data?.mobile_of_company} variant='filled' onChange={((e)=>{set_mobile_of_company(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Company_name</Text>
						<Input type='text' placeholder={distributor_data?.company_name} variant='filled' onChange={((e)=>{set_company_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Bio</Text>
						<Input type='text' placeholder={distributor_data?.description} variant='filled' onChange={((e)=>{set_description(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Address</Text>
						<Input type='text' placeholder={distributor_data?.address_of_company} variant='filled' onChange={((e)=>{set_address_of_company(e.target.value)})}/>
					</Flex>
					<Text p='1' fontWeight='bold'>Key contact Details</Text>
					<Flex direction='column'>
						<Text>Name</Text>
						<Input type='text' placeholder={distributor_data?.contact_person_name} variant='filled' onChange={((e)=>{set_contact_person_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Email</Text>
						<Input type='email' placeholder={distributor_data?.contact_email} variant='filled' onChange={((e)=>{set_contact_email(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' placeholder={distributor_data?.contact_mobile} variant='filled' onChange={((e)=>{set_contact_mobile(e.target.value)})}/>
					</Flex>
					<Flex gap='2' >
						<Button onClick={handle_Edit_Profile} bg='#009393' color='#fff' flex='1'>Save</Button>
						<Button onClick={(()=>{setedit(false)})} bg='#fff' border='1px solid red' color='#000' flex='1'>Cancel</Button>						
					</Flex>
				</Flex>
			</Flex>
	)
}
