import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Image, Text, Flex, Box, HStack, Divider, Select, FormControl, FormLabel, FormErrorMessage, Textarea, Input, useToast, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../Providers/userContext';
import { useTechnologiesSrt } from '../../../hooks/technology/useTechnologiesSrt';
import { useIndustriesSrt } from '../../../hooks/industries/useIndustriesSrt';
import NewSample from '../../../pages/api/call_to_action/sample.api';

const Make_A_Sample=({prod_data,view_drawer_disclosure})=>{
    const {user} = useUserContext();
    const toast = useToast();

    const [industries_data, set_industries_data]=useState([]);
    const [technologies_data, set_technologies_data]=useState([]);

    const [description,set_description]=useState('');
    const [annual_volume,set_annual_volume]=useState(0);
    const [number_of_samples,set_number_of_samples]=useState(0);
    const [units,set_units]=useState('');
    const [additional_info,set_additional_info]=useState('');
    const [industry,set_industry]=useState('');
    const [technology,set_technology]=useState('');

    const [input_error,set_input_error]=useState(false);
    const [saving,set_saving]=useState(false);

    useEffect(()=>{
        get_Technologies_Data()
    },[technology])
    useEffect(()=>{
        get_Industries_Data()
    },[industry])

	async function get_Industries_Data(){
		let data = await useIndustriesSrt();
		set_industries_data(data)
	}

	async function get_Technologies_Data(){
		let data = await useTechnologiesSrt();
		set_technologies_data(data)
	}

    const payload = {
        product_name : prod_data?.name_of_product,
        product_id : prod_data?._id,
        listed_by_id : prod_data?.listed_by_id,
        email_of_lister : prod_data?. email_of_lister,
        technology,
        industry,
        first_name: user?.first_name ,			
        last_name : user?.last_name,			
        company_name: user?.company_name,		
        email_of_company: user?.email_of_company || user?.email_of_salesperson,	
        mobile_of_company: user?.mobile_of_company || user?.mobile_of_salesperson,	
        address: user?.address ,			
        description,
        number_of_samples,      
        annual_volume,      
        units,              
        additional_info,
        requester_id:           user?._id,
        email_sent:             false,
        suspension_status:      false,
        Notification_Status:    false,
        approval_status:        false, 
    }

    const Handle_Sumbit=async()=>{
        set_saving(true)
        if (!user){
            toast({title:'Warning!',description:'You need to be signed in to request a sample',status:'warning',position:'top-left-accent',variant:'left-accent',isClosable:true})
            set_saving(false)
            return ;
        }
        if (!payload?.address || !industry || !technology || !description || !number_of_samples){
            toast({title:'Warning!',description:'Required fields need to be filled',status:'warning',position:'top-left',variant:'left-accent',isClosable:true})
            set_input_error(true)
            set_saving(false)
            return ;
        }
        await NewSample(payload).then(()=>{
            toast({title:'Success!',description:'Your request has been sent!',status:'success',position:'top-left-accent',variant:'left-accent',isClosable:true})
            clean_inputs();
            view_drawer_disclosure.onClose();
            return;
        }).catch((err)=>{
            toast({title:'Error!',description:'Something went wrong!',status:'success',position:'top-left-accent',variant:'left-accent',isClosable:true})
            return ;
        }).finally(()=>{
            set_input_error(false);
            set_saving(false)
        })
    }

    const clean_inputs=()=>{
        set_industry('')
        set_technology('')
        set_description('')
        set_additional_info('')
        set_units('')
        set_annual_volume(0)
        set_number_of_samples(0)
        set_input_error(false)
        set_saving(false)
    }


    return(
        <Drawer isOpen={view_drawer_disclosure?.isOpen} placement='right' onClose={view_drawer_disclosure?.onClose} size='md' >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                Make a Sample request
            </DrawerHeader>
            <DrawerBody mt='10px' p='4'>
                <HStack borderRadius={10} bg='#eee' p='2' my='2'>
                    <Image src='../Pro.png' boxSize={'50'} />
                    <Text>{prod_data?.name_of_product}</Text>
                </HStack>
                <Divider />
                <Flex mt='2' gap='2' flexDirection={{base:'column',md:'row'}}>
                    <FormControl mt='2' isRequired isInvalid={input_error && number_of_samples == '' ? true : false}>
                        <FormLabel>Number of sides</FormLabel>
                        <NumberInput defaultValue={1} min={1} onChange={((e)=>{set_number_of_samples(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {input_error && number_of_samples == '' ? <FormErrorMessage>The number of samples.</FormErrorMessage> : ( null )}
                    </FormControl>
                    <FormControl isRequired isInvalid={input_error && industry == '' ? true : false}>
                        <FormLabel>Industry</FormLabel>
                        <Select value={industry} placeholder='Select your market' onChange={((e)=>{set_industry(e.target.value)})}>
                            {industries_data?.map((item)=>{
                                return(
                                    <option key={item?._id} value={item?.title}>{item?.title}</option>
                                )
                            })}
                        </Select>
                        {input_error && industry == '' ? 
                            <FormErrorMessage>A industry is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl isRequired isInvalid={input_error && technology == '' ? true : false}>
                        <FormLabel>Technology</FormLabel>
                        <Select value={technology} placeholder='Select your application' onChange={((e)=>{set_technology(e.target.value)})} >
                            {technologies_data?.map((item)=>{
                                return(
                                    <option key={item?._id} value={item?.title}>{item?.title}</option>

                                )
                            })}
                        </Select>
                        {input_error && technology == '' ? 
                            <FormErrorMessage>A technology is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                </Flex>
                <Textarea my='2' placeholder='How des your business intend to use this product?' value={description} onChange={((e)=>{set_description(e.target.value)})}/>
                <Box>
                    <Text my='2' fontSize={'lg'} fontWeight={'bold'}>Expected Annual Volume</Text>
                    <Text my='2' fontSize={'md'} color='gray.300'>The quantity your business will require annually.</Text>
                    <Flex w='full' gap='2' my='2'>
                        <Input value={annual_volume} type='number' variant='outline' placeholder='Expected Annual Volume e.g 2000' onChange={((e)=>{set_annual_volume(e.target.value)})} flex='1'/>
                        <Select placeholder='Units' onChange={((e)=>{set_units(e.target.value)})} w='20%'>
                            <option value={'Kg'}>Kg</option>
                            <option value={'Lb'}>Lb</option>
                            <option value={'Gal'}>Gal</option>
                            <option value={'L'}>L</option>
                        </Select>
                    </Flex>
                    <Textarea my='2' placeholder='Additional infomation for the supplier?' value={additional_info} onChange={((e)=>{set_additional_info(e.target.value)})}/>
                </Box>
            </DrawerBody>
            <DrawerFooter>
                {saving ? <Button isLoading loadingText='submitting ...' colorScheme='teal'/> : <Button colorScheme='teal' onClick={Handle_Sumbit}> Submit Request</Button> }
                <Button ml='2' variant='outline' mr={3} onClick={view_drawer_disclosure?.onClose}>
                    Close
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Make_A_Sample;