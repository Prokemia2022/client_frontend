import { Avatar, Box, Button, Divider, Flex, HStack, Heading, Icon, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaUserLock } from "react-icons/fa";
import {storage} from '../../../lib/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import { useRouter } from "next/router.js";
import { useUserContext } from "../../../components/Providers/userContext.js";
import DeleteUserAccount from "../../../components/ui/Dashboard/delete_account.ui.js";
import Manage from "./manage/user.js";
import { Edit_Manufacturer } from "../../api/supplier/manufacturer/route.api.js";

export default function Settings(){
    const toast = useToast();
    const router = useRouter()
    const {user,set_user_handler } = useUserContext();
    const delete_account_disclosure = useDisclosure();
    const [profile_edit,set_profile_edit]=useState(false);
    let name = user?.company_name || user?.first_name;
    const [profile_photo,set_profile_photo]=useState('');

    const [saving,set_saving]=useState('');

    const HandleImageUpload=async()=>{
        set_saving(true)
        if(!profile_photo){
            toast({ title: 'Account updated failed', description: 'missing selected file', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return set_saving(false);
        }
        /**handles uploads profile image functions to firebase storage**/
        const profile_photo_documentRef = ref(storage, `profile_photo/${profile_photo?.name + v4()}`);
        const snapshot= await uploadBytes(profile_photo_documentRef,profile_photo)
        const image_url = await getDownloadURL(snapshot.ref);
        console.log(image_url)
        const payload = {
            _id: user?._id,
            profile_photo_url : image_url
        }
        await Edit_Manufacturer(payload).then((res)=>{
            toast({ title: 'Account updated successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            set_profile_edit(false)
            set_user_handler(res);
        }).catch((err)=>{
            console.log(err)
            toast({ title: 'Account updated failed', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }).finally(()=>{
            set_saving(false)
        })
    }
    return(
        <Box>
            <Flex justify='space-between' align='center'>
                <Heading as='h3'>Profile</Heading>
                {user?.valid_email_status ? null : <Button _hover={{bg:'#009393',color:'white'}} onClick={(()=>{router.push('/verify_email')})}>Verify email</Button>}
            </Flex>
            <HStack bg='#fff' p='4' alignItems='center' borderRadius={'md'} boxShadow={'sm'} mt='2'>
                <Tooltip hasArrow placement='auto' label={user?.address === '' || user?.mobile_of_company === ''? 'Almost there! lets complete your profile' : 'click icon to edit your account'} >
                    <Avatar border={user?.address_of_company === '' || user?.mobile_of_company === ''? '2px dashed orange':''} p={user?.address_of_company === '' || user?.mobile_of_company === ''? .5 : ''} size={{ base:'lg', md:'2xl' }} bg={user?.address_of_company === '' || user?.mobile_of_company === ''? 'orange.200':''} src={user?.profile_photo_url? user?.profile_photo_url: ''} name={user?.company_name} onClick={(()=>set_profile_edit(!profile_edit))}>
                        {profile_edit?
                            <Icon as={IoClose} boxSize={6} style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gray",borderRadius:'20px',color:'#fff',cursor:'pointer'}} onClick={(()=>set_profile_edit(!profile_edit))}/>
                            :
                            <Icon as={LiaUserEditSolid} boxSize={6} style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gray",borderRadius:'20px',color:'#fff',cursor:'pointer'}} onClick={(()=>set_profile_edit(!profile_edit))}/>
                        }
                    </Avatar>
                </Tooltip>
                {profile_edit? 
                    <Flex direction='column' gap='2'>
                        <Text>Select Image to set as Profile Image</Text>
                        <Input p='1' type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_profile_photo(e.target.files[0])})}/>
                        {saving? <Button isLoading loadingText="saving"/> : <Button bg='#009393' color='#fff' disabled={saving} onClick={HandleImageUpload}>save photo</Button> }
                    </Flex>
                :
                    <Box flex='1'>
                        <Text fontSize={{ base:'lg', md:'xl'}} fontWeight='bold'> {name ? name : '-'} </Text>
                        <Text fontSize={{ base:'xs', md:'md' }} w='80%'> {user?.email_of_company ? user?.email_of_company : '-'} </Text>
                        <Text fontSize={{ base:'sm', md:'md' }}> {user?.address_of_company ?  user.address_of_company : '-'} </Text>
                    </Box>
                 }
            </HStack>
            {profile_edit?
                <Manage set_profile_edit={set_profile_edit}/>
                : 
                <Box>
                    <HStack bg='#fff' p='4' mt='2' borderRadius='md'>
                        <Icon as={FaUserLock} boxSize={4}/>
                        <Text fontSize='18px'>Security</Text>
                    </HStack>
                    <Box bg='#fff' p='4' mt='2' borderRadius='md'>
                        <HStack fontSize='12px' justify='space-between' pb='2'>
                            <Text fontWeight='semibold'>Password</Text>
                            <Tooltip label='click to change your password'>
                                <Button _hover={{bg:'#009393',color:'white'}} onClick={(()=>{router.push(`/password_reset?email=${user?.email_of_company}`)})}>Change Password</Button>
                            </Tooltip>
                        </HStack>
                        <Divider/>
                        <Box fontSize='12px' mt='2'>
                            <Text fontWeight='semibold'>Delete account</Text>
                            <Text my='1'>
                                By deleting your account , all your information, products and activities in our platform will be erased as your account will be permamnetly deleted and will not be restored.
                            </Text>
                            <DeleteUserAccount delete_account_disclosure={delete_account_disclosure}/>
                            <Tooltip label='click to delete your account' >
                                <Button mt='2' _hover={{bg:'red',color:'#fff'}} onClick={delete_account_disclosure?.onOpen}>Delete account</Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}