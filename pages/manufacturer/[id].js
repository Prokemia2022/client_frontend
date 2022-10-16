import React,{useState} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {useRouter} from 'next/router';
import AddIcon from '@mui/icons-material/Add';

function Manufacturer(){
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
	}else if (currentvalue == 'experts')
	{
		return(
				<Flex p='1' className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Experts />
				</Flex>
			)
	}else if (currentvalue == 'distributors')
	{
		return(
				<Flex p='1' className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Distributors />
				</Flex>
			)
	}else{
		return(
				<Flex p='1' className={styles.consolebody} justify='space-between'>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Dashboard setCurrentValue={setCurrentValue}/>
				</Flex>
			)
	}
}

export default Manufacturer

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='1' gap='3' className={styles.consoleNavigation}>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'dashboard'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('dashboard')})}>Dashboard</Text>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'inventory'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('inventory')})}>Inventory</Text>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'distributors'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('distributors')})}>Distributors</Text>
			<Text fontSize='20px' borderRadius='5px' fontWeight='' bg='#eee' color={currentvalue == 'experts'? '#009393' : '#000'} p='1' mb='0' onClick={(()=>{setCurrentValue('experts')})}>Experts</Text>
		</Flex>
	)
}

const Dashboard=({setCurrentValue})=>{
	return(
		<Flex p='1' direction='column' gap='4' w='100%'>
			<Flex gap='3' >
				<LocationCityIcon style={{fontSize:'100px'}}/>
				<Flex direction='column' gap='3'>
					<Text fontSize='20px' fontWeight='bold'>Manufacturer Name</Text>
					<Text>Manufacturer@company.com</Text>
					<Text>0759233322</Text>	
					<Text>adress</Text>		
				</Flex>
			</Flex>
			<Flex gap='3'>
				<Button bg='#fff' border='1px solid #000'>Edit Profile</Button>
				<Button bg='#009393' color='#fff'><AddIcon />Add new Product</Button>
			</Flex>
			<Flex direction='column' gap='2'>
				<Text fontWeight='bold' fontSize='20px'>Industries</Text>
				<Flex direction='column' gap='2'>
					<Text>Personal Care</Text>
					<Text>Agriculture</Text>
				</Flex>
				<Button bg='#fff' border='1px solid #000'>Add new Industry</Button>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Distributors</Text>
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('distributors')})}>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Company</Text>
						<Text>0759233322</Text>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Company</Text>
						<Text>0759233322</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Experts</Text>
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('distributors')})}>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Shawn</Text>
						<Text>0759233322</Text>
					</Flex>
					<Button bg='#fff' border='1px solid #000'>Add new Experts</Button>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Products</Text>
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('inventory')})}>view all</Text>
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
			<Flex p='3' bg='#eee' borderRadius='5px' direction='column' onClick={(()=>{router.push('/manufacturer/product')})}>
						<Text>Cereals</Text>
						<Text>Agriculture</Text>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Fertilisers</Text>
						<Text>Agriculture</Text>
					</Flex>
			<Button bg='#009393'>Add new Products</Button>
		</Flex>
	)
}

const Distributors=()=>{
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold'>Distributors</Text>
			<Flex direction='column' p='1' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>INCI co.</Text>
						<Text>0759233322</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Dupoint</Text>
						<Text>0798903901</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Button bg='#009393'>Add new Distributor</Button>
			</Flex>
		</Flex>
	)
}

const Experts=()=>{
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold'>Experts</Text>
			<Flex direction='column' p='1' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>0759233322</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>0798903901</Text>
						<Flex gap='2'>
							<Text>Edit</Text>
							<Text color='red'>delete</Text>
						</Flex>
					</Flex>
					<Button bg='#009393'>Add new Experts</Button>
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