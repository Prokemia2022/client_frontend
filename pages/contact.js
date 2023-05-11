import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input,Center,Textarea,useToast,Heading} from '@chakra-ui/react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from '../styles/ContactUs.module.css';
import Header from '../components/Header.js';
import Contact_Support from './api/control/contact_support.js'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from 'next/router';
import Loading from '../components/Loading';

function Contact(){
	const toast = useToast();
	const router = useRouter();
	const [email,set_email]=useState('')
	const [name,set_name]=useState('')
	const [message,set_message]=useState('');

	const [is_submitting,set_is_submitting]=useState(false)

	const payload = {
		email,
		name,
		message
	}

	const handle_send=async()=>{
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
	  		console.log(payload)
			await Contact_Support(payload).then(()=>{
				toast({
		          title: '',
		          description: `your support ticket has been created.`,
		          status: 'info',
		          isClosable: true,
		        });
			}).catch((err)=>{
				toast({
		          title: '',
		          description: `Could not create a support ticket. Try again.`,
		          status: 'error',
		          isClosable: true,
		        });
			})
	  	}
	}
	return(
		<Flex className={styles.Contact_Body}>
			<Flex className={styles.Contact_Image}>
				<Flex className={styles.Back_Icon} gap='2' boxShadow={'lg'} onClick={(()=>{router.back()})}>
					<ArrowBackIcon />
					<Text fontWeight={'bold'}>Back</Text>
				</Flex>
				<Flex className={styles.Contact_Links} gap='10' >
					<Text onClick={(()=>{router.push('/Aboutus')})}>About</Text>
					<Text onClick={(()=>{router.push('/privacy_policy')})}>Privacy</Text>
					<Text onClick={(()=>{router.push('/t&c')})}>Terms of Use</Text>
					<Text onClick={(()=>{router.push('/faqs')})}>FAQs</Text>
				</Flex>
			</Flex>
			<Flex className={styles.Form_Body}>
				<Flex className={styles.Back_Icon} gap='2' boxShadow={'lg'} onClick={(()=>{router.back()})}>
					<ArrowBackIcon />
					<Text fontWeight={'bold'}>Back</Text>
				</Flex>
				<Flex className={styles.Form} gap='4' direction='column'>
					<Heading as='h2' mb='0' onClick={(()=>{router.push('/')})} fontSize='28px' color='#00e0c6'>Pro<span style={{color:"#000"}}>Kemia</span></Heading>
					<Heading as='h6'>Get in Touch with us.</Heading>
						<Text>Feel free to contact us at any time. <br/>We will get back to you as soon as we can.</Text>
						<Input placeholder='Name' variant='filled' type='text' onChange={((e)=>{set_name(e.target.value)})}/>
						<Input placeholder='Email' variant='filled' type='email' onChange={((e)=>{set_email(e.target.value)})}/>
						<Textarea placeholder='Message' variant='filled' type='text' onChange={((e)=>{set_message(e.target.value)})}/>
					{is_submitting? 
						<Button
							bg='#009393'
							borderRadius='5'
							color='#fff'
							align='center'
						>
							<Loading width='40px' height='40px' color='#ffffff'/>
							submitting ...
						</Button>
						:
							<Button borderRadius='0' bg='#009393' color='#fff' border onClick={handle_send}> Submit </Button>							
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Contact;
// <Flex direction='column'>
// 			<Header/>
// 			<Flex direction='column' p='2' gap='3' h='100vh'>
// 			<Flex className={styles.contactbody} gap='3' justify='space-around'>
// 					<Flex direction='column' gap='6'>
// 					<Text fontFamily='ClearSans-bold' fontSize='48px'>Get in Touch with us.</Text>
// 						<Text>Feel free to contact us at any time. We will get back to you as soon as we can.</Text>
// 						<Input placeholder='Name' variant='filled' type='text' onChange={((e)=>{set_name(e.target.value)})}/>
// 						<Input placeholder='Email' variant='filled' type='email' onChange={((e)=>{set_email(e.target.value)})}/>
// 						<Textarea placeholder='Message' variant='filled' type='text' onChange={((e)=>{set_message(e.target.value)})}/>
// 						<Button borderRadius='0' bg='#009393' color='#fff' border onClick={handle_send}> Send </Button>
// 					</Flex>
// 					<Flex direction='column' color='#fff'  bg='#000' p='2' className={styles.contactside} gap='4' fontSize='24px'>
// 							<Text borderBottom='1px solid #fff' fontSize='32px'>Our Contacts</Text>
// 							<Flex align='center' gap='3'>
// 								<EmailIcon />
// 								<Link color='#009393' href={`mailto: help@prokemia.com`} isExternal>help@prokemia.com</Link>
// 							</Flex>
// 							<Flex align='center' gap='3'>
// 								<PhoneIcon />
// 								<Link href={`tel:+254 20 2525265`} isExternal>+254 20 2525265</Link>
// 							</Flex>
// 							<Flex align='center' gap='3'>
// 								<LocationCityIcon />
// 								<Text>Nairobi,Kenya</Text>
// 							</Flex>
// 							<Flex align='center' gap='3'>
// 								<AccessTimeIcon />
// 								<Text>0900hrs-1700hrs</Text>
// 							</Flex>
// 						</Flex>
// 				</Flex>
// 			</Flex>
// 		</Flex>