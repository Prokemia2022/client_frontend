import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Stack, Box, FormLabel, Input, FormControl, Select, FormErrorMessage, Textarea, Button, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTechnologiesSrt } from '../../../hooks/technology/useTechnologiesSrt';
import { useIndustriesSrt } from '../../../hooks/industries/useIndustriesSrt';
import { useState } from 'react';
import Create_Request from '../../../pages/api/control/consultation.api';
import { useUserContext } from '../../Providers/userContext';

export default function Consultancy_Form({consultation_drawer_form,label}) {
    const {user} = useUserContext()
    const { isOpen, onOpen, onClose } = consultation_drawer_form;
    const toast = useToast()

    const [industries_data, set_industries_data]=useState([]);
    const [technologies_data, set_technologies_data]=useState([]);
    const [industry, set_industry]=useState('');
    const [technology, set_technology]=useState('');
    const [description, set_description]=useState('');
    const [input_error, set_input_error]=useState(false);
    const [is_saving, set_is_saving]=useState(false);

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
        user_id:                    user?._id,
        user_name:                  user?.first_name,
        user_email:                 user?.email_of_company || user?.email_of_salesperson,
        user_mobile:               user?.mobile_of_company || user?.mobile_of_salesperson,
        user_company_name:          user?.company_name,
        user_company_email:         user?.company_email,
        user_company_mobile:        user?.company_mobile,
        account_type:               user?.account_type,
        industry:                  industry,
        technology:                technology,
        description:               description,
        //expert details
        expert_id:                  '',
        expert_name:                '',
        expert_email:               '',
        expert_mobile:              '',
        expert_company_name:        '',
        notification_status:        '',
    }

    const Handle_Submit=async()=>{
        set_is_saving(true)
        if(industry == '' || technology == ''){
            toast({ title: 'Error!', description: 'Request could not be sent', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            set_input_error(true);
            set_is_saving(false)
            return ;
        }
        await Create_Request(payload).then((res)=>{
            toast({ title: 'Success!', description: 'Request sent successfully', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            onClose();
            cleanInput()
            return;
        }).catch((err)=>{
            toast({ title: 'Error!', description: 'Request could not be sent', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }).finally(()=>{
            set_is_saving(false)
        })
    }

    const cleanInput=()=>{
        set_industry('')
        set_technology('')
        set_input_error(false)
    }
    return (
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              {label}
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing='24px'>  
                <FormControl isRequired isInvalid={input_error && industry == '' ? true : false}>
                    <FormLabel>Industry</FormLabel>
                    <Select value={industry} placeholder='select industry you are in' onChange={((e)=>{set_industry(e.target.value)})}>
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
                    <Select value={technology} placeholder='select technology you are in' onChange={((e)=>{set_technology(e.target.value)})} >
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
                <Box>
                  <FormLabel>Description</FormLabel>
                    {user?.account_type === 'salesperson' ?
                        <Textarea placeholder='Tell us a little bit about your experience.' onChange={((e)=>{set_description(e.target.value)})}/>
                        :
                        <Textarea placeholder='Tell us a little bit about what you are looking for.' onChange={((e)=>{set_description(e.target.value)})}/>
                    }
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={(()=>{onClose();cleanInput()})}>
                Discard
              </Button>
              {is_saving? <Button isLoading loadingText='submitting...' variant='outline'/> : <Button colorScheme='teal' onClick={Handle_Submit}>Submit</Button>}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    )
  }
