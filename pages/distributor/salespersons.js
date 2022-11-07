import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewSalesPerson from '../../components/modals/addNewSalesPerson.js'

function Salespersons(){
	const router = useRouter();
	const [isaddnewsalespersonModalvisible,setisaddNewSalesPersonModalvisible]=useState(false);
	return (
		<Flex direction='column' gap='3' p='2' w='100%'>
			<AddNewSalesPerson isaddnewsalespersonModalvisible={isaddnewsalespersonModalvisible} setisaddNewSalesPersonModalvisible={setisaddNewSalesPersonModalvisible}/>
			<Text fontSize='32px' fontWeight='bold'>Salespersons</Text>
			<Flex direction='column' p='1' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column' onClick={(()=>{router.push('/distributor/product')})}>
						<Text>Steve Aomo</Text>
						<Text>0759233322</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Jared</Text>
						<Text>0798903901</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Button bg='#009393' onClick={(()=>{setisaddNewSalesPersonModalvisible(true)})}>Add new Salesperson</Button>
			</Flex>
		</Flex>
	)
}

export default Salespersons;

