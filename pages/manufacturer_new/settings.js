import React, { useEffect, useState } from "react";
import {
    Text, 
    Box, 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    Input,
    Textarea,
    HStack,
    Select,
    Divider,
    Wrap,
    Button,
    Tooltip,
    useToast,
    Avatar,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Alert,
    AlertTitle,
    AlertDescription,
    Switch,
    AlertIcon,
    Heading,
    AvatarBadge,
    Flex,
    InputGroup,
    PopoverHeader,
    useDisclosure,
} from '@chakra-ui/react';
//utils
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//utils
import {storage} from '../../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
 
//components
//api-calls
import Edit_Manufacturer from '../api/auth/manufacturer/edit_manufacturer.js'
//icons
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import Delete_Account_Modal from "../../components/modals/accounts/delete_account_modal.js";


export default function Settings({client_data,set_refresh_data,is_complete_profile}) {
    //utils
    const cookies = new Cookies();
    const toast = useToast();
    const router = useRouter();
    const { onOpen, onClose, isOpen } = useDisclosure()

	const [company_name,set_company_name]=useState(client_data?.company_name);
	const [description,set_description]=useState(client_data?.description);
	const [mobile_of_company,set_mobile_of_company]=useState(client_data?.mobile_of_company);
    const [email_of_company,set_email_of_company]=useState(client_data?.email_of_company);
    const [address_of_company,set_address_of_company]=useState(client_data?.address_of_company);
    //contact person details
    const [contact_person_name,set_contact_person_name]=useState(client_data?.contact_person_name);
	const [contact_mobile,set_contact_mobile]=useState(client_data?.contact_mobile);
	const [contact_email,set_contact_email]=useState(client_data?.contact_email);
	const [profile_photo,set_profile_photo]=useState('');
	const [profile_photo_url,set_profile_photo_url]=useState(client_data?.profile_photo_url);

    const [profile_edit,set_profile_edit]=useState(false);

    const [is_delete_account_Modalvisible,set_is_delete_account_Modalvisible]=useState(false)

    const payload = {
		_id: client_data?._id,
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
						_id: client_data?._id,
						profile_photo_url: res
					}
					Edit_Manufacturer(img_payload).then(()=>{
						toast({
							title: '',
							description: 'successfuly updated your profile photo',
							status: 'success',
							isClosable: true,
						});
					}).then(()=>{
                        set_profile_photo('')
                        set_refresh_data('successfuly updated your profile photo')
						set_profile_edit(false)
					}).catch((err)=>{
                        console.log(err)
						toast({
							title: '',
							description: `error while updating your profile photo`,
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

    const Handle_Change_Password=async()=>{
		router.push(`/password_reset?email=${client_data?.email_of_company}`)
	}

	const handle_Edit_Profile=async()=>{
        if (
                company_name.trim().length == 0 || 
                description.trim().length == 0 || 
                description.trim().length == 0 || 
                mobile_of_company.trim().length == 0 || 
               
                address_of_company.trim().length == 0
                
            ){
            set_input_error(true)
        }else{
            set_refresh_data('')
            await Edit_Manufacturer(payload).then(()=>{
                toast({
                    title: '',
                    description: 'Your account has been edited successfully, ',
                    status: 'success',
                    isClosable: true,
                });
            }).then(()=>{
                set_refresh_data(`${payload?.company_name} edited`)
                set_profile_edit(false);
                set_input_error(false)
                onClose();
            }).catch((err)=>{
                console.log(err)
                toast({
                    title: '',
                    description: ``,
                    status: 'error',
                    isClosable: true,
                });
            })
        }
	}

    const [input_error,set_input_error]=useState(false);
  return (
    <Box>
        <Delete_Account_Modal is_delete_account_Modalvisible={is_delete_account_Modalvisible} set_is_delete_account_Modalvisible={set_is_delete_account_Modalvisible} client_data={client_data} acc_type='manufacturers'/>
        <Box>
            <Heading as='h3'>Profile</Heading>
        </Box>
        <HStack bg='#fff' p='4' alignItems='center' borderRadius={'md'} boxShadow={'sm'} mt='2'>
            <Avatar 
                size={{
                    base:'lg',
                    md:'2xl'
                }} 
                src={client_data?.profile_photo_url}
                onClick={(()=>set_profile_edit(!profile_edit))}
            >
                {profile_edit?
                    <CloseIcon onClick={(()=>set_profile_edit(!profile_edit))} style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gray",borderRadius:'20px',color:'#fff',cursor:'pointer'}}/>
                    :
                    <>
                        {is_complete_profile? 
                            <Popover isOpen={true} placement='auto'>
                                <PopoverTrigger>
                                    <EditIcon onClick={(()=>set_profile_edit(!profile_edit))} style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gray",borderRadius:'20px',color:'#fff',cursor:'pointer'}}/>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent bg='blue.200'>
                                    <PopoverArrow />
                                    <PopoverHeader>Almost there! lets' complete your profile</PopoverHeader>
                                    <PopoverCloseButton />
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        :
                        <EditIcon onClick={(()=>set_profile_edit(!profile_edit))} style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gray",borderRadius:'20px',color:'#fff',cursor:'pointer'}}/>
                        }
                    </>
                }
            </Avatar>
            {profile_edit? 
                    <Flex gap='2' >
                        <Flex direction='column' gap='2'>
                            <Text>Select Image to set as Profile Image</Text>
                            <Input p='1' type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
                            <Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={profile_photo == ''? true: false}>save photo</Button>
                        </Flex>
                    </Flex>
                : 
                    <Box >
                        <Text 
                            fontSize={{
                                base:'lg',
                                md:'xl'
                            }} 
                            fontWeight='bold'
                        >
                            {client_data?.company_name ? client_data?.company_name : '-'}
                        </Text>
                        <Text
                            fontSize={{
                                base:'sm',
                                md:'md'
                            }} 
                        >
                            {client_data?.email_of_company ? client_data?.email_of_company : '-'}
                        </Text>
                        <Text
                            fontSize={{
                                base:'sm',
                                md:'md'
                            }} 
                        >
                            {client_data?.address_of_company ? client_data?.address_of_company : '-'}
                        </Text>
                    </Box>
            }
        </HStack>
        {profile_edit?
            <Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Company details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>
                    <FormLabel>Name of the company</FormLabel>
                    <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                    {input_error && company_name.trim().length == 0 ? 
                        <FormErrorMessage>Name of the company is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && description.trim().length == 0 ? true : false}>
                    <FormLabel>What your company is about</FormLabel>
                    <Textarea type='text' placeholder={description} onChange={((e)=>{set_description(e.target.value)})}/>
                    {input_error && description.trim().length == 0 ? 
                        <FormErrorMessage>Description of the company is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && mobile_of_company.trim().length == 0 ? true : false}>
                    <FormLabel>Mobile of the company</FormLabel>
                    <Input type='tel' placeholder={mobile_of_company} onChange={((e)=>{set_mobile_of_company(e.target.value)})}/>
                    {input_error && mobile_of_company.trim().length == 0 ? 
                        <FormErrorMessage>mobile of the company is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && email_of_company.trim().length == 0 ? true : false}>
                    <FormLabel>Email of the company</FormLabel>
                    <Input type='email' placeholder={email_of_company} onChange={((e)=>{set_email_of_company(e.target.value)})}/>
                    {input_error && email_of_company.trim().length == 0 ? 
                        <FormErrorMessage>Email of the company is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && address_of_company.trim().length == 0 ? true : false}>
                    <FormLabel>Address of the company</FormLabel>
                    <Input type='text' placeholder={address_of_company} onChange={((e)=>{set_address_of_company(e.target.value)})}/>
                    {input_error && address_of_company.trim().length == 0 ? 
                        <FormErrorMessage>Address of the company is required.</FormErrorMessage>
                        : (
                        null
                    )}
                </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Account handler details</Text>
                    <Divider/>
                    <FormControl mt='2'>
                        <FormLabel>Name of the account handler</FormLabel>
                        <Input placeholder={contact_person_name? contact_person_name : '-'} type='text' onChange={((e)=>{set_contact_person_name(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Mobile of the account handler</FormLabel>
                        <Input type='tel' placeholder={contact_mobile? contact_mobile : '-'} onChange={((e)=>{set_contact_mobile(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Email of the account handler</FormLabel>
                        <Input type='email' placeholder={contact_email? contact_email : '-'} onChange={((e)=>{set_contact_email(e.target.value)})}/>
                    </FormControl>
                </Box>
                <Box mt='2' align='end' gap='2'>
                    <Tooltip hasArrow label='Save account details'  placement='auto'>
                        <Button ml={'2'} bg='#009393' color='#fff' onClick={handle_Edit_Profile} >Save profile</Button>
                    </Tooltip>
                </Box>
            </Box>
            :
            <Box>
                <HStack color='gray.400' bg='#fff' p='4' mt='2' borderRadius='md'>
                    <LockIcon/>
                    <Text fontSize='18px'>Security</Text>
                </HStack>
                <Box bg='#fff' p='4' mt='2' borderRadius='md'>
                    <HStack color='gray.400' fontSize='14px' justify='space-between' pb='2'>
                        <Text fontWeight='semibold'>Password</Text>
                        <Tooltip label='click to change your password'>
                            <Button onClick={Handle_Change_Password}>Change Password</Button>
                        </Tooltip>
                    </HStack>
                    <Divider/>
                    <Box color='gray.400' fontSize='14px' mt='2'>
                        <Text fontWeight='semibold'>Delete account</Text>
                        <Text my='1'>
                            By deleting your account , all your information, products and activities in our platform will be erased as your account will be permamnetly deleted and will not be restored.
                        </Text>
                        <Tooltip label='click to delete your account' >
                            <Button mt='2' onClick={(()=>{set_is_delete_account_Modalvisible(true)})}>Delete account</Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        }
    </Box>
  )
}
