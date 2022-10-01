import React from 'react'
import {Flex, Text,Button,Center} from '@chakra-ui/react'
import {useRouter} from 'next/router'

function Footer(){
	const router = useRouter();
	return(
		<Flex direction='column' gap='5' mt='5' >
			<Flex justify='space-between' wrap='Wrap' p='2'>
				<Flex direction='column'>
					<Text fontFamily='ClearSans-Bold' onClick={(()=>{router.push('/')})} fontSize='32px' color='#00e0c6' fontweight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
					<Button fontFamily='ClearSans-Bold' bg='#009393' color='#fff'>Contact us</Button>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontweight='bold' >Company</Text>
					<Text  >About Us</Text>
					<Text  >Careers</Text>
					<Text  >Vacancies</Text>
					<Text  >Blog</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontweight='bold' >Support</Text>
					<Text >Contacts</Text>
					<Text >Help Center</Text>
					<Text >FAQs</Text>
					<Text >FeedBacks</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontweight='bold' >Legal</Text>
					<Text >Terms&Conditions</Text>
					<Text >Privacy Policy</Text>
					<Text >Legal Notice</Text>
				</Flex>
			</Flex>
			<Center>
				<Text>Copyright @ proKemia 2022</Text>
			</Center>
		</Flex>
	)
}

export default Footer;