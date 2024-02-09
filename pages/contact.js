import React,{useState} from 'react';
import {Flex,Text,Button,Input,Textarea,useToast,Heading} from '@chakra-ui/react';
import styles from '../styles/ContactUs.module.css';
import Contact_Support from './api/control/contact_support.js';
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
			<div className={styles.Contact_Image}>
				<Flex className={styles.Contact_Links} gap='10' >
					<Text onClick={(()=>{router.push('/Aboutus')})}>About</Text>
					<Text onClick={(()=>{router.push('/privacy_policy')})}>Privacy</Text>
					<Text onClick={(()=>{router.push('/t&c')})}>Terms of Use</Text>
					<Text onClick={(()=>{router.push('/faqs')})}>FAQs</Text>
				</Flex>
			</div>
			<Flex className={styles.Form_Body}>
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