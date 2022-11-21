import React from 'react'
import {Flex,Image,Text,Input,Button,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function Inventory(){
	const router = useRouter();
	return(
		<Flex direction='column' gap='3' p='2' w='100%' overflowY='scroll' h='100vh'>
			<Text fontSize='32px' fontWeight='bold' textDecoration='3px solid underline #009393'>Sales</Text>
			<Flex gap='2'>
				<Select w='150px' placeholder='sort'>
					<option>Pending </option>
					<option>Disbursed</option>
					<option>Completed</option>
					<option>Rejected</option>
				</Select>
				<Input placeholder='search orders by product name, order Id'/>
			</Flex>
			<Item router={router}/>
			<Item router={router}/>
			<Item router={router}/>
		</Flex>
	)
}

export default Inventory;

const Item=({router})=>{
	return(
		<Flex boxShadow='lg' p='2' bg='#fff' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
			<Text fontSize='20px' fontWeight='bold'>Order Id: 28739842</Text>
			<Text>Product Name: Cereal</Text>
			<Text>Unit Price: 200</Text>
			<Text>Volume: 1000</Text>	
			<Text>Email of Client: joan@jussup.com</Text>	
			<Text>date: 21-11-2022</Text>	
			<Text>Order Status: <span style={{color:'orange'}}>Pending</span></Text>	
		</Flex>
	)
}
