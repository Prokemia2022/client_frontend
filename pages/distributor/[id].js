import React,{useState} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import {useRouter} from 'next/router';
import Header from '../../components/Header.js';
/*page sections*/
import Settings from './settings.js'
import Inventory from './inventory.js';
import Experts from './experts.js';
import DashboardMenu from './dashboardMenu.js';
import Manufacturers from './manufacturers.js';
import Premium from './Premium.js'
/*icons*/
import SettingsIcon from '@mui/icons-material/Settings';
import {LocationCity,Dashboard,Folder,Groups2,Groups} from '@mui/icons-material';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

function Distributor(){
	const [currentvalue,setCurrentValue] = useState('dashboard')
	if (currentvalue == 'inventory')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Inventory />
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
	}else if (currentvalue == 'experts')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody}>
						<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Experts />
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'manufacturers')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Manufacturers/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'upgrade')
	{
		return(
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Premium />
				</Flex>
			</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Settings/>
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

export default Distributor

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
	title:'Experts',
	link:'experts',
	icon:<Groups2/>,
 },
 {
 	id:4,
	 title:'Manufacturers',
	 link:'manufacturers',
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
					<Flex key={content.id} color='#009393' align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px'  color={currentvalue === content.title.toLowerCase() ? '#009393': '#000'} p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}

