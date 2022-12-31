import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';

function Experts({manufacturer_data}){
	const router = useRouter();
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [experts,set_experts]=useState(manufacturer_data?.experts)
	const id = manufacturer_data?._id
	return (
		<Flex direction='column' gap='3' p='2' w='100%'>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible} id={id} acc_type='manufacturer'/>
			<Text fontSize='32px' fontWeight='bold'>Experts</Text>
			{experts.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not listed any experts</Text>
						<Button bg='#009393' color='#fff' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2' overflowY='scroll' h='85vh'>
					{experts.map((item)=>{
						return(
							<Flex key={item._id} p='3' bg='#eee' borderRadius='5px' direction='column'>
								<Text>Name: {item.name}</Text>
								<Text>Mobile: {item.mobile}</Text>
								<Text>Role: {item.role}</Text>
								<Flex gap='2'>
									<Text>Edit</Text>
									<Text color='red'>delete</Text>
								</Flex>
							</Flex>
						)
					})}
					<Button bg='#009393' color='#fff' p='5' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add a new Expert</Button>
				</Flex>
			}
		</Flex>
	)
}

export default Experts;