import React,{useState} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import {useRouter} from 'next/router';

/*page sections*/
import Settings from './settings.js'
import Inventory from './inventory.js';
import Salespersons from './salespersons.js';
import DashboardMenu from './dashboardMenu.js';
import Manufacturers from './manufacturers.js';

/*icons*/
import SettingsIcon from '@mui/icons-material/Settings';
import {LocationCity,Dashboard,Folder,Groups2,Groups} from '@mui/icons-material';

function Distributor(){
	const [currentvalue,setCurrentValue] = useState('dashboard')
	if (currentvalue == 'inventory')
	{   
		return(
				<Flex className={styles.consolebody} >
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Inventory />
				</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return(
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Settings />
				</Flex>
			)
	}else if (currentvalue == 'salespersons')
	{
		return(
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Salespersons />
				</Flex>
			)
	}else if (currentvalue == 'manufacturers')
	{
		return (
			<Flex className={styles.consolebody}>
				<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
				<Manufacturers/>
			</Flex>
		)
	}else if (currentvalue == 'settings')
	{
		return (
			<Flex className={styles.consolebody}>
				<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
				<Settings/>
			</Flex>
		)
	}else{
		return(
				<Flex className={styles.consolebody} justify='space-between'>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<DashboardMenu setCurrentValue={setCurrentValue}/>
				</Flex>
			)
	}
}

export default Distributor

const navItems = [
 {
 	id:1,
	 title:'dashboard',
	 icon:<Dashboard/>,
 },
 {
 	id:2,
	 title:'inventory',
	 icon:<Folder/>,
 },
 {
 	id:3,
	title:'salespersons',
	icon:<Groups2/>,
 },
 {
 	id:4,
	 title:'manufacturers',
	 icon:<Groups/>,
 },
 {
 	id:5,
	 title:'settings',
	 icon:<SettingsIcon/>,
 }
 ]

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='2' gap='3' className={styles.consoleNavigation} cursor='pointer'>
			{navItems.map((content)=>{
				return (
					<Flex key={content.id} color='#009393' align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.title)})}>
						{content.icon}
						<Text fontSize='20px'  color={currentvalue == content.title ? '#009393': '#000'} p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}

