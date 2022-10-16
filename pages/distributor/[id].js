import React,{useState} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {useRouter} from 'next/router';

function distributor(){
	const [currentvalue,setCurrentValue]=useState('dashboard')
	if (currentvalue == 'inventory')
	{   
		return(
				<Flex p='1' className={styles.consolebody} >
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Inventory />
				</Flex>
			)
	}else if (currentvalue == 'settings')
	{
		return(
				<Flex p='1' className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Settings />
				</Flex>
			)
	}else if (currentvalue == 'salespersons')
	{
		return(
				<Flex p='1' className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Salespersons />
				</Flex>
			)
	}else{
		return(
				<Flex p='1' className={styles.consolebody} justify='space-between'>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Dashboard />
				</Flex>
			)
	}
}

export default distributor

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='1' gap='3' className={styles.consoleNavigation}>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'dashboard'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('dashboard')})}>Dashboard</Text>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'inventory'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('inventory')})}>Inventory</Text>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'salespersons'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('salespersons')})}>Salespersons</Text>
			
		</Flex>
	)
}

const Dashboard=()=>{
	return(
		<Flex p='1' direction='column' gap='4' w='100%'>
			<Flex gap='3' >
				<LocationCityIcon style={{fontSize:'100px'}}/>
				<Flex direction='column' gap='3'>
					<Text fontSize='20px' fontWeight='bold'>Distributor Name</Text>
					<Text>distributor@gmail.com</Text>
					<Text>0759233322</Text>	
					<Text>adress</Text>		
				</Flex>
			</Flex>
			<Flex gap='3'>
				<Button bg='#009393' color='#fff'>Add new Product</Button>
				<Button bg='#fff' border='1px solid #000'>Add new Salespersons</Button>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Salesperson</Text>
					<Text color='#009393' fontWeight='bold'>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Name</Text>
						<Text>0759233322</Text>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Name</Text>
						<Text>0759233322</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Products</Text>
					<Text color='#009393' fontWeight='bold'>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Cereals</Text>
						<Text>Agriculture</Text>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Fertilisers</Text>
						<Text>Agriculture</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

const Inventory=()=>{
	const router = useRouter();
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold'>Inventory</Text>
			<Flex gap='2'>
				<Button>Filter</Button>
				<Button>Sort</Button>
				<Input placeholder='search products'/>
			</Flex>
			<Flex p='3' bg='#eee' borderRadius='5px' direction='column' onClick={(()=>{router.push('/distributor/product')})}>
						<Text>Cereals</Text>
						<Text>Agriculture</Text>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Fertilisers</Text>
						<Text>Agriculture</Text>
					</Flex>
		</Flex>
	)
}

const Salespersons=()=>{
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold'>Salespersons</Text>
			<Flex direction='column' p='1'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column' onClick={(()=>{router.push('/distributor/product')})}>
						<Text>Steve Aomo</Text>
						<Text>0759233322</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Jared</Text>
						<Text>0798903901</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Button bg='#009393'>Add new Salesperson</Button>
			</Flex>
		</Flex>
	)
}

const Settings=()=>{
	return(
		<Flex>
			<Text>Settings</Text>
		</Flex>
	)
}