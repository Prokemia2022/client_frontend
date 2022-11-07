import React,{useState} from 'react'
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'

export default function SalesSignUp(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);

	return(
		<Flex h='100vh' className={styles.SignupBody}>
			<Flex className={styles.authSection} gap='2' p='8'>
				<Text w='40vw'  fontSize='2.5rem' color='#fff' fontFamily='ClearSans-bold'><span style={{borderBottom:"3px solid #fff",borderRadius:"3px"}}>Welcome </span>to Pro-Kemia</Text>
				<Text w='40vw'  fontWeight='bold'>Connect and join a community of salespeople to interact, share, develop and grow each other.</Text>
			</Flex>
			<Flex className={styles.authForm} gap='2' direction='column'>
				<Text w='100%' textAlign='center' fontSize='2rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> Up</Text>
				<Flex direction='column' gap='2'>
					<Text>User-Name</Text>
					<Input type='text' placeholder='User-Name' variant='filled'/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text>Email</Text>
					<Input type='email' placeholder='Email' variant='filled'/>
				</Flex>
				<Text>Password</Text>
				<InputGroup size='md'>
					
					<Input
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					placeholder='Enter password'
					variant='filled'
					required
					/>
						<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
						{show ? <VisibilityOff/> : <Visibility/>}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Text fontSize={'11px'}>By Signing up you agree to our <a href="t&c" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}> terms&conditions</a > and our <a href="privacy_policy" target="_blank" rel="noopener noreferrer" style={{color:'#009393'}}>privacy policy</a>.</Text>
				<Button bg='#000' color='#fff'>Create SalesPerson Account</Button>
			</Flex>
		</Flex>
	)
}