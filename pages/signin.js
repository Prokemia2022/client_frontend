import React,{useState} from 'react'
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import {useRouter} from 'next/router'
import Header from '../components/Header.js';
import SignIn from './api/auth/signin.js'

export default function ClientSignUp(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);
  	const router = useRouter();

  	const [password,setpassword]=useState('');
  	const [email_of_company,set_email_of_company]=useState('');

  	const payload = {
  		password,
  		email_of_company
  	}
  	let route = '';

  	const handleSignIn=async()=>{
  		if(password){
	  		await SignIn(payload).then(()=>{
	  			router.back()
	  		})
  			console.log(payload)
  		}else{
  			alert('all inputs are required')
  		}
  	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex h='100vh' className={styles.SigninBody}>
				<Flex className={styles.authSection} gap='2' p='8'>
					<Text w='40vw'  fontSize='4rem' color='#fff' fontFamily='ClearSans-bold'>Welcome Back!</Text>
					<Text color='#fff'>Dont Have an Account?</Text>
					<Text mt='-2' onClick={(()=>{router.push('/account')})} textDecoration='3px solid #fff underline' cursor='pointer' fontFamily='ClearSans-bold' fontSize='22px' color="#000">Sign Up now.</Text>
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
					<Text cursor='pointer' fontSize='14px' color='red'> Forgot Password?</Text>
					<Button bg='#009393' color='#fff' onClick={handleSignIn}>Sign In</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

const passwords=[
	{
		acc:'client',
		password:'client'
	},
	{
		acc:'sales',
		password:'sales'
	},
	{
		acc:'distributor',
		password:'distributor'
	},
	{
		acc:'manufacturer',
		password:'manufacturer'
	},
]
