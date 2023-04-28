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
import {Visibility,VisibilityOff} from '@mui/icons-material'
//components imports
import Delete_Account_Modal from '../../components/modals/accounts/delete_account_modal.js'
//api-calls
import Edit_Salesperson from '../api/auth/salesperson/edit_salesperson_account.js'
//utils
import {storage} from '../../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

function Settings({salesperson_data}){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);

	const [is_delete_account_Modalvisible,set_is_delete_account_Modalvisible]=useState(false)

	const router = useRouter();
	
	const [edit,setedit]=useState(false);
	const [new_password,set_new_password]=useState(salesperson_data?.password)

const Handle_Change_Password=async()=>{
		router.push("/password_reset")
	}

	return(
		<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
			<Delete_Account_Modal is_delete_account_Modalvisible={is_delete_account_Modalvisible} set_is_delete_account_Modalvisible={set_is_delete_account_Modalvisible} salesperson_data={salesperson_data} acc_type='salesperson'/>
			<Text fontSize='34px' textDecoration='1px solid underline #009393' fontWeight='bold'>MyProfile</Text>
			{edit ?
				<EditProfile setedit={setedit} salesperson_data={salesperson_data}/>
			:
				<Flex direction='column' gap='2'>
					<Flex gap='3' direction='' align='center'>
						{salesperson_data?.profile_photo_url == ''? 
							<AccountCircleIcon style={{fontSize:'150px',padding:'10px'}}/> 
						: 
							<Flex gap='2' >
								<Image boxSize='200px' src={salesperson_data?.profile_photo_url} alt='profile photo' borderRadius='5' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
						<Flex direction='column' gap='1' w='100%' bg='#fff' p='2' borderRadius='5' boxShadow='lg'>
							<Text  p='1' borderRadius='5' fontSize='24px' fontWeight='bold' color='#009393'>{salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
							<Text p='1' borderRadius='5'>Email: {salesperson_data?.email_of_salesperson}</Text>
							<Text p='1' borderRadius='5'>Mobile: {salesperson_data?.mobile_of_salesperson}</Text>
							<Text p='1' borderRadius='5'>Address: {salesperson_data?.address}</Text>
							<Button onClick={(()=>{setedit(true)})} bg='#009393' color='#fff'>Edit Profile</Button>	
						</Flex>
					</Flex>
					<Flex direction='column' gap='1' w='100%' bg='#fff' p='2' borderRadius='5'>
						<Text fontWeight='bold'>Bio</Text>
						<Text p='1' borderRadius='5'>{salesperson_data?.bio}</Text>
					</Flex>
					<Flex direction='column' gap='1' w='100%' bg='#fff' p='2' borderRadius='5'>
						<Text fontWeight='bold'>Payment Details</Text>
						<Text p='1' borderRadius='5'>{salesperson_data?.payment_method}</Text>
					</Flex>
					<Flex borderBottom='1px solid #000' p='1' direction='column'>
						<Text fontSize='20px' fontWeight='bold'>Security</Text>
						<Flex gap='2' direction='column' >
							<Text fontWeight='bold'>Password</Text>
							<InputGroup size='md'>
								<Input
								pr='4.5rem'
								type={show ? 'text' : 'password'} value={new_password} placeholder='password' onChange={((e)=>{set_new_password(e.target.value)})}
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
	)
}

export default Settings;

const EditProfile=({setedit,salesperson_data})=>{
	const toast = useToast();
	const cookies = new Cookies();
	const [first_name,set_first_name]=useState(salesperson_data?.first_name);
	const [last_name,set_last_name]=useState(salesperson_data?.last_name);
	const [mobile,set_mobile]=useState(salesperson_data?.mobile_of_salesperson);
	const [address,set_address]=useState(salesperson_data?.address);
	const [company_name,set_company_name]=useState(salesperson_data?.company_name);
	const [bio,set_bio]=useState(salesperson_data?.bio);
	const [payment_method,set_payment_method]=useState(salesperson_data?.payment_method);
	const [profile_photo,set_profile_photo]=useState('');
	const [profile_photo_url,set_profile_photo_url]=useState(salesperson_data?.profile_photo_url);

	const payload = {
		_id: salesperson_data?._id,
		first_name,
		last_name,
		mobile,
		address,
		bio,
		payment_method,
		company_name,
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
						_id: salesperson_data?._id,
						profile_photo_url: res
					}
					Edit_Salesperson(img_payload).then(()=>{
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
		if(salesperson_data?.suspension_status){
			//console.log(salesperson_data?.verification_status)
			toast({
				title: 'Your account is currently suspended.',
				description: 'reach out to support for guidance by emailing us at help@prokemia.com',
				status: 'error',
				isClosable: true,
			});
		}else{
			await Edit_Salesperson(payload).then(()=>{
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
			});
		}
	}
	return(	
		<Flex gap='3' direction='column' overflowY='scroll' h='80vh'>
			{salesperson_data?.profile_photo_url == '' || !salesperson_data?.profile_photo_url? 
				<Flex gap='2' >
					<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
					<Flex direction='column' gap='2'>
						<Text>Select Image to set as Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={profile_photo !== ''? true: false}>Upload profile photo</Button>
					</Flex>
				</Flex>
			: 
				<Flex gap='2' >
					<Image boxSize='200px' src={salesperson_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
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
						<Input type='text' placeholder={salesperson_data?.first_name} variant='filled' onChange={((e)=>{set_first_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Last_Name</Text>
						<Input type='text' placeholder={salesperson_data?.last_name} variant='filled' onChange={((e)=>{set_last_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Bio</Text>
						<Input type='tel' placeholder={salesperson_data?.bio} variant='filled' onChange={((e)=>{set_bio(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' placeholder={salesperson_data?.mobile_of_salesperson} variant='filled' onChange={((e)=>{set_mobile(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Company_name</Text>
						<Input type='text' placeholder={salesperson_data?.company_name} variant='filled' onChange={((e)=>{set_company_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Address</Text>
						<Input type='text' placeholder={salesperson_data?.address} variant='filled' onChange={((e)=>{set_address(e.target.value)})}/>
					</Flex>
					<Flex direction='column'>
						<Text>Payment method</Text>
						<Input type='text' placeholder={salesperson_data?.payment_method} variant='filled' onChange={((e)=>{set_payment_method(e.target.value)})}/>
					</Flex>
					<Flex gap='2'>
						<Button onClick={handle_Edit_Profile} bg='#009393' color='#fff' flex='1'>Save</Button>
						<Button onClick={(()=>{setedit(false)})} bg='#fff' color='#000' border='1px solid red' flex='1'>Cancel</Button>
					</Flex>
				</Flex>
			</Flex>
	)
}
