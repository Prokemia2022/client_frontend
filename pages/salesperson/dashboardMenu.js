//modules
import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input,Switch,useToast} from '@chakra-ui/react';
//api calls
import Edit_Salesperson from '../api/auth/salesperson/edit_salesperson_account.js';
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
//components
import Header from '../../components/Header.js';
//utils
import {useRouter} from 'next/router';
import axios from 'axios'
import Cookies from 'universal-cookie';

export default function Salesperson({setCurrentValue,salesperson_data}){
	//utils
	const router = useRouter();
	const toast = useToast();
	const cookies = new Cookies();
	//states
	const annonymous = salesperson_data?.account_status;  //current status for the salesperson i.e annonymous or not
	//functions
	const handle_annonymous_status=async()=>{
		const payload = {
			_id: salesperson_data?._id,
			account_status: !annonymous
		}
		await Edit_Salesperson(payload).then(()=>{
			//console.log(payload)
			toast({
				title: '',
				description: 'Your account status has changed',
				status: 'info',
				isClosable: true,
			});
		}).then(()=>{
			const timeout = setTimeout(()=>{
				router.reload()
			},3000)

			return ()=>{
				clearTimeout(timeout);
			}
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const Generate_Code=async()=>{
  		const characters = '0123456789';
  		const result = ''
  		const charactersLength = characters.length

  		for (const i = 0;i<6;i++){
  			result += characters.charAt(Math.floor(Math.random() * charactersLength));
  		}
  		cookies.set('verification_code', result, { path: '/' });
  		return result
  	}
	
	const handle_verify_email=async()=>{
		const code = await Generate_Code()
		const email_payload={
			email: salesperson_data.email_of_salesperson,
			code: code
		}
		await axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/email_verification",email_payload).then(()=>{
			router.push(`/verify/${'salesperson'}/${salesperson_data._id}`)
		})
	}
	return(
			<Flex direction='column' w='100%'>
				<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
				{salesperson_data.valid_email_status == false || !salesperson_data.valid_email_status?
						<Flex direction='column' gap='3' w='100%' bg='' p='2' borderRadius='5'>
							<Text fontSize='28px'fontWeight='bold' color='#009393'>Verify your email.</Text>
							<Text >Get access to all features and be an active user on our platform by verifying your email.</Text>
							<Text >It wont take more than a minute.</Text>
							<Flex gap='2'>
								<Button bg='#fff' border='1px solid #000' color='#000' onClick={handle_verify_email}>Verify Email</Button>
							</Flex>
						</Flex>
					: null
					}
					<Flex gap='4' justify='space-between'>
						<Text fontSize='42px' fontFamily='ClearSans-bold'>Welcome,<br/> {salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
						<Flex gap='2' direction='column'>
							<Flex gap='2'>
								<Switch value={annonymous} size='md' onChange={handle_annonymous_status}/>
								<Text fontSize='sm' w='100px' fontWeight='bold' color={annonymous == true ? '#009393' : '#000'}>{annonymous == true ? 'Annonymous' : `${salesperson_data?.email_of_salesperson}`}</Text>
							</Flex>
							{annonymous === true ?  								
							<Flex boxShadow='dark-lg' bg='#fff' w='150px' h='100px' direction='column' align='center' justify='center' borderRadius='5'>
								<SecurityOutlinedIcon/>
								<Text fontSize='12px' textAlign='center' color='#000' fontWeight='bold'>your account is now annonymous </Text>
							</Flex>
							: null}
						</Flex>
					</Flex>
					<Flex p='2' direction='column' gap='2' >
									<Flex gap='2'>
										<Flex _hover={{transform:"scale(1.02)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} cursor='pointer' onClick={(()=>{setCurrentValue('sale')})} bg='#fff' boxShadow='dark-lg' border='px dashed #009393' direction='column' align='center' justify='center' p='2' gap='2' w='175px' h='150px' borderRadius='5'>
											<ReceiptOutlinedIcon/>
											<Text>Initiate Sales</Text>
										</Flex>
										<Flex _hover={{transform:"scale(1.02)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} cursor='pointer' onClick={(()=>{setCurrentValue('hub')})} bg='#fff'  boxShadow='dark-lg' border='px dashed #009393' direction='column' align='center' justify='center' p='2' gap='2' w='180px' h='150px' borderRadius='5'>
											<Groups2OutlinedIcon/>
											<Text>Join the community</Text>
										</Flex>
									</Flex>
									<Text fontWeight='bold' fontSize='24px' color='#009393'>Annonymous</Text>
									<Text>By becoming annonymous , you can trade and make requests without your identity being known.<br/>You can make requests on behalf of other companies, your identity will be hidden as annonymous. Innovation core will trade on your behalf.</Text>
									<Text>toogle the bar at the top-Right, to switch accounts</Text>
									<Flex direction='column' gap='2'>
											<Text fontWeight='bold' fontSize='24px' color='#009393'>Join the community</Text>
											<Text>Meet and connect with other salespersons.<br/> Communicate and trade with each other in the exclusive Prokemia hub.</Text>
									</Flex>
								</Flex>
				</Flex>
			</Flex>
	)
}