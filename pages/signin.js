//modules import
import React,{useState} from 'react'
import {Flex,Text,Button,Input,InputGroup,InputRightElement,useToast} from '@chakra-ui/react'
//api calls
import SignIn from './api/auth/signin.js'
//components import
import Header from '../components/Header.js';
//icons
import {Visibility,VisibilityOff} from '@mui/icons-material'
//utils
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'

export default function UserSignIn(){
	//utils
	const router = useRouter();
	const toast = useToast()
	//states
	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

	const [password,setpassword]=useState(''); //password input
	const [email_of_company,set_email_of_company]=useState(''); //email input

	const [issubmitting,set_issubmitting]=useState(false);

	const payload = {
		password,
		email_of_company
	}
	//function
	const handleSignIn=async()=>{
		set_issubmitting(true)
		if(password && email_of_company){
			await SignIn(payload).then((res)=>{
				//console.log(res)
				toast({
					title: '',
					description: 'Successfully Signed in',
					status: 'success',
					isClosable: true,
				});
			}).then(()=>{
				router.push('/')
			}).catch((err)=>{
				//console.log(err)
				toast({
					title: '',
					description: `${err.response.data}`,
					status: 'error',
					isClosable: true,
				});
			})
			//console.log(payload)
		}else if(!password || !email_of_company){
			toast({
				title: '',
				description: 'All inputs are required',
				status: 'info',
				isClosable: true,
			});
		}else{
			toast({
				title: '',
				description: 'error while signing in',
				status: 'error',
				isClosable: true,
			});
		}
		set_issubmitting(false)
	}

	return(
		<Flex direction='column'>
			<Header/>
			<Flex className={styles.SignupBody}>
				<Flex className={styles.authSection} gap='2'>
					<Text w='100%' fontSize='3rem' color='#fff' fontFamily='ClearSans-bold'>Welcome Back!</Text>
					<Text color='#fff'>Dont Have an Account?</Text>
					<Text mt='-2' onClick={(()=>{router.push('/account/1')})} textDecoration='3px solid #fff underline' cursor='pointer' fontFamily='ClearSans-bold' fontSize='22px' color="#000">Sign Up now.</Text>
				</Flex>
				<Flex className={styles.authForm} gap='2' direction='column'>
					<Text fontSize='2.5rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> In</Text>
					<Text color='grey'>Welcome back, Please sign in to your account.</Text>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Email</Text>
						<Input type='text' placeholder='Email' variant='filled' onChange={((e)=>{set_email_of_company(e.target.value)})}/>
					</Flex>
					<Text fontWeight='bold'>Password</Text>
					<InputGroup size='md'>
						<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter password'
						variant='filled'
						onChange={((e)=>{setpassword(e.target.value)})}
						required
						/>
							<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
							{show ? <VisibilityOff/> : <Visibility/>}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Text cursor='pointer' fontSize='14px' color='red' onClick={(()=>{router.push('/password_reset')})}> Forgot Password?</Text>
					<Button bg='#009393' color='#fff' onClick={handleSignIn} disabled={issubmitting? true:false}>Sign In</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}