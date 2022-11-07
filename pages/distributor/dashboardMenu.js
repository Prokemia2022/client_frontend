import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewSalesPerson from '../../components/modals/addNewSalesPerson.js';
import AddNewManufacturer from '../../components/modals/addNewManufacturer.js';

function DashboardMenu({setCurrentValue}){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewsalespersonModalvisible,setisaddNewSalesPersonModalvisible]=useState(false);
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);
	const [addnewInd,setaddnewInd]=useState(false);
	const [addnewTech,setaddnewTech]=useState(false);

	const router = useRouter();
	return (
		<Flex p='1' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewSalesPerson isaddnewsalespersonModalvisible={isaddnewsalespersonModalvisible} setisaddNewSalesPersonModalvisible={setisaddNewSalesPersonModalvisible}/>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible}/>
			<Flex gap='3'>
				<LocationCityIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px',padding:'10px'}}/>
				<Flex direction='column' gap='3'>
					<Text fontSize='24px' fontWeight='bold' color='#009393'>Distributor Name</Text>
					<Text>distributor@gmail.com</Text>
					<Text>0759233322</Text>	
					<Text>adress</Text>		
				</Flex>
			</Flex>
			<Flex gap='3' wrap='Wrap'>
				<Button bg='#009393' color='#fff' onClick={(()=>{setisaddnewProductModalvisible(true)})}>Add new Product</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddNewSalesPersonModalvisible(true)})}>Add new Salespersons</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>Add new Manufacturer</Button>
			</Flex>
			<Text mb='0'>Operating in an industry or Technology not included in our options?</Text>
			{addnewInd || addnewTech ? 
				<>	{addnewInd ? <AddNewIndustry setaddnewInd={setaddnewInd}/> : <AddNewTechnology setaddnewTech={setaddnewTech}/>} </>
				:
				<Flex cursor='pointer' gap='2' direction='column'>
					<Text color='#009393' onClick={(()=>{setaddnewInd(true)})}>Suggest a new Industry</Text>
					<Text color='#009393' onClick={(()=>{setaddnewTech(true)})}>Suggest a new Technology</Text>
				</Flex>
			}

			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Salesperson</Text>
					<Text color='#009393' fontWeight='bold' cursor='pointer' onClick={(()=>{setCurrentValue('salespersons')})}>view all</Text>
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
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('inventory')})} cursor='pointer'>view all</Text>
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

export default DashboardMenu;

const AddNewIndustry=({setaddnewInd})=>{
	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Industry</Text>
			<Input type='text' placeholder='New industry'/>
			<Flex gap='2'>
				<Button bg='#009393' onClick={(()=>{setaddnewInd(false)})}>Submit</Button>
				<Button bg='#fff' border='1px solid red'>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const AddNewTechnology=({setaddnewTech})=>{
	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Technology</Text>
			<Input type='text' placeholder='New Technology'/>
			<Flex gap='2'>
				<Button bg='#009393' onClick={(()=>{setaddnewTech(false)})}>Submit</Button>
				<Button bg='#fff' border='1px solid red'>Cancel</Button>
			</Flex>
		</Flex>
	)
}
