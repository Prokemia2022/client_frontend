import React,{useState} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Settings(){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	const [account,setAccount]=useState('distributor');
	const [edit,setedit]=useState(false);

	return(
		<Flex p='2' direction='column' gap='2' w='100%'>
			<Text fontSize='34px' textDecoration='1px solid underline #009393' fontWeight='bold'>Settings</Text>
			{edit ?
				<EditProfile setedit={setedit}/>
				:
				<>
				<Flex gap='3'>
					<LocationCityIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}}/>
					<Flex direction='column' gap='3' w='100%'>
						<Text bg='#eee' p='1' borderRadius='5' fontSize='24px' fontWeight='bold' color='#009393'>Distributor Name</Text>
						<Text bg='#eee' p='1' borderRadius='5'>distributor@gmail.com</Text>
						<Text bg='#eee' p='1' borderRadius='5'>0759233322</Text>	
						<Text bg='#eee' p='1' borderRadius='5'>Alex@distributor.com</Text>
						<Text bg='#eee' p='1' borderRadius='5'>Manager</Text>
						<Text bg='#eee' p='1' borderRadius='5'>adress</Text>
						<Button onClick={(()=>{setedit(true)})} border='1px solid #000' bg='#fff'>Edit Profile</Button>		
					</Flex>

				</Flex>

				
				<Flex direction='column' gap='2'>
					<Flex justify='space-between' borderBottom='1px solid #000' align='center' p='1'>
						<Text fontSize='20px' fontWeight='bold'>Address</Text>
						{active && currentValue === 'address' ? 
							<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
							:
							<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('address');setActive(!active)})}/>
						}
					</Flex>
					{active && currentValue === 'address' ? 
						<>
						<Flex p='2' direction='column' gap='3' bg='#eee'>
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
					<Flex justify='space-between' borderBottom='1px solid #000' align='center' p='1'>
						<Text fontSize='20px' fontWeight='bold'>Security</Text>
						{active && currentValue === 'security' ? 
							<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
							:
							<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('security');setActive(!active)})}/>
						}
					</Flex>
					{active && currentValue === 'security' ? 
						<>
						<Flex gap='2' direction='column' >
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
					<Flex justify='space-between' borderBottom='1px solid #000' align='center' p='1'>
						<Text fontSize='20px' fontWeight='bold'>Account Settings</Text>
						{active && currentValue === 'settings' ? 
							<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
							:
							<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('settings');setActive(!active)})}/>
						}
					</Flex>
					{active && currentValue === 'settings' ? 
						<>
						<Flex gap='2' direction='column'>
							<Button bg='#ff' border='1px solid #000' onClick={(()=>{setAccount('salesperson')})}>Switch to Salesperson Account</Button>
							<Button bg='#ff' border='1px solid #000' onClick={(()=>{setAccount('distributor')})}>Switch to Distributor Account</Button>
							<Button bg='#ff' border='1px solid #000' onClick={(()=>{setAccount('manufacturer')})}>Switch to Manudafcturer Account</Button>
						</Flex>
						</>
						:
						null
					}
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex justify='space-between' borderBottom='1px solid #000' align='center' p='1' color='red'>
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
				</>
			}
		</Flex>
	)
}

export default Settings;

const EditProfile=({setedit})=>{
	return(	
		<Flex gap='3' direction='column'>
			<Flex gap='2' align='center'>
				<LocationCityIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
				<Text>Edit profile Photo</Text>
			</Flex>
			<Flex direction='column' gap='3' w='100%'>
					<Flex direction='column'>
						<Text>Name</Text>
						<Input type='text' value='Distributor Name' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Email</Text>
						<Input type='email' value='distributor@gmail.com' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Mobile</Text>
						<Input type='tel' value='0759233322' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Main Contact</Text>
						<Input type='Email' value='alex@distributor.com' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Role of main Contact</Text>
						<Input type='text' value='Manager' variant='filled'/>
					</Flex>
					<Button onClick={(()=>{setedit(false)})} bg='#009393' color='#fff'>Save</Button>
				</Flex>
			</Flex>
	)
}
