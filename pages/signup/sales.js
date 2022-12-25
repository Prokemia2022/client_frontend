import React,{useState} from 'react'
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//components imports
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header.js';
//icon imports
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
//api calls
import SignUp from '../api/auth/signup.js'

export default function SalesSignUp(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);

  	const router = useRouter();
  	const [first_name, set_first_name] = useState('');
  	const [last_name, set_last_name] = useState('');
  	const [password, set_password] = useState('');
  	const [email_of_company, set_email_of_company] = useState('');

  	const payload = {
  		first_name,
  		last_name,
  		password,
  		email_of_company,
  		acc_type: 'sales'
  	}

  	const cookies = new Cookies();
	const token = cookies.get('user_token');

  	const handle_Sign_Up=async()=>{
  		await SignUp(payload).then((response)=>{
  			if(response === null){
  					alert('error')
  			}
  			else{
  				router.push(`/salesperson/${response.data._id}`)
  			}
  		})
  		//console.log(payload)
  	}

	return(
		<Flex h='100vh' className={styles.SignupBody} direction='column'>
			<Header/>
			<Flex className={styles.authSection} gap='2' p='8'>
				<Text w='40vw'  fontSize='2.5rem' color='#fff' fontFamily='ClearSans-bold'><span style={{borderBottom:"3px solid #fff",borderRadius:"3px"}}>Welcome </span>to Pro-Kemia</Text>
				<Text w='40vw'  fontWeight='bold'>Connect and join a community of salespeople to interact, share, develop and grow each other.</Text>
			</Flex>
			<Flex className={styles.authForm} gap='2' direction='column'>
				<Text w='100%' textAlign='center' fontSize='2rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> Up</Text>
				<Flex gap='2'>
					<Flex direction='column' gap='2'>
						<Text>First-Name</Text>
						<Input type='text' placeholder='First-Name' variant='filled' required onChange={((e)=>{set_first_name(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='2'>
						<Text>Last-Name</Text>
						<Input type='text' placeholder='Last-Name' variant='filled' required onChange={((e)=>{set_last_name(e.target.value)})}/>
					</Flex>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text>Email</Text>
					<Input type='email' placeholder='Email' variant='filled' required onChange={((e)=>{set_email_of_company(e.target.value)})}/>
				</Flex>
				<Text>Password</Text>
				<InputGroup size='md'>
					<Input
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					placeholder='Enter password'
					variant='filled'
					required
					onChange={((e)=>{set_password(e.target.value)})}
					/>
						<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
						{show ? <VisibilityOff/> : <Visibility/>}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Text fontSize={'11px'}>By Signing up you agree to our <a href="t&c" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}> terms&conditions</a > and our <a href="privacy_policy" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}>privacy policy</a>.</Text>
				<Button bg='#000' color='#fff' onClick={handle_Sign_Up}>Create Sales Account</Button>
			</Flex>
		</Flex>
	)
}