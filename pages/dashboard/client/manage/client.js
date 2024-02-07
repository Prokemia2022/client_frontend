import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Tooltip, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useUserContext } from "../../../../components/Providers/userContext";
import { Update_Client } from "../../../api/clients/client/route.api";

export default function Manage({set_profile_edit}){
	const {user, set_user_handler} = useUserContext();
    const toast = useToast()
    const [first_name,set_first_name]=useState(user?.first_name);
    const [last_name,set_last_name]=useState(user?.last_name);
    const [mobile_of_company,set_mobile_of_company]=useState(user?.mobile_of_company);
    const [address_of_company,set_address_of_company]=useState(user?.address);
    const [company_name,set_company_name]=useState(user?.company_name);
    const [gender,set_gender]=useState(user?.gender);
    const [position,set_position]=useState(user?.position);

    const [saving,set_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const payload = {
        _id: user?._id,
        first_name,
        last_name,
        mobile_of_company,
        address_of_company,
        company_name,
        gender,
        position,
    }
    const handle_Edit=async()=>{
        set_saving(true)
        if (!first_name || !last_name || !mobile_of_company || !company_name){
            toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_saving(false);
            set_input_error(true)
        }else{
            await Update_Client(payload).then((res)=>{
                toast({ title: 'Account updated successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
                set_profile_edit(false)
                set_user_handler(res);
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Account updated failed', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
                set_saving(false);
                set_input_error(false)
            })
        }
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>User details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && first_name.trim().length == 0 ? true : false}>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder={first_name? first_name : '-'} type='text' onChange={((e)=>{set_first_name(e.target.value)})}/>
                    {input_error && first_name.trim().length == 0 ? <FormErrorMessage>First name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && last_name.trim().length == 0 ? true : false}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder={last_name? last_name : '-'} type='text' onChange={((e)=>{set_last_name(e.target.value)})}/>
                    {input_error && last_name.trim().length == 0 ? <FormErrorMessage>Last name is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && mobile_of_company.trim().length == 0 ? true : false}>
                    <FormLabel>Mobile of the company</FormLabel>
                    <Input type='tel' placeholder={mobile_of_company} onChange={((e)=>{set_mobile_of_company(e.target.value)})}/>
                    {input_error && mobile_of_company.trim().length == 0 ? <FormErrorMessage>mobile of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' placeholder={address_of_company} onChange={((e)=>{set_address_of_company(e.target.value)})}/>
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Gender</FormLabel>
                    <Select variant='filled' placeholder='Select Gender' onChange={((e)=>{set_gender(e.target.value)})}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='I would rather not say'>I would rather not say</option>
                    </Select>
                </FormControl>
            </Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Company details</Text>
                <Divider/>
                <FormControl mt='2' isRequired isInvalid={input_error && company_name.trim().length == 0 ? true : false}>
                    <FormLabel>Name of the company</FormLabel>
                    <Input placeholder={company_name? company_name : '-'} type='text' onChange={((e)=>{set_company_name(e.target.value)})}/>
                    {input_error && company_name.trim().length == 0 ?  <FormErrorMessage>Name of the company is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Position held in company</FormLabel>
                    <Input type='tel' placeholder={position? position : '-'} onChange={((e)=>{set_position(e.target.value)})}/>
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