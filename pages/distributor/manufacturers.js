import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewManufacturer from '../../components/modals/addNewManufacturer.js';

function Manufacturers({distributor_data}){
	const router = useRouter();
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);
	const [manufacturers,set_manufacturers]=useState(distributor_data?.manufacturers)
	const id = distributor_data._id
	return(
		<Flex direction='column' gap='2' p='2' w='100%'>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible} id={id}/>
			<Text fontSize='32px' fontWeight='bold'>Manufacturers</Text>
			{manufacturers.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not listed any manufacturers</Text>
						<Button bg='#009393' color='#fff' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2' overflowY='scroll' h='85vh'>
					{manufacturers.map((item)=>{
						return(
							<Flex p='2' key={item.id} bg='#eee' borderRadius='5px' direction='column'>
							  <Text fontSize='24px' fontWeight='bold'>{item.name}</Text>
							  <Text>Email: {item.email}</Text>
							  <Text>Mobile: {item.mobile}</Text>
				     			<Flex gap='2'>
					    			<Text>Edit</Text>
						    		<Text color='red' cursor='pointer'>Remove</Text>
							    </Flex>
							</Flex>
						)
					})}
					<Button bg='#009393' p='5' color='#fff' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
				</Flex>
			}
		</Flex>
	)
}
 
export default Manufacturers;

