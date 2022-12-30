import React,{useState} from 'react';
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement,Image,Textarea} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material';
import {useRouter} from 'next/router';
import Header from '../components/Header.js';
import Create_Feedback from './api/control/create_feedback.js'
import StarRateIcon from '@mui/icons-material/StarRate';

export default function ClientSignUp(){
	const [active, setActive] = useState(false);
  	const router = useRouter();

  	const [name,setname]=useState('');
  	const [email,setemail]=useState('');
  	const [feedback,setfeedback]=useState('');
  	const [rate,set_rate]=useState(5);

  	let route = '';

	const payload = {
		name,
		email,
		feedback,
		rate
	}

	const Handle_Create_Feedback=async()=>{
		console.log(payload)
		await Create_Feedback(payload).then((response)=>{
			alert('success')
			set_rate(5)
			setActive(false)
		})
	}
	return(
		<Flex direction='column'>
			<Header/>
			<Flex className={styles.feedbackBody}>
				<Flex className={styles.feedbackSection} gap='2' p='6'>
					<h3>We Value your feedback</h3>
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
						<Text fontWeight='bold'>feedback</Text>
						<Textarea type='text' placeholder='comment on your feedback' variant='filled' onChange={((e)=>{setfeedback(e.target.value)})}/>
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Rate Us</Text>
						<Flex gap='2'>
							<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 1? "#009393" : '#fff'} color={rate === 1? "gold" : '#000'} onClick={(()=>{set_rate(1)})}>1</Text>
							<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 2? "#009393" : '#fff'} color={rate === 2? "gold" : '#000'} onClick={(()=>{set_rate(2)})}>2</Text>
							<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 3? "#009393" : '#fff'} color={rate === 3? "gold" : '#000'} onClick={(()=>{set_rate(3)})}>3</Text>
							<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 4? "#009393" : '#fff'} color={rate === 4? "gold" : '#000'} onClick={(()=>{set_rate(4)})}>4</Text>
							<Text fontWeight='bold' w='30px' borderRadius='5' border='1px solid #000' p='2' cursor='pointer' bg={rate === 5? "#009393" : '#fff'} color={rate === 5? "gold" : '#000'} onClick={(()=>{set_rate(5)})}>5</Text>

						</Flex>
						<Input w='30px' type='Number' placeholder='1' variant='filled' onChange={((e)=>{set_rate(e.target.value)})}/>
					</Flex>
					<Button bg='#009393' color='#fff' onClick={Handle_Create_Feedback}>Submit Feedback</Button>
				</Flex>
				:
				<Flex gap='2' direction='column'>
					<Image src='/feedback.jpg' alt='photo'/>
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