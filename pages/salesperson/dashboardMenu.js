import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,Switch} from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '../../components/Header.js';
import CreateInvoiceModal from '../../components/modals/InvoiceModal.js';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Edit_Salesperson from '../api/auth/salesperson/edit_salesperson_account.js'

function Salesperson({setCurrentValue,salesperson_data}){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter();
	const [hubactive,sethubactive]=useState(false);
	const [edit,setedit]=useState(false);
	const annonymous = salesperson_data?.account_status;
	const [iscreateinvoiceModalvisible,setiscreateinvoiceModalvisible]=useState(false);

	console.log(annonymous)
	const handle_annonymous_status=async()=>{
		const payload = {
			_id: salesperson_data?._id,
			account_status: !annonymous
		}
		await Edit_Salesperson(payload).then(()=>{
			console.log(payload)
			alert('success')
			router.reload()
		})
	}
	return(
			<Flex direction='column' w='100%'>
				<CreateInvoiceModal iscreateinvoiceModalvisible={iscreateinvoiceModalvisible} setiscreateinvoiceModalvisible={setiscreateinvoiceModalvisible} salesperson_data={salesperson_data}/>
				<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
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
										<Flex _hover={{transform:"scale(1.02)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} cursor='pointer' onClick={(()=>{setiscreateinvoiceModalvisible(true)})} bg='#fff' boxShadow='dark-lg' border='px dashed #009393' direction='column' align='center' justify='center' p='2' gap='2' w='175px' h='150px' borderRadius='5'>
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

export default Salesperson;