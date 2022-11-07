import React from 'react'
import {Flex, Text,Button,Center} from '@chakra-ui/react'
import {useRouter} from 'next/router'

function Footer(){
	const router = useRouter();
	return(
		<Flex direction='column' gap='5' mt='5' cursor='pointer'>
			<Flex justify='space-between' wrap='Wrap' p='2'>
				<Flex direction='column'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' onClick={(()=>{router.push('/')})} fontSize='32px' color='#00e0c6' fontWeight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
					<Button fontFamily='ClearSans-Bold' bg='#009393' color='#fff'  onClick={(()=>{router.push('/contact')})}>Contact us</Button>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontWeight='bold' >Company</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/Aboutus')})}>About Us</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/careers')})}>Careers</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontWeight='bold' >Support</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/contact')})}>Contacts</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/faqs')})}>FAQs</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/feedback')})}>FeedBacks</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontWeight='bold' >Legal</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/t&c')})}>Terms&Conditions</Text>
					<Text cursor='pointer' onClick={(()=>{router.push('/privacy_policy')})}>Privacy Policy</Text>
				</Flex>
			</Flex>
			<Center>
				<Text>Copyright @ proKemia 2022</Text>
			</Center>
		</Flex>
	)
}

export default Footer;