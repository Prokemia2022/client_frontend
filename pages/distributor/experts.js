import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';

function Experts(){
	const router = useRouter();
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	return (
		<Flex direction='column' gap='3' p='2' w='100%'>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible}/>
			<Text fontSize='32px' fontWeight='bold'>Experts</Text>
			<Flex direction='column' p='1' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Steve Aomo</Text>
						<Text>0759233322</Text>
						<Text>Role: sales</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Jared</Text>
						<Text>0798903901</Text>
						<Text>Role: sales</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Button bg='#009393' color='#fff' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
			</Flex>
		</Flex>
	)
}

export default Experts;

