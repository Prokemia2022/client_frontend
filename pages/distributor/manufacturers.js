import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewManufacturer from '../../components/modals/addNewManufacturer.js';

function Manufacturers(){
	const router = useRouter();
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);
	return(
		<Flex direction='column' gap='2' p='2' w='100%'>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible}/>
			<Text fontSize='32px' fontWeight='bold'>Manufacturers</Text>
			<Flex p='2' bg='#eee' borderRadius='5px' direction='column'>
			  <Text fontSize='24px' fontWeight='bold'>INCI Company</Text>
			  <Text>inci.sales@inci.com</Text>
     			<Flex gap='2'>
	    			<Text>Edit</Text>
		    		<Text color='red' cursor='pointer'>Remove</Text>
			    </Flex>
			</Flex>
			<Button bg='#009393' color='#fff' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
		</Flex>
	)
}

export default Manufacturers;

