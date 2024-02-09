import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useTransition } from 'react';
import { useRouter } from "next/router";
import Create_Request_Demo_Ticket from "../../../pages/api/control/create_request_demo_ticket";

export const DemoForm=()=>{
    const toast = useToast();
    const router = useRouter();
    const [input_error,set_input_error] = useState(false);

	const [name, set_name] = useState('');
	const [email, set_email] = useState('');
    const [mobile, set_mobile] = useState('');
    const [job_function, set_job_function] = useState('');

    const [isPending, startTransition] = useTransition();

	const payload = {
		name,
		mobile,
		email,
        job_function,
	}

    const handleSubmit=()=>{
        startTransition(()=>{
            Verify_Inputs()
        })
    }

    const Verify_Inputs=()=>{
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (name && email && mobile){
			if (!email.match(validRegex)){
                toast({ title: '!Error', description: 'Use a correct email format', status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
                return ;
			}else{
				Handle_Send_Request()
			}
		}else{
			toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
            set_input_error(true)
			return ;
		}
	}
	const Handle_Send_Request=async()=>{
		await Create_Request_Demo_Ticket(payload).then((response)=>{
            toast({ title: 'We have received your request', description: 'Our sales team will contact you in a moment', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            setTimeout(()=>{
                router.back();
                Clean_Form()
            },2000)
            return ;
        }).catch((err)=>{
            console.log(err)
            return  toast({ title: 'Something went wrong', description: `we could not send your request: ${err?.response?.data}`, status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
        }).finally(()=>{
            set_input_error(false);
        })
	}
    const Clean_Form=()=>{
        set_email('');
        set_name('');
        set_job_function('');
        set_mobile('');
        set_input_error(false)
    }
    return(
        <Box boxShadow={'md'} p='8' borderRadius={5} w='75%'>
            <Flex w='100%' flexDirection={'column'} gap='2'>
                <Text fontSize={'28px'} textAlign={'center'} fontWeight={'bold'}>Powering world class companies</Text>
                <Text fontSize={'sm'} textAlign={'center'} fontWeight={'semibold'} color={'gray.300'}>Tell us a little about your self<br/> to enable us give you the best experience.</Text>
            </Flex>
            <FormControl mt='1' isRequired isInvalid={input_error && name == '' ? true : false}>
                <FormLabel>Name</FormLabel>
                <Input disabled={isPending} type='text' placeholder='John Doe' variant='filled' required onChange={((e)=>{set_name(e.target.value)})}/>
                {input_error && name == '' ?  <FormErrorMessage>Your name is required.</FormErrorMessage> : ( null )}
            </FormControl>
            <FormControl mt='1' isRequired isInvalid={input_error && email == '' ? true : false}>
                <FormLabel>Business email</FormLabel>
                <Input disabled={isPending} type='email' placeholder='johndoe@company.com ' variant='filled' required onChange={((e)=>{set_email(e.target.value)})}/>
                {input_error && email == '' ?  <FormErrorMessage>The email is required.</FormErrorMessage> : ( null )}
            </FormControl>
            <FormControl mt='1' isRequired isInvalid={input_error && mobile == '' ? true : false}>
                <FormLabel>Phone Number</FormLabel>
                <Input disabled={isPending} type='tel' placeholder='07##-###-###' variant='filled' required onChange={((e)=>{set_mobile(e.target.value)})}/>
                {input_error && mobile == '' ?  <FormErrorMessage>Your phone number is required.</FormErrorMessage> : ( null )}
            </FormControl>
            <FormControl mY='2' >
                <FormLabel>Job Title</FormLabel>
                <Input disabled={isPending} type='text' placeholder='sales department' variant='filled' required onChange={((e)=>{set_job_function(e.target.value)})}/>
            </FormControl>
            {isPending?
                <Button isLoading loadingText='Sending your request' variant='ghost' borderRadius={'md'} w='full'/>
                :
                <Button variant={'filled'} borderRadius={'md'} bg='#009393' mt='2' w='full' color='#fff' onClick={handleSubmit}>REQUEST A DEMO</Button>
            }
        </Box>
    )
}