import {useState,useEffect} from 'react';
import {Flex,Text,Button,Input,useToast,InputGroup,InputRightElement,Heading, HStack, PinInput, PinInputField} from '@chakra-ui/react'
import {useRouter} from 'next/router';
import { MdVisibilityOff,MdVisibility  } from "react-icons/md";
//api
import styles from '../styles/Password.module.css';
import { Generate_Otp, Send_otp, Verify_otp } from '../hooks/useHandleOtp.hook.js';
import UseLogOut from '../hooks/useLogOut.hook.js';
import { useUserContext } from '../components/Providers/userContext.js';
import { Password_Reset } from './api/auth/route.api.js';

export default function Password_Reset_Function(){
	const {user,set_user_handler} = useUserContext()
	const router = useRouter();
	const query = router?.query?.email;
	const toast = useToast();
	
	const [email,set_email]=useState(query);
	const [active,set_active]=useState(true);
	const [code,set_code]=useState();	
	const [code_active,set_code_active]=useState(false);

  	const [new_password,set_new_password]=useState('');
  	const [confirm_password,set_confirm_password]=useState('');

  	const [confirmation_code,set_confirmation_code]=useState('');
  	const [isloading,set_isloading]=useState(false);

  	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

	const handle_otp=async()=>{
		const code = await Generate_Otp();
		if (code){
			const email_status = await Send_otp(code, email);
			console.log(email_status)
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
			return ;
		}
		set_active(!active);
  	}
	
  	const Set_New_Password=async()=>{
		set_isloading(true);
  		const payload = {
  			email_of_company : email,
  			password : new_password
  		}
  		if (new_password == confirm_password){
  			await Password_Reset(payload).then(()=>{
				toast({ title: 'Password has been changed successfully', description: 'Sign in again to your account', status: 'success', variant:'left-accent', position: 'top-left', isClosable: true });
				UseLogOut()
				set_user_handler(`${user?._id} logged out `)
				setTimeout(()=>{
					router.push('/')
					set_isloading(false)
				},2000);
			}).catch((err)=>{
				console.log(err)
			})
			
  		}else{
			toast({ title: 'Passwords do not match', description: '', status: 'warning', variant:'left-accent', position: 'top-left', isClosable: true });
			set_isloading(false)
  		}
  	}
	const [input_error,set_input_error]=useState(false);
	return(
		<Flex className={styles.Password_Body}>
			<div className={styles.Password_Image}/>
			<Flex direction='column' className={styles.Form_Body}>
				<Heading as='h3' >Forgot password?</Heading>
				{active?
					<Flex direction='column' gap='3' mt='3'>
						{code_active?
							<Text>Enter the code to change your password.</Text>
							:
							<Text>Enter email to receive the code to change your password.</Text>
						}
						{code_active?
							<Flex direction='column' gap='2'>
								<HStack>
									<PinInput type='number' onChange={((e)=>{set_confirmation_code(e)})} otp={true}>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
										<PinInputField errorBorderColor={input_error && confirmation_code == '' ? true : false}/>
									</PinInput>
								</HStack>
								<Flex gap='2'>
									<Button bg='#000' color='#fff' flex='1' onClick={(()=>{set_code_active(!code_active)})}>Resend Code</Button>
									<Button bg='#009393' flex='1' color='#fff' onClick={Compare_Codes}>Verify Code</Button>
								</Flex>
							</Flex>
						:
							<Flex direction='column' gap='2'>
								<Input value={email} variant='filled' bg='#eee' required type='email' placeholder='Enter your email' onChange={((e)=>{set_email(e.target.value)})}/>
								<Button bg='#000' color='#fff' onClick={handle_otp}>Send Email</Button>
							</Flex>
						}
						
					</Flex>
					:
					<>
						<Text>Enter your new password for your account.</Text>
						<Flex direction='column' gap='2' w='80%'>
							<Text>New Password</Text>
							<InputGroup size='md'>
								<Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_new_password(e.target.value)})} />
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
									{show ? <MdVisibilityOff/> : <MdVisibility/>}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Text>Confirm new password</Text>
							<InputGroup size='md'>
								<Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' variant='filled' required onChange={((e)=>{set_confirm_password(e.target.value)})} />
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
									{show ? <MdVisibilityOff/> : <MdVisibility/>}
									</Button>
								</InputRightElement>
							</InputGroup>
							{isloading?
								<Button loadingText='verifying...' isLoading/>
							:
								<Button bg='#009393' color='#fff' onClick={Set_New_Password} disabled={new_password?.length === 0 && confirm_password?.length === 0 ? true: false}>Set New Password</Button>
							}
						</Flex>
					</>
				}
			</Flex>
		</Flex>
	)
}