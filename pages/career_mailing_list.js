import React,{useState} from 'react';
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement,Image,Textarea} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material';
import {useRouter} from 'next/router';
import Header from '../components/Header.js';
import Create_Career_mailing_list from './api/control/create_career_mailing_list.js'

export default function Career_mailing_list(){
	const [active, setActive] = useState(false);
  	const router = useRouter();

  	const [name,setname]=useState('');
  	const [email,setemail]=useState('');

  	const payload = {
		name,
		email,
		// feedback,
		// rate
	}

	const Handle_Register=async()=>{
		await Create_Career_mailing_list(payload).then((response)=>{
			alert('success')
		})
	}
	return(
		<Flex direction='column'>
			<Header/>
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
					<Image src='/feedback.jpg'/>
				</Flex>
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