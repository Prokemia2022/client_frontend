import React,{useState} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Salesperson(){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	const [account,setAccount]=useState('user')
	const [hubactive,sethubactive]=useState(false)
	return(
		<Flex p='2' direction='column' gap='2'>
			<Flex align='center' justify='space-around'>
				<AccountCircleIcon style={{fontSize:'100px'}}/>
				<Flex p='1' direction='column' w='60%'>
					<Text>John Doe</Text>
					<Text>Johndoe@gmail.com</Text>
					<Text>0759233322</Text>
					<Text>Company</Text>
					<Text>SalesPerson</Text>
				</Flex>
			</Flex>
			<Button mt='2' color='#fff' bg='#009393'>Edit Profile</Button>
			<Button mt='2' color='#fff' bg='#009393'>Become Annonymous</Button>
			<Text>By becoming annonymous , you can trade and make requests without your identity being known.<br/>You can make requests on behalf of other companies, your identity will be hidden as annonymous. Innovation core will trade on your behalf.</Text>
			{hubactive?
				<Button onClick={(()=>{router.push(`/hub`)})} color='#fff' bg='#000'>Prokemia Hub</Button>
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
				<Flex justify='space-between' borderBottom='1px solid #000'  color='#009393' align='center' bg='#eee' p='1'>
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
	)
}

export default Salesperson;
