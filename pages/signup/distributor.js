//modules imports
import React,{useState} from 'react'
import {Flex,Text,Button,Input,InputGroup,InputRightElement,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
//components imports
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header.js';
import Loading from '../../components/Loading.js'
//icon imports
import {Visibility,VisibilityOff} from '@mui/icons-material'
//api calls
import SignUp from '../api/auth/signup.js'
 
export default function DistributorSignUp(){
	//utils
	const router = useRouter();
	const cookies = new Cookies();
	const token = cookies.get('user_token');
	const toast = useToast();
	//apis
	//states
	const [show, setShow] = useState(false); //handle state to toggle password
	const handleClick = () => setShow(!show); //handle state to toggle view of password

  	const [company_name, set_company_name] = useState('');
  	const [password, set_password] = useState('');
  	const [email_of_company, set_email_of_company] = useState('');

  	const [is_submitting,set_is_submitting]=useState(false);

  	const payload = {
  		company_name,
  		password,
  		email_of_company,
  		acc_type: 'distributor'
  	}
  	const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  	const gmailRegex = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
	const yahooRegex = /^[^@]+@(yahoo|ymail|rocketmail)\.(com|in|co\.uk)$/i
	//functions
	const Verify_Inputs=()=>{
		set_is_submitting(true);
		if (password && company_name && email_of_company){
			if (!email_of_company.match(validRegex)){
				toast({
					title: '',
					description: 'Use a valid email format e.g example@company.com',
					status: 'info',
					isClosable: true,
				});
				setTimeout(()=>{
					set_is_submitting(false);
				},1000);
				return;
			}else if(email_of_company.match(gmailRegex) || email_of_company.match(yahooRegex)){
				toast({
					title: '',
					description: 'Use a company email to create an account',
					status: 'info',
					isClosable: true,
				});
				setTimeout(()=>{
					set_is_submitting(false);
				},1000);
				return;
			}else{
				handle_Sign_Up()
			}
		}else if(!password || !company_name || !email_of_company){
			toast({
				title: '',
				description: 'All inputs are required',
				status: 'info',
				isClosable: true,
			});
			set_is_submitting(false)
		}
	}
	const handle_Sign_Up=async()=>{
		await SignUp(payload).then((response)=>{
			if(response.status === 201){
				toast({
					title: '',
					description: `${response.data}`,
					status: 'error',
					isClosable: true,
				});
			}
			else{
				toast({
					title: '',
					description: 'Successfully Created an account',
					status: 'success',
					isClosable: true,
				});
				router.push(`/distributor/${response.data._id}`)
			}
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		}).finally(()=>{
			setTimeout(()=>{
					set_is_submitting(false);
				},1000);
		})
	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex className={styles.SignupBody}>
				<Flex className={styles.authSection} gap='2'>
					<Text w='100%' fontSize='2.5rem' color='#fff' fontFamily='ClearSans-bold' >Welcome to Pro<span style={{color:"#000"}}>Kemia</span> </Text>
					<Text w='100%' fontWeight='bold'>Find a market for your produced products.We help connect you to clients in search of similar products.Products will be showcased to our marketplace for clients to search for.</Text>
				</Flex>
				<Flex className={styles.authForm} gap='2' direction='column'>
					<Text w='100%' textAlign='center' fontSize='2rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> Up</Text>
					<Flex direction='column' gap='2'>
						<Text>Company Name</Text>
						<Input type='text' placeholder='Company-Name' variant='filled' required onChange={((e)=>{set_company_name(e.target.value)})}/>
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
					{is_submitting? 
						<Button
							bg='#009393'
							borderRadius='5'
							color='#fff'
							align='center'
						>
							<Loading width='40px' height='40px' color='#ffffff'/>
							creating an account...
						</Button>
						:
							<Button bg='#009393' color='#fff' onClick={Verify_Inputs} disabled={is_submitting? true:false}>Create Distributor Account</Button>						
					}
					<Text fontSize={'11px'}>By Signing up you agree to our <a href="t&c" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}> terms&conditions</a > and our <a href="privacy_policy" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}>privacy policy</a>.</Text>
					
				</Flex>
			</Flex>
		</Flex>
	)
}