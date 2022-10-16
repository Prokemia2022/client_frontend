import React from 'react'
import {Flex,Text,Input,Button,Heading} from '@chakra-ui/react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function careers(){
	return(
		<Flex direction='column' p='2'>
			<Heading as='h2' textDecoration='underline 1px solid #009393'>Careers Section</Heading>
			<Text>Find upcoming Events and meetups, seminars to build and enrich you.</Text>
			<Text>Find Job Listings, Job Openings, senior & junior positions from top companies and firms.</Text>
			<Text m='3' fontSize='24px' fontWeight='bold' textDecoration='underline 1px solid #000' textAlign='center'>VACANCIES</Text>
			<Flex direction='column' p='2' gap='3'>
				<Flex direction='column' p='2' bg='#eee' borderRadius='5'>
					<Text fontSize='20px' fontWeight='bold'>Sales position at Haco LTD</Text>
					<Text>Requirements</Text>
					<Text>3yrs experience</Text>
					<Text>Computer and English Proficient</Text>
					<Flex align='center' m='1' color='#009393'>
						<Text >Apply</Text>
						<OpenInNewIcon/> 
					</Flex>
				</Flex>
				<Flex direction='column' p='2' bg='#eee' borderRadius='5'>
					<Text fontSize='20px' fontWeight='bold'>Managerial position</Text>
					<Text>Requirements</Text>
					<Text>5yrs experience</Text>
					<Text>Masters Degree</Text>
					<Flex align='center' color='#009393' m='1'>
						<Text>Apply</Text>
						<OpenInNewIcon/> 
					</Flex>
				</Flex>
			</Flex>
			<Text>Be the first to recieve job listings, vacancies, Events notification</Text>
			<Text>Fill out the form to register and join our mailing list</Text>
			<Flex direction='column' gap='3' p='2' bg='#eee'>
					<Input placeholder='Name' bg='#fff'/>
					<Input placeholder='Email' bg='#fff'/>
					<Button borderRadius='0' bg='#009393' color='#fff' border>Register</Button>
				</Flex>
		</Flex>
	)
}

export default careers;