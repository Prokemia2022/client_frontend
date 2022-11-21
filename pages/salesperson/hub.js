import React,{useState} from 'react'
import {Flex,Text,Spacer,Input,Image} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import {useRouter} from 'next/router'

function Hub(){
	const [active,setActive]=useState(false);
	const router = useRouter();
	setTimeout(()=>{
		//router.push('/hub')
	},3000)
	return(
		<Flex align='center' justify='center' w='100%' h='80vh' direction='column'>
			<Image src='../community.jpg' alt='photo' w='300px' h='300px'/>
			<Text fontWeight='bold' fontSize='28px' mt='-20px'>Redirecting to the hub...</Text>
		</Flex>
	)
}

export default Hub;