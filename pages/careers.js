import React,{useState,useEffect} from 'react'
import {Flex,Text,Divider,Button,Heading, useDisclosure, Box, Center, Icon, Image} from '@chakra-ui/react'
import Get_Careers from './api/control/get_vacancies.js';

import Apply_to_career_modal from '../components/modals/apply_to_career_modal.js';

export default function Careers(){
	const [careers_data,set_careers_data]=useState([]);

	const [view_careers,set_view_careers]=useState(false);
	
	useEffect(()=>{
		get_Careers_Data()
	},[])

	const get_Careers_Data=async()=>{
		await Get_Careers().then((response)=>{
			set_careers_data(response.data)
		})
	}
	return(
		<Box h='100vh'>
			{view_careers?
				<Flex direction='column' p='4' gap='2' >
					<Heading as='h2'>Careers</Heading>
					<Text>Find Job Listings, Job openings, senior & junior <br/>positions from top companies and firms.</Text>
					{careers_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' bg='#fff' borderRadius={'5'}>
							<Text textAlign='center' fontSize='20px' color='grey'>No careers have been listed at the moment</Text>
						</Flex>
					:
						<Flex direction='column' p='' gap='3'>
							{careers_data.map((career)=>{
								return(
									<Career_Item career={career} key={career._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				:
				<Flex w='full' align='center' justify={'space-around'} my='8' gap='2' flexDirection={{base:'column-reverse',md:'row'}}>
					<Flex w={{base:'100%',md:'50%'}} my={{base:'6',md:'0'}} flexDirection={'column'} align={'center'} gap='2'>
						<Text fontSize={'6xl'} fontWeight={'bold'}>Careers at <br/> Prokemia</Text>
						<Button borderRadius={'full'} bg='#009393' color='#fff' size={'md'} w='200px' onClick={(()=>{set_view_careers(true)})}>See Openings</Button>
					</Flex>
					<Image src='../people-working-office.jpg' boxSize={{base:'100%',md:'50%'}} borderRadius={'0'} boxShadow={'sm'} objectFit={'cover'} alt='banner'/>
				</Flex>
			}
		</Box>
	)
}

const Career_Item=({career})=>{
	const applytoCareer_integrations = useDisclosure()
	return(
		<Flex direction='column' p='4' bg='#fff' borderRadius='5' boxShadow='md'>
			<Apply_to_career_modal applytoCareer_integrations={applytoCareer_integrations} career={career}/>
			<Text fontSize='24px'>{career.title}</Text>
			<Text>{career.description}</Text>
			<Flex mt='2' gap='2' fontSize={'12px'}>
				<Text color='grey'>Company:</Text>
				<Text>{career.company}</Text>
			</Flex>
			<Flex gap='1' fontSize={'12px'} direction={'column'}>
				<Text color='grey'>Requirements</Text>
				<Divider/>
				<Text>{career.requirements}</Text>
			</Flex>
			<Text fontSize={'12px'} color='grey'>{career.status}</Text>
			<Box mt='2' >
				<Button colorScheme='teal' onClick={applytoCareer_integrations?.onOpen}>
					Apply for this job
				</Button>
			</Box>
		</Flex>
	)

}