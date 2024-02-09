import {Box, Button, Center, Flex, HStack, Heading, Image, PinInput, PinInputField, Text, useToast} from '@chakra-ui/react'
import { useUserContext } from '../components/Providers/userContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Generate_Otp, Send_Email_Otp, Verify_otp } from '../hooks/useHandleOtp.hook';
import { Verify_User_Email } from './api/auth/route.api';

export default function Verify_Email(){
    const {user} = useUserContext();
    const toast = useToast();
    const router = useRouter()
    const payload={
        email_of_company : user?.email_of_company || user?.email_of_salesperson
    }

    const [confirmation_code,set_confirmation_code]=useState();
    const [code_active,set_code_active]=useState(false);

    const [is_submitting,set_is_submitting]=useState(false);
    const [input_error,set_input_error]=useState(false);

    const handle_otp=async()=>{
		const code = await Generate_Otp();
        const email = user?.email_of_company || user?.email_of_salesperson 
        if (!user){
			toast({ title: 'You need to be signed in', description: ``, status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
            return ;
        }
		if (code){
			const email_status = await Send_Email_Otp(code, email);
			if (email_status?.data == 'success'){
				set_code_active(!code_active)
				return 'success'
			}
			return null;
		}
		return null;
	}
	
	const Compare_Codes=()=>{
		const otp_status = Verify_otp(confirmation_code);
		if(otp_status === 'error'){
			toast({ title: 'Code verification error', description: `the code you entered does not match `, status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
			return 'false';
		}
		return 'true';
  	}

    const Handle_Submit=async()=>{
        set_is_submitting(true);
        const result = Compare_Codes()
        if (result === 'true'){
            await Verify_User_Email(payload).then(()=>{
                toast({title:'Success!!',description:'Your email account has been verified.', status:'success',position:'top-left',variant:'left-accent',isClosable:true})
                router.reload()
                setTimeout(()=>{
                    router.push('/')
                },7000)
            }).catch((err)=>{
                toast({title:'Error!!',description:'Your email account could not be veirfied at the moment.', status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            }).finally(()=>{
                set_is_submitting(false);
            })
        }
        set_is_submitting(false)
        return ;
    }
    return (
        <Center w='full' h='100vh' align='center' textAlign={'center'} justify='center'>
            <Box>
                <Heading as='h1' my='4'>Thanks for Signing Up!</Heading>
                <Text>Welcome to the prokemia community,</Text>
                <Text>We are full of great features that we would like you to try out.</Text>
                <Text>To fully enjoy the experience in our platform<br/> we recommend you to  verify your email.</Text>
                {code_active? 
                <HStack my='4' align='center' justify={'center'}>
                    <PinInput type='number' onChange={((e)=>{set_confirmation_code(e)})} otp={true}>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                        <PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
                    </PinInput>
                </HStack> : null }
                {code_active? 
                        <>
                            {is_submitting? <Button isLoading loadingText='verifying...' variant={'outline'} my='6' boxShadow={'md'} isDisabled/> : <Button borderRadius='full' colorScheme='teal' my='4' onClick={Handle_Submit}>Verify Email</Button>}
                        </>
                    : 
                        <Button bg='#000' color='#fff' onClick={handle_otp} my='4'>Get Code</Button>
                }
            </Box>
        </Center>
    )
}