/*useHooks*/
import React,{useState} from 'react';
import {useRouter} from 'next/router';
/*chakea-ui*/
import {Flex,Text,Input,Button,Image} from '@chakra-ui/react';
/*icons*/
import {LocationCity,Add} from '@mui/icons-material/';
/*modals*/
import AddNewProduct from '../../components/modals/AddNewProduct.js';
import AddNewExpertsModal from '../../components/modals/addNewExperts.js';
import AddNewDistributor from '../../components/modals/addNewDistributor.js';

function DashboardMenu({setCurrentValue}){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewexpertModalvisible,setisaddNewExpertModalvisible]=useState(false);
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);
	const [addnewInd,setaddnewInd]=useState(false);
	const [addnewTech,setaddnewTech]=useState(false);

	const router = useRouter();
	return (
		<Flex p='1' direction='column' gap='4' w='100%' overflowY='scroll' h='100vh'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewExpertsModal isaddnewexpertModalvisible={isaddnewexpertModalvisible} setisaddNewExpertModalvisible={setisaddNewExpertModalvisible}/>
			<AddNewDistributor isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible}/>
			<Flex gap='3' >
				<LocationCity style={{fontSize:'100px'}}/>
				<Flex direction='column' gap='3'>
					<Text fontSize='20px' fontWeight='bold'>Manufacturer Name</Text>
					<Text>Manufacturer@company.com</Text>
					<Text>0759233322</Text>	
					<Text>adress</Text>		
				</Flex>
			</Flex>
			<Flex gap='3'>
				<Button bg='#009393' color='#fff' onClick={(()=>{setisaddnewProductModalvisible(true)})}><Add/>Add new Product</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddNewExpertModalvisible(true)})}>Add new Expert</Button>
				<Button bg='#fff' border='1px solid #000' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
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
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('experts')})}>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Flex p='3' bg='#eee' borderRadius='5px' direction='column'>
						<Text>Shawn</Text>
						<Text>0759233322</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' gap='2'>
				<Flex justify='space-between' align='center' borderBottom='1px solid #000'>
					<Text fontWeight='bold' fontSize='20px'>Products</Text>
					<Text color='#009393' fontWeight='bold' onClick={(()=>{setCurrentValue('inventory')})}>view all</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<ProductItem router={router}/>
					<ProductItem router={router}/>
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
			<Input type='text' placeholder='New industry' bg='#fff'/>
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
			<Input type='text' placeholder='New Technology' bg='#fff'/>
			<Flex gap='2'>
				<Button bg='#009393' onClick={(()=>{setaddnewTech(false)})}>Submit</Button>
				<Button bg='#fff' border='1px solid red'>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const ProductItem=({router})=>{
	return(
		<Flex p='2' bg='#eee' m='2' borderRadius='5px' direction='column'>
			<Image bg='#fff' w='100%' h='50px' borderRadius='5px'/>
			<Text color='#009393' fontWeight='bold' fontSize="24px">Cereal</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Industry:</Text>
				<Text>Agriculture</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Technology:</Text>
				<Text>crops</Text>
			</Flex>
			<Text fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/manufacturer/product/cereals`)})}>View product -&gt;  </Text>
			</Flex>
	)
}