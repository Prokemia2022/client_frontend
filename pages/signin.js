//modules import
import React,{useState} from 'react'
import {Flex,Text,Button,Input,InputGroup,InputRightElement,useToast,Heading} from '@chakra-ui/react'
//api calls
import SignIn from './api/auth/signin.js'
//components import
//icons
import {Visibility,VisibilityOff} from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//utils
import {useRouter} from 'next/router'
import styles from '../styles/Auth.module.css';
import Loading from '../components/Loading.js';

export default function UserSignIn(){
	//utils
	const router = useRouter();
	const toast = useToast()
	//states
	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

	const [password,setpassword]=useState(''); //password input
	const [email_of_company,set_email_of_company]=useState(''); //email input

	//const [is_submitting,set_is_submitting]=useState(false);
	const [is_submitting,set_is_submitting]=useState(false)

	const payload = {
		password,
		email_of_company
	}
	//function
	const handleSignIn=async()=>{
		set_is_submitting(true)
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
				router.back()
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
		set_is_submitting(false)
	}

	return(
		<Flex className={styles.AuthBody}>
			<div className={styles.Auth_Image}>
				<Flex className={styles.Back_Icon} gap='2' boxShadow={'lg'} onClick={(()=>{router.back()})}>
					<ArrowBackIcon />
					<Text fontWeight={'bold'}>Back</Text>
				</Flex>
				<Flex className={styles.Auth_Links} gap='10' >
					<Text onClick={(()=>{router.push('/Aboutus')})}>About</Text>
					<Text onClick={(()=>{router.push('/privacy_policy')})}>Privacy</Text>
					<Text onClick={(()=>{router.push('/t&c')})}>Terms of Use</Text>
					<Text onClick={(()=>{router.push('/faqs')})}>FAQs</Text>
				</Flex>
			</div>
			<Flex className={styles.Form_Body}>
				<Flex className={styles.Back_Icon} gap='2' boxShadow={'lg'} onClick={(()=>{router.back()})}>
					<ArrowBackIcon />
					<Text fontWeight={'bold'}>Back</Text>
				</Flex>
				<Flex className={styles.Form} gap='4' direction='column'>
					<Heading as='h2' mb='0' onClick={(()=>{router.push('/')})} fontSize='28px' color='#00e0c6'>Pro<span style={{color:"#000"}}>Kemia</span></Heading>
					<Heading as='h6'>Sign-in</Heading>
					<Input type='text' placeholder='Enter your Email' variant='filled' onChange={((e)=>{set_email_of_company(e.target.value)})}/>
					<InputGroup size='md'>
						<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter your password' 
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
					{is_submitting? 
						<Button
							bg='#009393'
							borderRadius='5'
							color='#fff'
							align='center'
						>
							<Loading width='40px' height='40px' color='#ffffff'/>
							signing you in...
						</Button>
						:
							<Flex direction={'column'} mt='2' gap='2'>
								<Text cursor='pointer' fontSize='14px' color='red' onClick={(()=>{router.replace('/password_reset')})}> Forgot Password?</Text>
								<Button bg='#009393' color='#fff' onClick={handleSignIn} disabled={is_submitting? true:false}>Sign In</Button>
							</Flex>							
					}
					<Flex gap='1'>
						<Text>Dont have an account?</Text>
						<Text onClick={(()=>{router.push('/account/1')})} fontWeight={'bold'} cursor='pointer' fontSize='16px' color="#009393">Sign Up now.</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}