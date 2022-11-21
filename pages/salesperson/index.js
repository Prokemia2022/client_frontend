import React,{useState} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,Switch} from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '../../components/Header.js';
import CreateInvoiceModal from '../../components/modals/InvoiceModal.js';

function Salesperson(){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter();
	const [hubactive,sethubactive]=useState(false);
	const [edit,setedit]=useState(false);
	const [annonymous,setannonymous]=useState(false);
	const [iscreateinvoiceModalvisible,setiscreateinvoiceModalvisible]=useState(false);
	return(
			<Flex direction='column' w='100%'>
				<CreateInvoiceModal iscreateinvoiceModalvisible={iscreateinvoiceModalvisible} setiscreateinvoiceModalvisible={setiscreateinvoiceModalvisible}/>
				<Header/>
				<Flex p='2' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
					<Flex align='center' gap='4' justify='space-between'>
						<Text fontSize='34px' fontWeight='bold'>Profile</Text>
						<Flex gap='2' >
						<Switch size='md' onChange={(()=>{setannonymous(!annonymous)})}/>
						<Text fontSize='sm' color='#009393'>Become annonymous</Text>
					</Flex>
					</Flex>
					{edit ?
						<EditProfile setedit={setedit}/>
					:
						<>
								<Flex p='2' direction='column' gap='2'>
									<Flex align='center' justify='space-around'>
										<AccountCircleIcon style={{fontSize:'150px'}}/>
										<Flex p='1' gap='1' direction='column' w='60%'>
											<Text bg='#eee' p='1' borderRadius='2'>John Doe</Text>
											<Text bg='#eee' p='1' borderRadius='2'>Johndoe@gmail.com</Text>
											<Text bg='#eee' p='1' borderRadius='2'>0759233322</Text>
											{annonymous == true ? 
												<Text fontWeight='bold' bg='#eee' p='1' borderRadius='2'>{annonymous == true ? 'annonymous' : 'salesperson'}</Text>
													:
												<>
													<Text bg='#eee' p='1' borderRadius='2'>Company</Text>
													<Text bg='#eee' p='1' borderRadius='2'>{annonymous == true ? 'annonymous' : 'salesperson'}</Text>
												</>
											}
											<Button mt='2' color='#fff' bg='#009393' onClick={(()=>{setedit(true)})}>Edit Profile</Button>
										</Flex>
									</Flex>
									<Text>By becoming annonymous , you can trade and make requests without your identity being known.<br/>You can make requests on behalf of other companies, your identity will be hidden as annonymous. Innovation core will trade on your behalf.</Text>
									{hubactive || annonymous?
										<Flex direction='column' gap='2'>
											<Button onClick={(()=>{router.push(`/hub`)})} color='#fff' bg='#000'>Prokemia Hub</Button>
											<Button onClick={(()=>{setiscreateinvoiceModalvisible(true)})} color='#fff' bg='#009393'>Initiate Sales</Button>
										</Flex>
											:
										<Flex direction='column' gap='2'>
											<Button onClick={(()=>{sethubactive(true)})} color='#fff' bg='#009393'>Join the community</Button>
											<Text>Meet and connect with other salespersons.<br/> Communicate and trade with each other in the exclusive Prokemia hub.<br></br><span style={{color:"#009393"}}>Join community to find out more</span></Text>
										</Flex>
									}
									<Flex direction='column' gap='2'>
										<Flex justify='space-between' borderBottom='1px solid #000' align='center' bg='#eee' p='1'>
											<Text fontSize='20px' fontWeight='bold'>Address</Text>
											{active && currentValue === 'address' ? 
												<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
											:
												<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('address');setActive(!active)})}/>
											}
									</Flex>
									{active && currentValue === 'address' ? 
										<>
											<Flex bg='#eee' p='2' direction='column' gap='3'>
												<Text fontWeight='bold' fontSize='18px'>Juja,Jkuat</Text>
												<Flex gap='2'>
													<Text color='#009393' fontSize='14px'>Edit</Text>
													<Text color='red' fontSize='14px'>Delete</Text>
												</Flex>
											</Flex>
											<Button bg='#fff' border='1px solid #000'>Add New Address</Button>
										</>
										:
										null
									}
								</Flex>
								<Flex direction='column' gap='2'>
									<Flex justify='space-between' borderBottom='1px solid #000' align='center' bg='#eee' p='1'>
										<Text fontSize='20px' fontWeight='bold'>Recent Searches</Text>
										{active && currentValue === 'recents' ? 
											<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
												:
											<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('recents');setActive(!active)})}/>
										}
									</Flex>
									{active && currentValue === 'recents' ? 
										<>
											<Flex gap='2' direction='column'>
												<Text>Pharmaceutical</Text>
												<Text>Agriculture</Text>
											</Flex>
										</>
											:
										null
									}
								</Flex>
								<Flex direction='column' gap='2'>
									<Flex justify='space-between' borderBottom='1px solid #000' align='center' bg='#eee' p='1'>
										<Text fontSize='20px' fontWeight='bold'>Security</Text>
										{active && currentValue === 'security' ? 
											<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
										:
											<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('security');setActive(!active)})}/>
										}
									</Flex>
									{active && currentValue === 'security' ? 
										<>
											<Flex gap='2' direction='column'>
												<Text fontWeight='bold'>Password</Text>
												<Input type='password' value='sammydennis'/>
												<Button bg='#ff' border='1px solid #000'>Change Password</Button>
											</Flex>
										</>
											:
										null
									}
								</Flex>
								<Flex direction='column' gap='2'>
									<Flex justify='space-between' borderBottom='1px solid #000' align='center' bg='#eee' p='1' color='red'>
										<Text fontSize='20px' color='red' fontWeight='bold'>Delete Account</Text>
										{active && currentValue === 'delete' ? 
										<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
										:
										<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('delete');setActive(!active)})}/>
										}
									</Flex>
									{active && currentValue === 'delete' ? 
										<>
											<Text>By deleting your account , all your information, products and activities in our platform will be erased as your account will be permamnetly deleted and will not be restored.</Text>
											<Button bg='#ff' border='1px solid red'>Delete Account</Button>
										</>
											:
										null
									}
								</Flex>
							</Flex>
						</>
					}
				</Flex>
			</Flex>
	)
}

export default Salesperson;

const EditProfile=({setedit})=>{
	return(	
		<Flex gap='3' direction='column'>
			<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}}/>
			<Flex direction='column' gap='3' w='100%'>
					<Flex direction='column'>
						<Text>Name</Text>
						<Input type='text' value='Name' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Email</Text>
						<Input type='email' value='sales@gmail.com' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Company</Text>
						<Input type='text' value='company' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' value='0759233322' variant='filled'/>
					</Flex>
					<Button onClick={(()=>{setedit(false)})} bg='#009393' color='#fff'>Save</Button>
				</Flex>
			</Flex>
	)
}
