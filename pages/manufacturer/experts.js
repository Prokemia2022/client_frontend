import React,{useState} from 'react';
import {Flex,Text,Input,Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';

function Experts(){
	const router = useRouter();
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);

	return(
		<Flex direction='column' gap='2' p='2' w='100%'  overflowY='scroll' h='100vh'>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible}/>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid #009393 underline'>Experts</Text>
			<Button bg='#009393' color='#fff' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add new Expert</Button>
			<Flex direction='column' gap='2'>
				<Expert/>
				<Expert/>
				<Expert/>
			</Flex>
			
		</Flex>
	)
}

export default Experts;

const Expert=()=>{
	return(
		<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
			<Text>Name</Text>
			<Text>0759233322</Text>
			<Text>Position</Text>
			<Flex gap='2'>
				<Text>Edit</Text>
				<Text color='red'>delete</Text>
			</Flex>
		</Flex>

	)
}