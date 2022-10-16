import React,{useState} from 'react'
import {Flex, Text,Button,Stack,Divider} from '@chakra-ui/react'
import {Menu,Close,Add,HorizontalRule,ArrowForward} from '@mui/icons-material';
import {useRouter} from 'next/router'

function Header(){
	const [showmenubar,setshowmenubar]=useState(false);
	const router = useRouter();
	return(
		<Flex position='sticky' top='0' w='100%' zIndex='999' cursor='pointer' bg='#eee' fontFamily='ClearSans-Bold' h='70px' p='2' justify='space-between' align='center'>
			<Text onClick={(()=>{router.push('/')})} fontSize='28px' color='#00e0c6' fontweight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
			<Flex align='center' gap='2'>

				<Text onClick={(()=>{router.push(`/profile/1`)})}>Account</Text>
				<Button onClick={(()=>{router.push('/auth')})} bg='#009393' color='#fff' >Sign In</Button>
				{showmenubar ? 
					<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
						:
					<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
				}
				{showmenubar ? 
					<MenuBar setshowmenubar={setshowmenubar} />
						:
					null 
				}
			</Flex>
		</Flex>
	)
}

export default Header;

const navigation=[
	{
		title:'For Manufacturers',
		content:['Create an account','Sell Products','Request Demo']
	},
	{
		title:'For Distributors',
		content:['Create an account','Sell Products','Contact Prokemia']
	},
	{
		title:'For Salespersons',
		content:['Create an account','Sell Products','Join Sales Community']
	},
]
const MenuBar=()=>{
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	return(
		<Flex direction='column' gap='4' p='4' w='60vw' h='90vh' bg='#eee' position='absolute' top='50px' right='0px' zIndex='2' >
			{navigation.map((item)=>{
				return(
					<>
						<Flex align='center' bg='#fff' p='2' borderRadius='1' justify='space-between' onClick={(()=>{setActive(!active); setcurrentValue(`${item.title}`)})}>		
							<Text mb='0' >{item.title}</Text>
							{active && item.title === currentValue ? <HorizontalRule /> : <Add />}
						</Flex>
						
						{active && item.title === currentValue ? 
							<Flex pl='4' direction='column' gap='3'>
								{item.content.map((text)=>{
									return(
										<div key={text.id} style={{display:'flex',justifyContent:'space-between',borderBottom:"1px solid grey",padding:'10px'}}>
											<Text mb='0'>{text}</Text>		
											<ArrowForward/>
										</div>
									)
								})}
							</Flex>
							:
							null
						}
					</>
				)
			})}
		</Flex>
	)
}
