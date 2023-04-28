//modules imports
import React,{useState,useEffect} from 'react';
import {Flex,Text} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
//.components imports
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header.js'
/*Icons*/
import {Dashboard,Folder,Groups2,Groups} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
/*page sections*/
import DashboardMenu from './dashboardMenu.js';
import Inventory from '../../components/suppliers_dashboard_pages/inventory.js';
import Distributors from './distributor.js';
import Experts from './experts.js';
import Settings from './settings.js';
import Premium from '../../components/suppliers_dashboard_pages/premium.js'
//api calls
import Get_Manufacturer from '../api/auth/manufacturer/get_manufacturer.js';
import Suspension_Notification from '../../components/error_handlers/account_suspension_notification.js';

export default function Manufacturer(){
	const [currentvalue,setCurrentValue]=useState('dashboard')
	const cookies = new Cookies();
	const token = cookies.get('user_token');
	const is_suspended = cookies.get('is_suspended');
	//console.log(is_suspended)

	const [manufacturer_data,set_manufacturer_data]=useState("");

	useEffect(()=>{
		if(!token){
			alert('could not get user_id')
		}else{
			const details = jwt_decode(token)
			//console.log(details)
			const payload = {
				email_of_company : details?.email,
				_id: details?.id
			}
			get_Data(payload)
		}
	},[token])
	const get_Data=async(payload)=>{
		//console.log(payload)
		await Get_Manufacturer(payload).then((response)=>{
			//console.log(response.data)
			set_manufacturer_data(response.data)
			cookies.set('is_acc_verified', response.data.valid_email_status, { path: '/' });
		})
	}

	if (currentvalue == 'inventory')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Inventory manufacturer_data={manufacturer_data} acc_type={'manufacturer'}/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Settings manufacturer_data={manufacturer_data}/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'experts')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Experts manufacturer_data={manufacturer_data}/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'distributors')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Distributors manufacturer_data={manufacturer_data}/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'upgrade')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Premium />
					</Flex>
				</Flex>
			)
	}else{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					{manufacturer_data?.suspension_status?<Suspension_Notification/>:null}
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<DashboardMenu manufacturer_data={manufacturer_data}/>
					</Flex>
				</Flex>
			)
	}
}

const navItems = [
 {
 	id:1,
	 title:'Dashboard',
	 link:'dashboard',
	 icon:<Dashboard/>,
 },
 {
 	id:2,
	 title:'Inventory',
	 link:'inventory',
	 icon:<Folder/>,
 },
 {
 	id:3,
	 title:'Distributors',
	 link:'distributors',
	 icon:<Groups/>,
 },
 {
 	id:4,
	 title:'Experts',
	 link:'experts',
	 icon:<Groups/>,
 },
 {
 	id:5,
	 title:'Settings',
	 link:'settings',
	 icon:<SettingsIcon/>,
 },
 {
 	id:6,
	 title:'Upgrade',
	 link:'upgrade',
	 icon:<WorkspacePremiumOutlinedIcon/>,
 }
 ]

const Navbar=({setCurrentValue,currentvalue,setActive})=>{

	return(
		<Flex p='2' gap='3' className={styles.consoleNavigation} cursor='pointer'>
			{navItems.map((content)=>{
				return (
					<Flex key={content.id} color={currentvalue === content.title.toLowerCase() ? '#009393': '#fff'} align='center' p='2' gap='1' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px' color={currentvalue === content.title.toLowerCase() ? '#009393': '#fff'} p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}