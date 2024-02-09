//modules imports
import React,{useState} from 'react'
import {Flex,Text,Button,Input,InputGroup,InputRightElement,useToast, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react'
import {useRouter} from 'next/router';
//components imports
import styles from '../../styles/Home.module.css'
//icon imports
import { MdVisibility,MdVisibilityOff } from "react-icons/md";
//api calls
import { useUserContext } from '../../components/Providers/userContext.js';
import { SignUp } from '../api/auth/route.api.js';
 
export default function SupplierSignUp(){
	//utils
	const router = useRouter();
	const toast = useToast();
	const {set_user_handler} = useUserContext();
	//apis
	//states
	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

  	const [company_name, set_company_name] = useState('');
  	const [password, set_password] = useState('');
  	const [email_of_company, set_email_of_company] = useState('');
	const [input_error,set_input_error]=useState(false);

  	const [is_submitting,set_is_submitting]=useState(false);
    //console.log(router.query.acc_type)

  	const payload = {
  		company_name,
  		password,
  		email_of_company,
		account_type: router.query.acc_type
  	}
  	const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  	const gmailRegex = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
	const yahooRegex = /^[^@]+@(yahoo|ymail|rocketmail)\.(com|in|co\.uk)$/i
	//functions
	const Verify_Inputs=()=>{
		set_is_submitting(true);
		if (password && company_name && email_of_company){
			if (!email_of_company.match(validRegex)){
				toast({ title:'!Important', position:'top-left', description: 'Use a valid email format e.g example@company.com', status: 'warning', variant:'left-accent', isClosable: true, });
				set_is_submitting(false)
				return;
			}else if(email_of_company.match(gmailRegex) || email_of_company.match(yahooRegex)){
				toast({ title:'!Important', position:'top-left', description: 'Seller accounts require a business email e.g example@company.com', status: 'info', variant:'left-accent', isClosable: true, });
				set_is_submitting(false);
				return;
			}else{
				handle_Sign_Up()
			}
		}else if(!password || !company_name || !email_of_company){
			set_input_error(true);
			toast({ title: '!Important', description: 'required fields need to be filled', status: 'warning', isClosable: true, position:'top-left', variant:'left-accent'});
			set_is_submitting(false)
		}
	}
	const handle_Sign_Up=async()=>{
		await SignUp(payload).then((response)=>{
			if (response.status == 201){
				toast({ title: 'Error in creating your account', description: response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
				set_is_submitting(false);
				return;
			}
			if (response.status == 200){
				toast({ title: 'Account created successfully', description: 'welcome to prokemia,', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
				set_is_submitting(false);
				set_user_handler(response.status);
				setTimeout(()=>{
					router.push('/')
				},2000);
				return;
			}
			toast({ title: 'Error in creating your account', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
			set_is_submitting(false);
			return ;
		}).catch((err)=>{
			console.log(err)
			toast({ title: 'Error in creating your account', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
			set_is_submitting(false);
			return ;
		})
	}
	return(
		<Flex direction='column'>
			<Flex className={styles.SignupBody}>
				<Flex className={styles.authSection} gap='2'>
					<Text w='100%' fontSize='2.5rem' color='#fff' fontFamily='ClearSans-bold' >Welcome to Pro<span style={{color:"#000"}}>Kemia</span> </Text>
					<Text w='100%' fontWeight='bold'>Find a market for your produced products.We help connect you to clients in search of similar products.Products will be showcased to our marketplace for clients to search for.</Text>
				</Flex>
				<Flex className={styles.authForm} gap='2' direction='column'>
					<Text w='100%' textAlign='center' fontSize='2rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> Up</Text>
					<FormControl mt='2' isRequired isInvalid={input_error && company_name == '' ? true : false}>
						<FormLabel>Company Name</FormLabel>
						<Input type='text' placeholder='Company name' variant='filled' required onChange={((e)=>{set_company_name(e.target.value)})}/>
						{input_error && company_name == '' ? <FormErrorMessage>The name of the company is required.</FormErrorMessage>: (null)}
					</FormControl>
					<FormControl mt='2' isRequired isInvalid={input_error && email_of_company == '' ? true : false}>
						<FormLabel>Email</FormLabel>
						<Input type='email' placeholder='Business email ' variant='filled' required onChange={((e)=>{set_email_of_company(e.target.value)})}/>
						{input_error && email_of_company == '' ?  <FormErrorMessage>Email is required.</FormErrorMessage> : ( null )}
					</FormControl>
					<FormControl mt='2' isRequired isInvalid={input_error && password == '' ? true : false}>
						<FormLabel>Password</FormLabel>
						<InputGroup size='md'>
							<Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_password(e.target.value)})} />
							<InputRightElement width='4.5rem'>
								<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'> {show ? <MdVisibilityOff/> : <MdVisibility/>} </Button>
							</InputRightElement>
						</InputGroup>
						{input_error && password == '' ?  <FormErrorMessage>password is required.</FormErrorMessage> : ( null )}
					</FormControl>
					{is_submitting? 
						<Button isLoading loadingText='Creating your account' bg='#009393' borderRadius='5' color='#fff' align='center'></Button>
						:
						<Button bg='#009393' color='#fff' onClick={Verify_Inputs}>Create {router.query.acc_type} Account</Button>						
					}
					<Text fontSize={'11px'}>By Signing up you agree to our <a href="t&c" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}> terms&conditions</a > and our <a href="privacy_policy" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}>privacy policy</a>.</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}