import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { useState,useTransition } from "react";
import { useUserContext } from "../../Providers/userContext";
import { useRouter } from "next/router";
import { MdVisibility,MdVisibilityOff } from "react-icons/md";
import { SignIn } from "../../../pages/api/auth/route.api";
// api

export const SignInForm=()=>{
    // utils
    const toast = useToast();
    const router = useRouter()
    // states 
    const {set_user_handler} = useUserContext();
    
    const [email, set_email]=useState('');
    const [password, set_password] = useState('');
    const [input_error,set_input_error] = useState(false);
    const [isPending, startTransition] = useTransition(); 

    /**
     * handle state to toggle view of password
     */

    const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

    /**
     * payload 
     */
    const payload = {
		password,
		email_of_company : email
	}

    const handleSubmit=()=>{
        startTransition(()=>{
            Verify_Inputs()
        })
    }

    const Verify_Inputs=()=>{
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (password && email){
			if (!email.match(validRegex)){
                toast({ title: '!Error', description: 'Use a correct email format', status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
                return ;
			}else{
				handle_Sign_In()
			}
		}else{
			toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
            set_input_error(true)
			return ;
		}
	}
	const handle_Sign_In=async()=>{
		await SignIn(payload).then((response)=>{
            toast({ title: 'Welcome back👋,', description: 'successfully signed in,', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            set_user_handler(response?.data);
            setTimeout(()=>{
                router.back()
            },2000)
            return ;
        }).catch((err)=>{
            console.log(err)
            return  toast({ title: 'Something went wrong', description: `we could not sign you in: ${err?.response?.data}`, status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
        }).finally(()=>{
            set_input_error(false);
        })
	}
    return(
        <Box boxShadow={'md'} p='8' borderRadius={5} w='75%'>
            <Flex w='100%' flexDirection={'column'} gap='2'>
                <Text fontSize={'28px'} textAlign={'center'} fontWeight={'bold'}>Welcome back</Text>
                <Text fontSize={'sm'} textAlign={'center'} fontWeight={'bold'} color={'gray.300'}>sign in to your account </Text>
            </Flex>
            <FormControl mt='1' isRequired isInvalid={input_error && email == '' ? true : false}>
                <FormLabel>Email</FormLabel>
                <Input disabled={isPending} type='email' placeholder='johndoe@email.com ' variant='filled' required onChange={((e)=>{set_email(e.target.value)})}/>
                {input_error && email == '' ?  <FormErrorMessage>email is required.</FormErrorMessage> : ( null )}
            </FormControl>
            <FormControl mt='1' isRequired isInvalid={input_error && password == '' ? true : false}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input disabled={isPending} pr='4.5rem' type={show ? 'text' : 'password'} placeholder='password' variant='filled' required onChange={((e)=>{set_password(e.target.value)})} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'> {show ? <MdVisibilityOff/> : <MdVisibility/>} </Button>
                    </InputRightElement>
                </InputGroup>
                {input_error && password == '' ?  <FormErrorMessage>password is required.</FormErrorMessage> : ( null )}
            </FormControl>
            <Text mt='2' cursor='pointer' fontSize='14px' color='red' onClick={(()=>{router.replace(`/password_reset?email=${email}`)})}> Forgot Password?</Text>
            {isPending?
                <Button isLoading loadingText='Signing you in' variant='ghost' borderRadius={'md'} w='full'/>
                :
                <Button variant={'filled'} borderRadius={'md'} bg='#009393' mt='2' w='full' color='#fff' onClick={handleSubmit}>Signin</Button>
            }
            <Box mt='4' textAlign={'center'} w='100%'>
                <Text>Dont have an account?</Text>
                <Text onClick={(()=>{router.push('/account/1')})} fontWeight={'bold'} cursor='pointer' fontSize='16px' color="#009393">Sign Up now.</Text>
            </Box>
        </Box>
    )
}