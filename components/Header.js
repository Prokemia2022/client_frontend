import React,{useState} from 'react'
import {Flex,
		Text,
		Button,
		Stack,
		Divider,
		Menu,
	    MenuButton,
	    MenuList,
	    MenuItem,MenuDivider,Center} from '@chakra-ui/react'
import {Close,Add,HorizontalRule,ArrowForward} from '@mui/icons-material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {useRouter} from 'next/router'
import Script from 'next/script'

function Header(){
	const [showmenubar,setshowmenubar]=useState(false);
	const router = useRouter();
	return(
		<Flex position='sticky' top='0' w='100%' zIndex='999' cursor='pointer' bg='#fff' fontFamily='ClearSans-Bold' h='70px' p='2' justify='space-between' align='center'>
			<Text mb='0' onClick={(()=>{router.push('/')})} fontSize='28px' color='#00e0c6'>Pro<span style={{color:"#000"}}>Kemia</span></Text>
			<Flex align='center' gap='2'>
				<Text mb='0' onClick={(()=>{router.push(`/signin`)})}>Sign in</Text>
				<Button onClick={(()=>{router.push('/account/1')})} bg='#009393' color='#fff' >Sign Up</Button>
				<Menu >
					<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} pt='1' color='#000'>
						<MenuOpenIcon/>
					</MenuButton>
					<MenuList alignItems={'center'} p='2'>
						<Center>

							<Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
							<lord-icon src="https://cdn.lordicon.com/dklbhvrt.json" trigger="loop" delay="7000" style={{marginTop:'20px',width:'70px',height:"70px",}} >
							</lord-icon>
						</Center>
						{navigation.map((nav)=>{
							return(
								<Flex m='0' key={nav.id} direction='column' p='2' gap='2' onClick={(()=>{router.push(`${nav.link}`)})}>
									<Text mb='0' >{nav.title}</Text>
									<Divider/>
								</Flex>
							)
						})}
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	)
}

export default Header;

const navigation=[
	{
		id:1,
		title:'Explore',
		link:`/industry/agriculture`
	},
	{
		id:2,
		title:'Sell and Market your Products',
		link:'/account/2'
	},
	{
		id:3,
		title:'Find Experts/Consultants',
		link:'/experts'
	},	
	{
		id:4,
		title:'Marketplace',
		link:'/shortonexpiry'
	},
]
