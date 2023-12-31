//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//components import
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header.js';
/*page sections*/
import Settings from './settings.js'
import Sales from './sales.js';
import DashboardMenu from './dashboardMenu.js';
import Hub from './hub.js';
import Sale from './initiate_sale_form.js'
/*icons*/
import SettingsIcon from '@mui/icons-material/Settings';
import {LocationCity,Dashboard,Folder,Groups2,Groups,PostAdd} from '@mui/icons-material';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
//api calls
import Get_Salesperson from '../api/auth/salesperson/get_salesperson_client.js';
//error handlers
import Suspension_Notification from '../../components/error_handlers/account_suspension_notification';

function SalesPerson(){
	const [currentvalue,setCurrentValue] = useState('dashboard')
	const cookies = new Cookies();
	const toast = useToast();
	const router = useRouter();	
	const token = cookies.get('user_token');

	const [salesperson_data,set_salesperson_data]=useState("");
	const [is_refetch,set_is_refetch]=useState(false);

	useEffect(()=>{
		if(!token){
			toast({
				title: '',
				description: `broken link, we are redirecting you`,
				status: 'info',
				isClosable: true,
			});
			router.back()
		}else{
			const details = jwt_decode(token)
			//console.log(details)
			const payload = {
				email_of_company : details?.email,
				_id: details?.id
			}
			Get_Salesperson(payload).then((response)=>{
			//console.log(response.data)
			set_salesperson_data(response.data)
		})		}
	},[is_refetch])

	if (currentvalue == 'sales')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{salesperson_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Sales salesperson_data={salesperson_data} is_refetch={is_refetch} set_is_refetch={set_is_refetch} />
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{salesperson_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody}>
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Settings salesperson_data={salesperson_data} is_refetch={is_refetch} set_is_refetch={set_is_refetch}/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'hub')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{salesperson_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody}>
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Hub />
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'sale')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{salesperson_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody}>
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Sale setCurrentValue={setCurrentValue} salesperson_data={salesperson_data} is_refetch={is_refetch} set_is_refetch={set_is_refetch}/>
					</Flex>
				</Flex>
			)
	}else{
		return(
			<Flex direction='column' gap='2'>
				<Header/>
				{salesperson_data?.suspension_status?<Suspension_Notification/>:null}
				<Flex className={styles.consolebody} justify='space-between'>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<DashboardMenu setCurrentValue={setCurrentValue} salesperson_data={salesperson_data} is_refetch={is_refetch} set_is_refetch={set_is_refetch}/>
				</Flex>
			</Flex>
			)
	}
}

export default SalesPerson

const navItems = [
{
 	id:1,
	 title:'New_sale',
	 link:'sale',
	 icon:<PostAdd/>,
 },
 {
 	id:2,
	 title:'Dashboard',
	 link:'dashboard',
	 icon:<Dashboard/>,
 },
 {
 	id:3,
	 title:'Sales',
	 link:'sales',
	 icon:<Folder/>,
 },
 {
 	id:4,
	 title:'Hub',
	 link:'hub',
	 icon:<MarkUnreadChatAltOutlinedIcon/>,
 },
 {
 	id:5,
	 title:'Settings',
	 link:'settings',
	 icon:<SettingsIcon/>,
 },
 ]

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='2' gap='3' className={styles.consoleNavigation} cursor='pointer'>
			{navItems.map((content)=>{
				return (
					<Flex key={content.id}  color={currentvalue === content.title.toLowerCase() ? '#009393': '#fff'} align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px' p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}

