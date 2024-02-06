import { Avatar, Box, Button, Collapse, Divider, Flex, HStack, Heading, Icon, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaUserLock } from "react-icons/fa";
import { Manage } from "./manage/user.js";
import { useUserContext } from "../../../components/Providers/userContext.js";
import DeleteAccount from "../../../components/ui/Dashboard/delete_account.ui.js";
import {storage} from '../../../lib/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import { useRouter } from "next/router.js";
import { Edit_Salesperson } from "../../api/clients/salesperson/route.api.js";
import { BsIncognito } from "react-icons/bs";

export const Settings=()=>{
    const toast = useToast();
    const router = useRouter()
    const {user,set_user_handler } = useUserContext();
    const delete_account_disclosure = useDisclosure();
    const view_annonymous_disclosure= useDisclosure()
    const [profile_edit,set_profile_edit]=useState(false);
    const [profile_photo,set_profile_photo]=useState('');
    const HandleImageUpload=async()=>{
        /**handles uploads profile image functions to firebase storage**/
        const profile_photo_documentRef = ref(storage, `profile_photo/${profile_photo?.name + v4()}`);
        const snapshot= await uploadBytes(profile_photo_documentRef,profile_photo)
        const image_url = await getDownloadURL(snapshot.ref);
        console.log(image_url)
        const payload = {
            _id: user?._id,
            profile_photo_url : image_url
        }
        await Edit_Salesperson(payload).then((res)=>{
            toast({ title: 'Account updated successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            set_profile_edit(false)
            set_user_handler(res);
        }).catch((err)=>{
            console.log(err)
            toast({ title: 'Account updated failed', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        })
    }
    return(
        <Box>
            <Flex justify='space-between' align='center'>
                <Heading as='h3'>Profile</Heading>
                {user?.valid_email_status ? null : <Button _hover={{bg:'#009393',color:'white'}} onClick={(()=>{router.push('/verify_email')})}>Verify email</Button>}
            </Flex>
            <HStack bg='#fff' p='4' alignItems='center' borderRadius={'md'} boxShadow={'sm'} mt='2'>
                <Tooltip hasArrow placement='auto' label={user?.address === '' || user?.mobile_of_salesperson === ''? 'Almost there! lets complete your profile' : 'click icon to edit your account'} >
                    <Avatar border={user?.address === '' || user?.mobile_of_salesperson === ''? '2px dashed orange':''} p={user?.address === '' || user?.mobile_of_salesperson === ''? .5 : ''} size={{ base:'lg', md:'2xl' }} bg={user?.address === '' || user?.mobile_of_salesperson === ''? 'orange.200':''} src={user?.profile_photo_url} onClick={(()=>set_profile_edit(!profile_edit))}>
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
                        <Button bg='#009393' color='#fff' disabled={profile_photo == ''? true: false} onClick={HandleImageUpload}>save photo</Button>
                    </Flex>
                :
                    <Box flex='1'>
                        <Text fontSize={{ base:'lg', md:'xl'}} fontWeight='bold'> {user?.first_name ? user?.first_name : '-'} </Text>
                        <Text fontSize={{ base:'xs', md:'md' }} w='80%'> {user?.email_of_salesperson ? user?.email_of_salesperson : '-'} </Text>
                        <Text fontSize={{ base:'sm', md:'md' }}> {user?.address ?  user.address : '-'} </Text>
                    </Box>
                 }
            </HStack>
            {profile_edit?
                <Manage set_profile_edit={set_profile_edit}/>
                : 
                <Box>
                    <Box bg='#fff' p='4' mt='2' borderRadius='md' cursor={'pointer'} onClick={(()=>{view_annonymous_disclosure?.onToggle()})}>
                        <HStack>
                            <Icon as={BsIncognito} boxSize={8} backgroundColor={'gray.200'} p='2' borderRadius={'full'} />
                            <Text fontSize='18px' textDecoration={'1px underline #009393'} color='#009393' fontWeight={'bold'}>Become Annonymous</Text>
                        </HStack>
                        <Collapse in={view_annonymous_disclosure?.isOpen} animateOpacity>
                            <Box p='40px' color='white' mt='4' bg='teal.500' rounded='md' shadow='md'>
                                <Text>
                                    By becoming annonymous , you can trade and make requests without your identity being known. <br/>You can make requests on behalf of other companies, your identity will be hidden as annonymous. <br/>Innovation core will trade on your behalf.
                                </Text>
                            </Box>
                        </Collapse>
                    </Box>
                    <HStack bg='#fff' p='4' mt='2' borderRadius='md'>
                        <Icon as={FaUserLock} boxSize={4}/>
                        <Text fontSize='18px'>Security</Text>
                    </HStack>
                    <Box bg='#fff' p='4' mt='2' borderRadius='md'>
                        <HStack fontSize='12px' justify='space-between' pb='2'>
                            <Text fontWeight='semibold'>Password</Text>
                            <Tooltip label='click to change your password'>
                                <Button _hover={{bg:'#009393',color:'white'}} onClick={(()=>{router.push(`/password_reset?email=${user?.email_of_salesperson}`)})}>Change Password</Button>
                            </Tooltip>
                        </HStack>
                        <Divider/>
                        <Box fontSize='12px' mt='2'>
                            <Text fontWeight='semibold'>Delete account</Text>
                            <Text my='1'>
                                By deleting your account , all your information, products and activities in our platform will be erased as your account will be permamnetly deleted and will not be restored.
                            </Text>
                            <DeleteAccount delete_account_disclosure={delete_account_disclosure}/>
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