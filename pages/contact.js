import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input,Center,Textarea} from '@chakra-ui/react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from '../styles/Home.module.css';
import Header from '../components/Header.js';
import Contact_Support from './api/control/contact_support.js'

function Contact(){
	const [email,set_email]=useState('')
	const [name,set_name]=useState('')
	const [message,set_message]=useState('')

	const payload = {
		email,
		name,
		message
	}

	const handle_send=async()=>{
		console.log(payload)
		await Contact_Support(payload).then(()=>{
			alert('success')
		})
	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' p='2' gap='3' h='100vh'>
			<Text fontFamily='ClearSans-bold' fontSize='48px'>Get in Touch</Text>
			<Flex className={styles.contactbody} gap='3' justify='space-between'>
					<Flex direction='column' gap='6'>
						<Text>Feel free to contact us at any time. We will get back to you as soon as we can.</Text>
						<Input placeholder='Name' variant='filled' type='text' onChange={((e)=>{set_name(e.target.value)})}/>
						<Input placeholder='Email' variant='filled' type='email' onChange={((e)=>{set_email(e.target.value)})}/>
						<Textarea placeholder='Message' variant='filled' type='text' onChange={((e)=>{set_message(e.target.value)})}/>
						<Button borderRadius='0' bg='#009393' color='#fff' border onClick={handle_send}> Send </Button>
					</Flex>
					<Flex direction='column' color='#fff' gap='2'  bg='#000' p='2' className={styles.contactside}>
							<Text borderBottom='1px solid #fff' fontSize='32px'>Contacts</Text>
							<Flex align='center' gap='3'>
								<EmailIcon />
								<Text>app@prokemia.com</Text>
							</Flex>
							<Flex align='center' gap='3'>
								<PhoneIcon />
								<Text>+254 20 2525265</Text>
							</Flex>
							<Flex align='center' gap='3'>
								<LocationCityIcon />
								<Text>Nairobi,Kenya</Text>
							</Flex>
							<Flex align='center' gap='3'>
								<AccessTimeIcon />
								<Text>0900hrs-1700hrs</Text>
							</Flex>
						</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Contact;