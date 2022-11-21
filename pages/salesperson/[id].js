import React,{useState} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import {useRouter} from 'next/router';
import Header from '../../components/Header.js';
/*page sections*/
import Settings from './settings.js'
import Sales from './sales.js';
import DashboardMenu from './dashboardMenu.js';
import Hub from './hub.js';
/*icons*/
import SettingsIcon from '@mui/icons-material/Settings';
import {LocationCity,Dashboard,Folder,Groups2,Groups} from '@mui/icons-material';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';

function SalesPerson(){
	const [currentvalue,setCurrentValue] = useState('dashboard')
	if (currentvalue == 'sales')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Sales />
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody}>
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Settings />
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'hub')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody}>
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Hub />
					</Flex>
				</Flex>
			)
	}else{
		return(
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody} justify='space-between'>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<DashboardMenu setCurrentValue={setCurrentValue}/>
				</Flex>
			</Flex>
			)
	}
}

export default SalesPerson

const navItems = [
 {
 	id:1,
	 title:'Dashboard',
	 link:'dashboard',
	 icon:<Dashboard/>,
 },
 {
 	id:2,
	 title:'Sales',
	 link:'sales',
	 icon:<Folder/>,
 },
 {
 	id:3,
	 title:'Hub',
	 link:'hub',
	 icon:<MarkUnreadChatAltOutlinedIcon/>,
 },
 {
 	id:4,
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
					<Flex key={content.id} color='#009393' align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px'  color={currentvalue === content.title.toLowerCase() ? '#009393': '#000'} p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}

