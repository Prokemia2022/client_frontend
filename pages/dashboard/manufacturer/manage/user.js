import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Textarea, Tooltip, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useUserContext } from "../../../../components/Providers/userContext";
import { Edit_Manufacturer } from "../../../api/supplier/manufacturer/route.api";

export const Manage=({set_profile_edit})=>{
	const {user, set_user_handler} = useUserContext();
    const toast = useToast();

    const [company_name,set_company_name]=useState(user?.company_name);
	const [description,set_description]=useState(user?.description);
	const [mobile_of_company,set_mobile_of_company]=useState(user?.mobile_of_company);
    const [email_of_company,set_email_of_company]=useState(user?.email_of_company);
    const [address_of_company,set_address_of_company]=useState(user?.address_of_company);
    //contact person details
    const [contact_person_name,set_contact_person_name]=useState(user?.contact_person_name);
	const [contact_mobile,set_contact_mobile]=useState(user?.contact_mobile);
	const [contact_email,set_contact_email]=useState(user?.contact_email);
    const [saving,set_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const payload = {
		_id: user?._id,
		contact_person_name,
		contact_mobile,
		contact_email,
		mobile_of_company,
		address_of_company,
		company_name,
		description,
	}
    const handle_Edit=async()=>{
        set_saving(true)
        if (!company_name || !description || !mobile_of_company || !contact_person_name || !email_of_company){
            toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_saving(false)
            set_input_error(true)
        }else{
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
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Company details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>
                    <FormLabel>Company name</FormLabel>
                    <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                    {input_error && company_name.trim().length == 0 ? <FormErrorMessage>Company name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && description.trim().length == 0 ? true : false}>
                    <FormLabel>What your company is about</FormLabel>
                    <Textarea placeholder={description? description : '-'} type='text' onChange={((e)=>{set_description(e.target.value)})}/>
                    {input_error && description.trim().length == 0 ? <FormErrorMessage>Description of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && mobile_of_company.trim().length == 0 ? true : false}>
                    <FormLabel>Mobile of the company</FormLabel>
                    <Input type='tel' placeholder={mobile_of_company} onChange={((e)=>{set_mobile_of_company(e.target.value)})}/>
                    {input_error && mobile_of_company.trim().length == 0 ? <FormErrorMessage>mobile of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Address of the company</FormLabel>
                    <Input type='text' placeholder={address_of_company} onChange={((e)=>{set_address_of_company(e.target.value)})}/>
                </FormControl>
            </Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Account handler details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && contact_person_name.trim().length == 0 ? true : false}>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder={contact_person_name? contact_person_name : '-'} type='text' onChange={((e)=>{set_contact_person_name(e.target.value)})}/>
                    {input_error && contact_person_name.trim().length == 0 ?  <FormErrorMessage>Name is required.</FormErrorMessage> : ( null )}
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
                {saving? (<Button isLoading loadingText='Saving...' colorScheme='teal' variant='outline' />) : ( <Button ml={'2'} bg='#009393' color='#fff' onClick={handle_Edit}>Save profile</Button>)}
                </Tooltip>
            </Box>
        </Box>
    )
}