import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Textarea, Tooltip, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useUserContext } from "../../../../components/Providers/userContext";
import { Edit_Salesperson } from "../../../api/clients/salesperson/route.api";

export default function Manage({set_profile_edit}){
	const {user, set_user_handler} = useUserContext();
    const toast = useToast()
	const [first_name,set_first_name]=useState(user?.first_name);
	const [last_name,set_last_name]=useState(user?.last_name);
	const [mobile_of_salesperson,set_mobile_of_salesperson]=useState(user?.mobile_of_salesperson);
	const [address,set_address]=useState(user?.address);
	const [company_name,set_company_name]=useState(user?.company_name);
    const [position,set_position]=useState(user?.position);
	const [bio,set_bio]=useState(user?.bio);
	const [payment_method,set_payment_method]=useState(user?.payment_method);
	const [payment_type,set_payment_type]=useState(user?.payment_type);

    const [saving,set_saving]=useState(false);

    const [input_error,set_input_error]=useState(false);

    const payload = {
		_id: user?._id,
		first_name,
		last_name,
		mobile_of_salesperson,
		address,
		bio,
		payment_method:`${payment_type}: ${payment_method}`,
		company_name,
        position
	}
    const handle_Edit=async()=>{
        set_saving(true)
        if (!first_name || !last_name || !mobile_of_salesperson || !company_name){
            toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
            set_saving(false);
            set_input_error(true)
        }else{
            await Edit_Salesperson(payload).then((res)=>{
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
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Personal details</Text>
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
                <FormControl mt='2'>
                    <FormLabel>Tell us about your self</FormLabel>
                    <Textarea placeholder={bio? bio : '-'} type='text' onChange={((e)=>{set_bio(e.target.value)})}/>
                </FormControl>
                <FormControl mt='2' isRequired isInvalid={input_error && mobile_of_salesperson.trim().length == 0 ? true : false}>
                    <FormLabel>Mobile </FormLabel>
                    <Input type='tel' placeholder={mobile_of_salesperson} onChange={((e)=>{set_mobile_of_salesperson(e.target.value)})}/>
                    {input_error && mobile_of_salesperson.trim().length == 0 ? <FormErrorMessage>mobile field is required.</FormErrorMessage> : ( null )}
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' placeholder={address} onChange={((e)=>{set_address(e.target.value)})}/>
                </FormControl>
            </Box>
            <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Payment details</Text>
                <Divider/>
                <FormControl mt='2'>
                    <FormLabel>Payment method </FormLabel>
                    <Select variant='filled' placeholder='Method to be paid' onChange={((e)=>{set_payment_type(e.target.value)})}>
                            <option value='Mpesa'>Mpesa</option>
							<option value='Bank'>Bank</option>
							<option value='Airtel Money'>Airtel Money</option>
                    </Select>
                </FormControl>
                <FormControl mt='2'>
                    <FormLabel>Account details</FormLabel>
                    <Input type='text' placeholder={user?.payment_method} onChange={((e)=>{set_payment_method(e.target.value)})}/>
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