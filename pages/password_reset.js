import {useState,useEffect} from 'react';
import {Flex,Text,Button,Input,useToast,InputGroup,InputRightElement} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Header from '../components/Header.js';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Password_Reset from './api/auth/password_reset.js'
import {Visibility,VisibilityOff} from '@mui/icons-material'

export default function Password_Reset_Function(){
	const router = useRouter();
	const toast = useToast()
	const cookies = new Cookies();
	
	const [email,set_email]=useState('');
	const [active,set_active]=useState(true);
	const [code_active,set_code_active]=useState(false);
  	const [code,set_code]=useState();	

  	const [new_password,set_new_password]=useState('');
  	const [confirm_password,set_confirm_password]=useState('');

  	const [confirmation_code,set_confirmation_code]=useState();

  	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

  	useEffect(()=>{
  		const retrieved_password_reset_code = cookies.get("password_reset_code")
  		set_code(retrieved_password_reset_code)
  	},[])

	const Generate_Code=async()=>{
		const characters = '0123456789';
		const result = ''
		const charactersLength = characters.length

		for (const i = 0;i<6;i++){
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		cookies.set('password_reset_code', result, { path: '/' });
		set_code(result)
		return result
  	}

  	const Compare_Codes=()=>{
  		//set_active(!active)
  		if (code === confirmation_code){
  			set_active(!active)
  		}else{
  			console.log(confirmation_code)
  			toast({
	          title: '',
	          description: `wrong code,try again `,
	          status: 'error',
	          isClosable: true,
	        });
  		}
  	}

  	const Send_Email=async()=>{
  		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  		if (!email.match(validRegex)){
  			toast({
				title: '',
				description: 'Use a valid email format e.g example@company.com',
				status: 'info',
				isClosable: true,
			});
			return;
  		}else{
	  		const code = await Generate_Code()
	  		const payload = {
	  			code,
	  			email
	  		}
	  		console.log(payload)
	  		await axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/otp_password_email",payload).then(()=>{
				set_code_active(!code_active)
			}).catch((err)=>{
				toast({
					title: '',
					description: err,
					status: 'error',
					isClosable: true,
				});
			})
	  		//set_code_active(!code_active)
	  	}
  	}
  	const Set_New_Password=async()=>{
  		const payload = {
  			email_of_company : email,
  			password : new_password
  		}
  		if (new_password == confirm_password){
  			await Password_Reset(payload).then(()=>{
  				toast({
					title: '',
					description: 'password changed successfully,',
					status: 'success',
					isClosable: true,
				});
				axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/changed_password_email",payload).then(()=>{
					//set_code_active(!code_active)
				}).catch((err)=>{
					console.log(err)
				})
				router.push('/')
  			})
  		}else{
  			toast({
				title: '',
				description: 'passwords do not match',
				status: 'info',
				isClosable: true,
			});
  		}
  	}

	return(
		<Flex direction='column'>
			<Header/>
			<Flex p='2' align='center' justify='center' direction='column' p='2' gap='2' h='90vh' >
				<Text fontSize='28px' fontWeight='bold'>Password Reset</Text>
				{active?
					<Flex direction='column' gap='3'>
						<Text>Use the code sent to your email to change your password.</Text>
						{code_active?
							<Flex direction='column' gap='2'>
								<Input variant='filled' bg='#eee' required type='Number' placeholder='Enter Code' onChange={((e)=>{set_confirmation_code(e.target.value)})}/>
								<Flex gap='2'>
									<Button bg='#000' color='#fff' flex='1' onClick={(()=>{set_code_active(!code_active)})}>Resend Code</Button>
									<Button bg='#009393' flex='1' color='#fff' onClick={Compare_Codes}>Verify Code</Button>
								</Flex>
							</Flex>
						:
							<Flex direction='column' gap='2'>
								<Input variant='filled' bg='#eee' required type='email' placeholder='Enter your email' onChange={((e)=>{set_email(e.target.value)})}/>
								<Button bg='#000' color='#fff' onClick={Send_Email}>Send Email</Button>
							</Flex>
						}
						
					</Flex>
					:
					<>
						<Text>Enter your new password for your account.</Text>
						<Flex direction='column' gap='2' w='80%'>
							<Text>New Password</Text>
							<InputGroup size='md'>
								<Input
								pr='4.5rem'
								type={show ? 'text' : 'password'}
								placeholder='Enter password'
								variant='filled'
								required
								onChange={((e)=>{set_new_password(e.target.value)})}
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
									{show ? <VisibilityOff/> : <Visibility/>}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Text>Confirm new password</Text>
							<InputGroup size='md'>
								<Input
								pr='4.5rem'
								type={show ? 'text' : 'password'}
								placeholder='Enter password'
								variant='filled'
								required
								onChange={((e)=>{set_confirm_password(e.target.value)})}
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
									{show ? <VisibilityOff/> : <Visibility/>}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Button bg='#009393' color='#fff' onClick={Set_New_Password}>Change New Password</Button>
						</Flex>
					</>
				}
			</Flex>
		</Flex>
	)
}