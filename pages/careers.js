import React,{useState,useEffect} from 'react'
import {Flex,Text,Divider,Button,Heading} from '@chakra-ui/react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Header from '../components/Header.js';
import Get_Careers from './api/control/get_vacancies.js'
import {useRouter} from 'next/router';

export default function Careers(){
	const [careers_data,set_careers_data]=useState([])
	const [name,set_name]=useState('')
	const [email,set_email]=useState('')
	const router = useRouter();
	useEffect(()=>{
		//router.back()
		get_Careers_Data()
	},[])

	const get_Careers_Data=async()=>{
		await Get_Careers().then((response)=>{
			set_careers_data(response.data)
		})
	}
	return(
			<Flex direction='column'>
				<Header/>
				<Flex direction='column' p='4' h='100vh' gap='2' bg='#eee'>
					<Heading as='h2'>Careers</Heading>
					<Text>Find Job Listings, Job openings, senior & junior positions from top companies and firms.</Text>
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
			</Flex>
	)
}

const Career_Item=({career})=>{
	return(
		<Flex direction='column' p='4' bg='#fff' borderRadius='5' boxShadow='sm'>
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
		</Flex>
	)

}