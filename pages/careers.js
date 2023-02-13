import React,{useState,useEffect} from 'react'
import {Flex,Text,Input,Button,Heading} from '@chakra-ui/react'
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
		get_Careers_Data()
	},[])

	const get_Careers_Data=async()=>{
		await Get_Careers().then((response)=>{
			set_careers_data(response.data)
			//console.log(response.data)
		})
	}
	return(
			<Flex direction='column'>
				<Header/>
				<Flex direction='column' p='2'>
					<Heading as='h2' textDecoration='underline 1px solid #009393'>Vacancy Section</Heading>
					<Text>Find upcoming Events and meetups, seminars to build and enrich you.</Text>
					<Text>Find Job Listings, Job Openings, senior & junior positions from top companies and firms.</Text>
					<Text m='3' fontSize='24px' fontWeight='bold' textDecoration='underline 1px solid #000' textAlign='center'>VACANCIES</Text>
					<Flex direction='column' p='2' gap='3'>
						{careers_data.map((career)=>{
							return(
								<Career_Item career={career} key={career._id}/>
							)
						})}
					</Flex>

					<Text mt='10vh'>Be the first to recieve job listings, vacancies, Events notification</Text>
					<Text>Fill out the form to register and join our mailing list</Text>
					<Button borderRadius='0' bg='#009393' color='#fff' border onClick={(()=>{router.push("/career_mailing_list")})}>Register</Button>
				</Flex>
			</Flex>
	)
}

const Career_Item=({career})=>{
	return(
		<Flex direction='column' p='2' bg='#eee' borderRadius='5' boxShadow='dark-lg'>
			<Text fontSize='24px' fontWeight='bold'>{career.title}</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Posted by:</Text>
				<Text>{career.company}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Requirements: </Text>
				<Text>{career.requirements}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Description: </Text>
				<Text>{career.description}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Status: </Text>
				<Text>{career.status}</Text>
			</Flex>
		</Flex>
	)

}