import React,{useState} from 'react';
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement,Image,Textarea} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material';
import {useRouter} from 'next/router';
import Header from '../components/Header.js';

export default function ClientSignUp(){
	const [active, setActive] = useState(false);
  	const router = useRouter();

  	const [naem,setnaem]=useState('');
  	const [email,setemail]=useState('');
  	const [comment,setcomment]=useState('');
  	let route = '';

  	const handleSignIn=()=>{
  		setActive(!active)
  	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex className={styles.feedbackBody}>
				<Flex className={styles.feedbackSection} gap='2' p='6'>
					<h3>We Value all the feedback</h3>
					<p>We value feedback, please rate your experience by clicking the button below.</p>
					<p>Thank you for helping us improve our sevices.</p>
					<Button w='40vw' bg='#009393' color='#fff' onClick={(()=>{setActive(!active)})}>Rate Us</Button>
				</Flex>
				{active? 
				<Flex className={styles.authForm} gap='2' direction='column'>
					<Text fontSize='2.5rem' fontFamily='ClearSans-bold'>Leave Us a feedback</Text>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Name</Text>
						<Input type='text' placeholder='name' variant='filled' onChange={((e)=>{setname(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Email</Text>
						<Input type='email' placeholder='Email' variant='filled' onChange={((e)=>{setemail(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Comment</Text>
						<Textarea type='text' placeholder='Comment' variant='filled' onChange={((e)=>{setcomment(e.target.value)})}/>
					</Flex>
					<Button bg='#009393' color='#fff' onClick={handleSignIn}>Submit Feedback</Button>
				</Flex>
				:
				<Flex gap='2' direction='column'>
					<Image src='/feedback.jpg'/>
				</Flex>
			}
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