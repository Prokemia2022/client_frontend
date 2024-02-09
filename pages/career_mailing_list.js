import React,{useState} from 'react';
import {Flex,Text,Button,Input,Image,useToast} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import {useRouter} from 'next/router';
import Create_Career_mailing_list from './api/control/create_career_mailing_list.js'

export default function Career_mailing_list(){
  	const router = useRouter();
  	const toast = useToast();

  	const [name,setname]=useState('');
  	const [email,setemail]=useState('');

  	const payload = {
		name,
		email,
	}

	const Handle_Register=async()=>{
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
			await Create_Career_mailing_list(payload).then((response)=>{
				toast({
					title: '',
					description: `We have added your email to our mailing list.`,
					status: 'success',
					isClosable: true,
				});
				router.back()
			}).catch((err)=>{
					toast({
			          title: '',
			          description: `Could not submit your feedback. Try again.`,
			          status: 'error',
			          isClosable: true,
			        });
			})
	  	}
		
	}
	return(
		<Flex direction='column'>
			<Flex className={styles.feedbackBody}>
				<Flex className={styles.feedbackSection} gap='2' p='6'>
					<h3>Join Our Mailing List</h3>
					<Flex className={styles.CareerListingForm} gap='2' direction='column'>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Name</Text>
							<Input type='text' placeholder='name' variant='filled' onChange={((e)=>{setname(e.target.value)})}/>
						</Flex>
						<Flex direction='column' gap='2'>
							<Text fontWeight='bold'>Email</Text>
							<Input type='email' placeholder='Email' variant='filled' onChange={((e)=>{setemail(e.target.value)})}/>
						</Flex>
						<Button bg='#009393' color='#fff' onClick={Handle_Register}>Register</Button>
					</Flex>
				</Flex>
				<Flex className={styles.CareerListingForm} gap='2' direction='column'>
					<Image src='/feedback.jpg' alt='photo'/>
				</Flex>
			</Flex>

		</Flex>
	)
}