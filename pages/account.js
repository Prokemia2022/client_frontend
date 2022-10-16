import React,{useState}from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'

function Account(){
	const [active,setActive]=useState('0');
	return(
		<Flex p='2' direction='column' gap='3'>
			<Text fontWeight='bold' fontSize='32px' color='#000'>Select an Account</Text>
			<Text>Whether you are a buyer or want to market your products,<br></br> setting up your account is fast,simple and easy and in minutes.</Text>
			<Flex h='60vh' justify='center' p='5' bg='blue' align='center'>
				<Flex opacity={active === '1'? '1' : '0.5'} bg='black' transform={active === '1'? 'scale(1.1)' : 'scale(1)'} onClick={(()=>{setActive('1')})} border='1px solid #000' w='40%' >1</Flex>
				<Flex opacity={active === '2'? '1' : '0.5'} bg='black' transform={active === '2'? 'scale(1.1)' : 'scale(1)'} onClick={(()=>{setActive('2')})} border='1px solid #000' w='40%' >2</Flex>
			</Flex>
		</Flex>
	)
}

export default Account;