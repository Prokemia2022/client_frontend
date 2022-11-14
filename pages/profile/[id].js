import React,{useState} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShortExpProduct from '../../components/modals/ShortExpProduct.js';
import Header from '../../components/Header.js';

function Profile(){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [active,setActive]=useState(false);
	const [edit,setedit]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	const [account,setAccount]=useState('user')
	return(
		<Flex p='' direction='column' gap='2'>
		<Header/>
		<ShortExpProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
		{edit? 

			<EditProfile setedit={setedit}/>
			:
			<Flex direction='column' p='1'>
				<Flex gap='2' p='1' direction='column' w='70%'>
					<Text fontSize='42px' fontFamily='ClearSans-bold'>Welcome,<br/> John Doe</Text>
					<Text>johndoe@gmail.com</Text>
					<Flex gap='2' direction='column'> 
						<Button border='1px solid #000' bg='#fff' onClick={(()=>{setisaddnewProductModalvisible(true)})}>List a Product on Short Expiry</Button>
						<Button color='#fff' bg='#009393' onClick={(()=>{setedit(true)})}>Edit Profile</Button>
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
						<Text fontSize='20px' fontWeight='bold'>Recent Searches</Text>
						{active && currentValue === 'recents' ? 
							<KeyboardArrowUpIcon onClick={(()=>{setcurrentValue('');setActive(!active)})}/>
							:
							<KeyboardArrowDownIcon onClick={(()=>{setcurrentValue('recents');setActive(!active)})}/>
						}
					</Flex>
					{active && currentValue === 'recents' ? 
						<>
						<Flex gap='2' direction='column' bg='#eee' p='2'>
							<Text>Pharmaceutical</Text>
							<Text>Agriculture</Text>
						</Flex>
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
			</Flex>
		}
		</Flex>
	)
}

export default Profile;


const EditProfile=({setedit})=>{
	return(	
		<Flex gap='3' direction='column'>
			<Text fontSize='28px'>Edit Profile</Text>
			<Flex direction='column' gap='3' w='100%'>
					<Flex direction='column'>
						<Text>Name</Text>
						<Input type='text' value='UserName' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Email</Text>
						<Input type='email' value='johndoe@gmail.com' variant='filled'/>
					</Flex>
					<Flex direction='column'>
						<Text>Company</Text>
						<Input type='text' value='Company' variant='filled'/>
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