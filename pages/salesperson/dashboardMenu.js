//modules
import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input,Switch,useToast} from '@chakra-ui/react';
//api calls
import Edit_Salesperson from '../api/auth/salesperson/edit_salesperson_account.js';
import Email_Verification from '../api/email_handler/email_verification.js';
//icons;
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
//components
//utils
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';

export default function Salesperson({setCurrentValue,salesperson_data,set_is_refetch,is_refetch}){
	//utils
	const router = useRouter();
	const toast = useToast();
	const cookies = new Cookies();
	//states
	const annonymous = salesperson_data?.account_status;  //current status for the salesperson i.e annonymous or not
	const open_to_consultancy = salesperson_data?.open_to_consultancy;
	//functions
	const handle_annonymous_status=async()=>{
		if(salesperson_data?.suspension_status){
			////console.log(salesperson_data?.verification_status)
			toast({
				title: 'Your account is currently suspended.',
				description: 'reach out to support for guidance by emailing us at help@prokemia.com',
				status: 'error',
				isClosable: true,
			});
		}else if(!salesperson_data?.verification_status){
			//console.log(salesperson_data?.verification_status)
			toast({
				title: 'Your account has not been approved',
				description: '',
				status: 'info',
				isClosable: true,
			});
		}else{
			const payload = {
				_id: salesperson_data?._id,
				account_status: !annonymous
			}
			await Edit_Salesperson(payload).then(()=>{
				////console.log(payload)
				toast({
					title: '',
					description: 'Your account status has changed',
					status: 'info',
					isClosable: true,
				});
			}).then(()=>{
				set_is_refetch(!is_refetch)
			}).catch((err)=>{
				//console.log(err)
				toast({
					title: '',
					description: `error while changing your account status`,
					status: 'error',
					isClosable: true,
				});
			});
		}
	}
	const handle_open_to_consultancy_status=async()=>{
		if(salesperson_data?.suspension_status){
			////console.log(salesperson_data?.verification_status)
			toast({
				title: 'Your account is currently suspended.',
				description: 'reach out to support for guidance by emailing us at help@prokemia.com',
				status: 'error',
				isClosable: true,
			});
		}else if(!salesperson_data?.verification_status){
			////console.log(salesperson_data?.verification_status)
			toast({
				title: 'Your account has not yet been approved',
				description: '',
				status: 'info',
				isClosable: true,
			});
		}else{
			const payload = {
				_id: salesperson_data?._id,
				open_to_consultancy: !open_to_consultancy
			}
			await Edit_Salesperson(payload).then(()=>{
				////console.log(payload)
				toast({
					title: '',
					description: 'Your account status has changed',
					status: 'info',
					isClosable: true,
				});
			}).then(()=>{
				set_is_refetch(!is_refetch)
			}).catch((err)=>{
				//console.log(err)
				toast({
					title: '',
					description: `error while changing your account status`,
					status: 'error',
					isClosable: true,
				});
			});
		}
	}

	const Generate_Code=async()=>{
  		const characters = '0123456789';
  		let result = ''
  		const charactersLength = characters.length

  		for (let i = 0;i<6;i++){
  			result += characters.charAt(Math.floor(Math.random() * charactersLength));
  		}
  		cookies.set('verification_code', result, { path: '/' });
  		return result
  	}
	
	const handle_verify_email=async()=>{
		const code = await Generate_Code()
		const email_payload={
			email: salesperson_data.email_of_salesperson,
			code: code,
			link: `https://prokemia.com/verify/${'salesperson'}/${salesperson_data._id}`
		}
		await Email_Verification(email_payload).then(()=>{
			router.push(`/verify/${'salesperson'}/${salesperson_data._id}`)
		}).catch(()=>{
			toast({
				title: '',
				description: `error while verifying your account.`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	return(
			<Flex direction='column' w='100%'>
				<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
				{salesperson_data?.valid_email_status == false || !salesperson_data?.valid_email_status?
					<Flex w='100%' p='1' borderRadius='5' bg='#009393' align='center' justify='space-between' color='#fff' m=''>
						<Flex align='center' gap='2'>
							<InfoOutlinedIcon />
							<Flex direction='column'>
								<Text fontSize='18px' fontWeight='bold'>Verify your email.</Text>
								<Text fontSize={'14px'}>Get access to all features.</Text>
							</Flex>
						</Flex>
						<Button bg='#fff' color='#000' onClick={handle_verify_email}>Verify Email</Button>
					</Flex>
				: null
				}
					<Flex gap='4' justify='space-between'>
						<Text fontSize='42px' fontFamily='ClearSans-bold'>Welcome,<br/> {salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
						<Flex gap='2' direction='column'>
							<Flex gap='2' align='start'>
								<Switch value={open_to_consultancy} size='md' onChange={handle_open_to_consultancy_status}/>
								<Text fontSize='sm' w='150px' fontWeight='bold' color={open_to_consultancy == true ? '#009393' : '#000'}>{open_to_consultancy == true ? 'open to consult' : `Do you offer consultation? Toggle me.`}</Text>
							</Flex>
							{open_to_consultancy === true ?  								
							<Flex boxShadow='dark-lg' bg='#fff' w='150px' h='100px' direction='column' align='center' justify='center' borderRadius='5'>
								<SecurityOutlinedIcon/>
								<Text fontSize='12px' textAlign='center' color='#000' fontWeight='bold'>you are now open to provide consultation </Text>
							</Flex>
							: null}
						</Flex>
					</Flex>
					<Flex p='2' direction='column' gap='2' >
									<Flex gap='2'>
										<Flex _hover={{transform:"scale(1.02)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} cursor='pointer' onClick={(()=>{setCurrentValue('sale')})} bg='#fff' boxShadow='md' border='px dashed #009393' direction='column' align='center' justify='center' p='2' gap='2' w='175px' h='150px' borderRadius='5'>
											<ReceiptOutlinedIcon/>
											<Text>Initiate Sales</Text>
										</Flex>
										<Flex _hover={{transform:"scale(1.02)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} cursor='pointer' onClick={(()=>{setCurrentValue('hub')})} bg='#fff'  boxShadow='md' border='px dashed #009393' direction='column' align='center' justify='center' p='2' gap='2' w='180px' h='150px' borderRadius='5'>
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