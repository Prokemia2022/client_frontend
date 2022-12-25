import React,{useState} from 'react'
import {Flex,Center,Text,Heading,Button,Input,InputGroup,InputRightElement,Image,Textarea} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import {useRouter} from 'next/router'
import styled from 'styled-components';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import Create_Landing_page_mailing_list from './api/control/create_landing_page_mailing_list.js'

export default function ClientSignUp(){
	return(
 		<Flex>
			<Image src='./landing1.jpg' h='100vh' w='100vw' objectFit='cover'/>
			<Header />
			<LandingText/>
		</Flex>
	)
}

const LandingText=()=>{
	return(
			<div className={styles.landingslider}>
				<Carousel autoplay dots={false} autoplaySpeed={5000}>
					{infos.map((info)=>{
						return(
							<Flex key={info.id} color='#fff' direction='column'> 
								<Text color='#009393' fontSize='36px' fontFamily='ClearSans-bold'>{info.heading}</Text>
								<Text fontSize='20px' mb='0' w='80%'>{info.text}</Text>
							</Flex>
						)
					})}
				</Carousel>
				<Form/>
			</div>
	)
}

const Form=()=>{
	const [email,set_email]=useState('')
	const payload = {
		email:email
	}
	const handle_register=async()=>{
		await Create_Landing_page_mailing_list(payload).then(()=>{
			alert('success')
			window.location.reload()
		})
	}
	return(
		<Flex gap='2' direction='column' w='300px' color='#fff'>
			<Flex direction='column' gap='2'>
				<Text mb='0' fontWeight='bold' fontSize='24px' color='#009393'>Get the early access.</Text>
				<Flex>
					<Input bg='#fff' color='#000'borderRadius='5px 0 0px 5px' type='email' placeholder='Email' variant='filled' onChange={((e)=>{set_email(e.target.value)})}/>
					<Button borderRadius='0px 5px 5px 0px' bg='#009393' onClick={handle_register}>Submit</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

const Header=()=>{
	return(
		<Flex className={styles.landingheader}>
			<Text fontFamily='ClearSans-bold'><span style={{color:'#009393'}}>Pro</span>kemia</Text>
		</Flex>
		
	)
}

const infos=[
	{
		id: 1,
		heading:'The Marketplace for ingredients, Polymers and Chemistry.',
		text:'Search, Learn, Engage ,get samples and request quotations for products, and purchase from thousands of distributors - all in one platform.Access all easily.'
	},
	{
		id: 2,
		heading:'Sell and Market your products.',
		text:'Find a market for your produced products.We help connect you to clients in search of similar products.Products will be showcased to our marketplace for clients to search for.'
	},
	{
		id: 3,
		heading:'Why Choose Us',
		text:'Interact with over 8,000 suppliers, browse their catalogs, access documents and download starter formulations.Discover over 180k products in more than 8,000 storefronts.'
	},
	{
		id: 4,
		heading:'Become a salesperson',
		text:'Connect and join a community of salespeople to interact, share, develop and grow each other.'
	},
]

const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    padding:10px;
    margin: 10px; 
    position:absolute;
    top:20%;
    width:60%
`
