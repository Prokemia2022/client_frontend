//modules import
import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import Script from 'next/script'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import {Flex,
		Text,
		Button,
		Stack,
		Divider,
		Menu,
	    MenuButton,
	    MenuList,
	    MenuItem,MenuDivider,Center} from '@chakra-ui/react'
//icon import
import {Close,Add,HorizontalRule,ArrowForward} from '@mui/icons-material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//components import
import Search from './Search.js'
import styles from '../styles/Home.module.css';


function Header({products_data,distributors_data,manufacturers_data,industries_data,technologies_data}){
	const [showmenubar,setshowmenubar]=useState(false);
	const [searchbaractive,setsearchbaractive]=useState(false);
	const [signedin,setsignedin]=useState(false);
	
	const [user,setuser]=useState('');
	const [acc_type,set_acc_type]=useState('');
	const [uid,set_uid]=useState('')


	const router = useRouter();
	const cookies = new Cookies();
	const token = cookies.get('user_token');
	
	useEffect(()=>{
		if(token){
			const details = jwt_decode(token)
			console.log(details)
			setsignedin(true)
			set_acc_type(details?.acc_type)
			setuser(details?.email)
			set_uid(details?.id)

			const payload = {
				email_of_company : details?.email,
				_id: uid
			}
			console.log(user)
		}else{
			setsignedin(false)
			//alert("could not get user id")
		}
	},[])
	const handleProfile=()=>{
		if(acc_type === 'sales')
			router.push(`/salesperson/${uid}`)
		if(acc_type === 'client')
			router.push(`/profile/${uid}`)
		if(acc_type === 'distributor')
			router.push(`/distributor/${uid}`)
		if(acc_type === 'manufacturer')
			router.push(`/manufacturer/${uid}`)
	}

	const handle_LogOut=()=>{
		cookies.remove('user_token', { path: '/' });
		// router.reload()
		router.push('/')
		setsignedin(false)
	}
	return(
		<Flex position='sticky' top='0' w='100%' zIndex='999' cursor='pointer' bg='#fff' fontFamily='ClearSans-Bold' p='2' direction='column'>
			<Flex justify='space-between' align='center'>
				<Text mb='0' onClick={(()=>{router.push('/')})} fontSize='28px' color='#00e0c6'>Pro<span style={{color:"#000"}}>Kemia</span></Text>
				<Flex align='center' gap='2'>
					{searchbaractive ? <SearchOffIcon onClick={(()=>{setsearchbaractive(false)})}/> : <SearchIcon onClick={(()=>{setsearchbaractive(true)})}/>}
					{signedin? 
						<FavoriteBorderIcon onClick={(()=>{router.push('/favorite')})}/> : 
						<Button onClick={(()=>{router.push('/account/1')})} bg='#009393' color='#fff' >Sign Up</Button>}
					<Menu >
					<Flex bg={signedin?'#009393':'#fff'} align='center' gap='1' p='1' borderRadius='5' color={signedin?'#fff':'#000'} align='center'>
						{signedin?<Text ml='1' fontSize='12px'>{user}</Text>:null}
						<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} pt='1' color={signedin?'#fff':'#000'}>
							<MenuOpenIcon style={{fontSize:'24px'}}/>
						</MenuButton>
					</Flex>
						<MenuList alignItems={'center'} p='2'>
							<Flex align='center' gap='2'>
								<Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
								<lord-icon src="https://cdn.lordicon.com/dklbhvrt.json" trigger="loop" delay="7000" style={{marginTop:'20px',width:'70px',height:"70px",}} >
								</lord-icon>
								{signedin? 
									<Flex direction='column' gap='1'>
										<Text>{user}</Text>
										<Text color='#009393' cursor='pointer' onClick={handleProfile}>view profile</Text>
									</Flex> 
									: 
									<Flex direction='column' gap='1' p='2' mt='3' color='#009393'>
										<Text onClick={(()=>{router.push(`/signin`)})}>sign in to <br/> view profile</Text>
									</Flex> 
								}
							</Flex>
							{navigation.map((nav)=>{
								return(
									<Flex mt='2' key={nav.id} direction='column' p='2' gap='2' onClick={(()=>{router.push(`${nav.link}`)})}>
										<Text mb='0' >{nav.title}</Text>
										<Divider/>
									</Flex>
								)
							})}
							{signedin? 
								<Button w='100%' bg='#000' color='#fff' onClick={handle_LogOut}>LogOut</Button>
									: 
								<Button onClick={(()=>{router.push(`/signin`)})} bg='#009393' color='#fff' w='100%'>Sign In</Button>}
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			{searchbaractive ? <Search products_data={products_data} distributors_data={distributors_data} manufacturers_data={manufacturers_data} industries_data={industries_data} technologies_data={technologies_data}/> : null}			
		</Flex>
	)
}

export default Header;

const navigation=[
	{
		id:1,
		title:'Explore industries',
		link:`/Industries/all`
	},
	{
		id:2,
		title:'Sell and Market your Products',
		link:'/account/2'
	},
	// {
	// 	id:3,
	// 	title:'Find Experts/Consultants',
	// 	link:'/experts'
	// },	
	{
		id:3,
		title:'Marketplace',
		link:'/market'
	},
]
