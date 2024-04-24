import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, HStack, Divider, Select, FormControl, FormLabel, FormErrorMessage, Textarea, Input, useToast, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Heading, Badge, Icon, Avatar,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { RiAccountCircleLine, RiUserLocationLine } from 'react-icons/ri';
import Edit_Sample_Request_Drawer from './EditSampleRequest';
import { UPDATE_SAMPLE_REQUEST } from '../../../api/call_to_action/sample.api';
import { useUserContext } from '../../../../components/Providers/userContext';

const View_Sample_Request=({sample_data,view_drawer_disclosure,edit_drawer_disclosure})=>{
    const {user } = useUserContext();
    const toast = useToast();
    // write the usestate for the following 4 lines of code
    const sample_id = sample_data?._id;

    const [follow_up_date,set_follow_up_date]=useState(sample_data?.follow_up_date)
    const [follow_up_remarks,set_follow_up_remarks]=useState(sample_data?.follow_up_remarks)
    const [follow_up_sampling_period,set_follow_up_sampling_period]=useState(sample_data?.follow_up_sampling_period)
    const [follow_up_sampling_price,set_follow_up_sampling_price]=useState(sample_data?.follow_up_sampling_price)
    const [sample_status, set_sample_status]=useState(sample_data?.sample_status);
    const [sample_status_stage, set_sample_status_stage]=useState(sample_data?.sample_status_stage);
    const [sample_status_comment, set_sample_status_comment]=useState(sample_data?.sample_status_comment);
    const [deletion_status, set_deletion_status]=useState(false);

    const [manage_status, set_manage_status]=useState(false);

    const HANDLE_SUBMIT = async()=>{
        const data = {
            follow_up_date,
            follow_up_remarks,
            follow_up_sampling_period,
            follow_up_sampling_price,
            sample_status,
            sample_status_stage,
            sample_status_comment,
            deletion_status
        }
        await UPDATE_SAMPLE_REQUEST(data, sample_id).then((response)=>{
            console.log(response)
            toast({
                title: 'Successfully Updated',
                status:'success',
                duration: 9000,
                isClosable: true,
            })
            set_manage_status(!manage_status)
        }).catch((Error) => {
            console.log(Error)
            toast({
                title: 'Failed to Update',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return(
        <Drawer isOpen={view_drawer_disclosure?.isOpen} placement='right' onClose={view_drawer_disclosure?.onClose} size='md' >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                View Sample request
            </DrawerHeader>
            <DrawerBody mt='10px' p='4'>
                <Box alignItems='center' bg='#fff' my='2' p='2' borderRadius={5} boxShadow={'sm'}>
                    <Heading>Sample Order</Heading>
                    <Text mt='1' fontWeight='bold' color='gray.400' fontSize='sm'>#{sample_data?._id}</Text>
                    {sample_data?.sample_status && sample_data?.sample_status_stage === 'completed'? <Badge colorScheme="green">{sample_data?.sample_status_stage}</Badge> : <Badge colorScheme="orange">{sample_data?.sample_status_stage}</Badge>}
                    <Text p='1' fontSize={'sm'} color={'orange.800'} my='2' fontWeight={''} bg='orange.100' borderRadius={'sm'}>{sample_data?.sample_status_comment}</Text>
                    <HStack mt='1'>
                        <Icon as={IoCalendarOutline} boxSize={4} />
                        <Text fontSize={'sm'} mt='1'>{moment(sample_data?.createdAt).format("MMM Do YY")}</Text>
                    </HStack>
                </Box>
                <HStack borderRadius={10} bg='#eee' p='2' my='2'>
                    <Image src='../Pro.png' boxSize={'50'} alt='image'/>
                    <Text>{sample_data?.product_details?.name_of_product}</Text>
                </HStack>
                <Divider />
                <Flex gap='2' p='2'>
                    <HStack align={'start'} pr='2' borderRight={'1px solid #000'}>
                        <Text fontWeight={'bold'}>Industry</Text>
                        <Text color='#009393' cursor='pointer'>{sample_data?.industry}</Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight={'bold'}>Technology:</Text>
                        <Text color='#009393' cursor='pointer'>{sample_data?.technology}</Text>
                    </HStack>
                </Flex>
                <Divider />
                <Box bg='#fff' borderRadius={10} boxShadow={'sm'} p='4' my='2'>
                    <Text fontSize={'lg'} fontWeight={'bold'}>Product Details</Text>
                    <HStack justify={'space-between'} borderBottom={'2px'} borderColor={'gray.200'} borderStyle={'dashed'} py='6' px='4'>
                        <Text fontSize={'xl'} color='#009393' fontWeight={'bold'}>{sample_data?.product_details?.name_of_product}</Text>
                        <HStack gap='1'>
                            <Text>x{sample_data?.number_of_samples}</Text>
                            <Text fontWeight={'bold'}>{sample_data?.units}</Text>
                        </HStack>
                    </HStack>
                    <Box>
                        <HStack gap='2' w='full' justify={'space-between'} p='4'>
                            <Text fontWeight={'medium'} color='gray.400'>Annual volume</Text>
                            <Text fontWeight={'bold'} color=''>{sample_data?.annual_volume}{sample_data?.units}</Text>
                        </HStack>
                        <Box gap='2' w='full' p='4'>
                            <Text fontWeight={'medium'} color='gray.400'>Intention for use</Text>
                            <Text fontWeight={'bold'}>{sample_data?.description}</Text>
                        </Box>
                        <Box gap='2' w='full' p='4'>
                            <Text fontWeight={'medium'} color='gray.400'>Specific instructions</Text>
                            <Text fontWeight={'bold'}>{sample_data?.additional_info}</Text>
                        </Box>
                    </Box>
                </Box>
                {user?.account_type === 'client' ? null : 
                    <>
                        <Box bg='#eee' borderRadius={10} boxShadow={'sm'} p='4'>
                            <HStack justify={'space-between'}>
                                <Text fontSize={'lg'} fontWeight={'bold'}>Client Info</Text>
                            </HStack>
                            <HStack mt='2' gap='2'>
                                <Avatar name={sample_data?.client_details?.company_name} size='sm' borderRadius={'md'}/>
                                <Text fontSize={'sm'}>{sample_data?.client_details?.company_name? sample_data?.client_details?.company_name : '-'}</Text>
                            </HStack>
                            <Box mt='2'>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Icon as={MdEmail} boxSize={4}/>
                                    <Text >{sample_data?.client_details?.email_of_company? sample_data?.client_details?.email_of_company : '-'}</Text>
                                </HStack>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Icon as={RiAccountCircleLine} boxSize={4}/>
                                    <Text >{sample_data?.client_details?.first_name? sample_data?.client_details?.first_name : '-'} {sample_data?.client_details?.last_name? sample_data?.client_details?.last_name : '-'}</Text>
                                </HStack>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Icon as={FaPhone} boxSize={4}/>
                                    <Text >{sample_data?.client_details?.mobile_of_company? sample_data?.client_details?.mobile_of_company : '-'}</Text>
                                </HStack>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Icon as={RiUserLocationLine} boxSize={4}/>
                                    <Text >{sample_data?.client_details?.address? sample_data?.client_details?.address : '-'}</Text>
                                </HStack>
                            </Box>
                        </Box>
                        <Box bg='#eee' borderRadius={10} boxShadow={'sm'} p='4' my='2'>
                            <HStack justify={'space-between'}>
                                <Text fontSize={'md'} fontWeight={'bold'}>Client Follow up information</Text>
                            </HStack>
                            <Box mt='2'>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Text fontWeight={'bold'}>Date:</Text>
                                    <Text>{sample_data?.follow_up_date? moment(sample_data?.follow_up_date).format("MMM Do YY") : '-'}</Text>
                                </HStack>
                                <Box mt='1' fontSize={'sm'} color='gray.500'>
                                    <Text fontWeight={'bold'}>Remarks:</Text>
                                    <Text >{sample_data?.follow_up_remarks? sample_data?.follow_up_remarks : '-'}</Text>
                                </Box>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Text fontWeight={'bold'}>Period client needs to sample product - days:</Text>
                                    <Text >{sample_data?.follow_up_sampling_period? sample_data?.follow_up_sampling_period : '-'}</Text>
                                </HStack>
                                <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                    <Text fontWeight={'bold'}>Price of sample per unit sold at:</Text>
                                    <Text >{sample_data?.follow_up_sampling_price? sample_data?.follow_up_sampling_price : '-'}</Text>
                                </HStack>
                            </Box>
                        </Box>
                        {manage_status?
                            <Box bg='#fff' borderRadius={10} boxShadow={'sm'} p='' my='2'>
                                <Text fontSize={'lg'} fontWeight={'bold'}>Manage request</Text>
                                <Select placeholder='Select request status' onChange={((e)=>{set_sample_status(e.target.value)})} my='2'>
                                    <option value={false}>Reject</option>
                                    <option value={true}>Active</option>
                                </Select>
                                <Select placeholder='Select stage' onChange={((e)=>{set_sample_status_stage(e.target.value)})} my='2'>
                                    <option value={'declined'}>Decline</option>
                                    <option value={'under review'}>Under review</option>
                                    <option value={'delivered'}>Delivered</option>
                                    <option value={'completed'}>Complete</option>
                                </Select>
                                <Textarea placeholder='comment on the request' onChange={((e)=>{set_sample_status_comment(e.target.value)})}/>
                                <Divider/>
                                <Text my='2' fontWeight={'bold'}>Client follow up details</Text>
                                <Divider/>
                                <Input type='date' placeholder='Date to follow up client' onChange={((e)=>{set_follow_up_date(e.target.value)})} my='2'/>
                                <Textarea placeholder='Comment on following up client' onChange={((e)=>{set_follow_up_remarks(e.target.value)})} my='2'/>
                                <Input type='number' placeholder='Period client needs to sample product - days' onChange={((e)=>{set_follow_up_sampling_period(e.target.value)})} my='2'/>
                                <Input type='number' placeholder='Price of sample per unit sold at' onChange={((e)=>{set_follow_up_sampling_price(e.target.value)})} my='2'/>
                                <Button bg='gray.200' onClick={HANDLE_SUBMIT} my='2'>Save</Button>
                            </Box>
                            :
                            null
                        }
                    </>
                }
                <Edit_Sample_Request_Drawer edit_drawer_disclosure={edit_drawer_disclosure} sample_data={sample_data}/>
            </DrawerBody>
            {user?.account_type === 'client' ? null : 
            <DrawerFooter>
                <HStack spacing='2'>
                    <Button bg='gray.200' onClick={(()=>{edit_drawer_disclosure.onToggle()})}>Edit</Button>
                    <Button bg='gray.200' onClick={(()=>{set_manage_status(!manage_status)})}>Manage</Button>
                </HStack>
            </DrawerFooter>}
            </DrawerContent>
        </Drawer>
    )
}

export default View_Sample_Request;