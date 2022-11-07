/*chakra-ui*/
import {Flex,Text,Button,Input} from '@chakra-ui/react';
/*css*/
import styles from '../../styles/Home.module.css';
/*Icons*/
import {LocationCity,Dashboard,Folder,Groups2,Groups} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
/*UseHooks*/
import {useRouter} from 'next/router';
import React,{useState} from 'react';
/*page sections*/
import DashboardMenu from './dashboardMenu.js';
import Inventory from './inventory.js';
import Distributors from './distributor.js';
import Experts from './experts.js';
import Settings from './settings.js';
import Premium from './Premium.js'


function Manufacturer(){
	const [currentvalue,setCurrentValue]=useState('dashboard')
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
	}else if (currentvalue == 'experts')
	{
		return(
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Experts />
				</Flex>
			)
	}else if (currentvalue == 'distributors')
	{
		return(
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Distributors />
				</Flex>
			)
	}else if (currentvalue == 'upgrade')
	{
		return(
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Premium />
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

export default Manufacturer

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
					<Flex key={content.id} color='#009393' align='center' p='2' gap='1' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px' color={currentvalue === content.title.toLowerCase() ? '#009393': '#000'} p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}