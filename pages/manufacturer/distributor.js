import React,{useState} from 'react'
import {Flex,Text,Input,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import AddNewDistributor from '../../components/modals/addNewDistributor.js';
import FindDistributors from '../../components/modals/FindDistributors.js';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function Distributors({manufacturer_data}){
	const router = useRouter();
	const [isaddnewdistributorModalvisible,setisaddnewdistributorModalvisible]=useState(false);
	const [isfinddistributorModalvisible,setisfinddistributorModalvisible]=useState(false);
	const [infoactive,setinfoActive]=useState(false);
	//const [distributors,set_distributors]=useState(manufacturer_data?.distributors)
	const distributors = manufacturer_data?.distributors
	const id = manufacturer_data?._id

	return(
		<Flex direction='column' gap='2' p='2' w='100%'  overflowY='scroll' h='100vh'>
			<AddNewDistributor isaddnewdistributorModalvisible={isaddnewdistributorModalvisible} setisaddnewdistributorModalvisible={setisaddnewdistributorModalvisible} id={id}/>
			<FindDistributors isfinddistributorModalvisible={isfinddistributorModalvisible} setisfinddistributorModalvisible={setisfinddistributorModalvisible} id={id}/>
			<Text fontSize='32px' fontWeight='bold'>Distributors</Text>
			{distributors?.length === 0 ?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2'>
						<Text>You have not listed any distributors</Text>
						{infoactive? 
							<Flex direction='column'>
								<Text fontSize='12px' fontWeight='bold' color='#009393'>Find Distributors around a specific region to help deliver and market your product</Text>
								<Text fontSize='12px' fontWeight='bold' color='#009393'>Fill out a form and we will help you expand your borders.</Text>
							</Flex>
								 : null}
						<Flex gap='2'>
							<Flex position='relative' align='center' gap='2'> 
								<HelpOutlineOutlinedIcon onClick={(()=>{setinfoActive(!infoactive)})}/>
								<Button onClick={(()=>{setisfinddistributorModalvisible(true)})}>Look for Distributors </Button>
							</Flex>
							<Button flex='1' bg='#009393' color='#fff' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
						</Flex>
					</Flex>
				:
				<Flex direction='column' p='1' gap='2'>
					{distributors?.map((item)=>{
						return(
							<Distributor item={item} key={item._id}/>
						)
					})}
					{infoactive? 
						<Flex direction='column'>
							<Text fontSize='12px' fontWeight='bold' color='#009393'>Find Distributors around a specific region to help deliver and market your product</Text>
							<Text fontSize='12px' fontWeight='bold' color='#009393'>Fill out a form and we will help you expand your borders.</Text>
						</Flex>
							 : null}
					<Flex gap='2'>
						<Flex position='relative' align='center' gap='2'> 
							<HelpOutlineOutlinedIcon onClick={(()=>{setinfoActive(!infoactive)})}/>
							<Button onClick={(()=>{setisfinddistributorModalvisible(true)})}>Look for Distributors </Button>
						</Flex>
						<Button flex='1' bg='#009393' color='#fff' onClick={(()=>{setisaddnewdistributorModalvisible(true)})}>Add new Distributor</Button>
					</Flex>
				</Flex>
			}
		</Flex>
	)
}

export default Distributors;

const Distributor=({item})=>{
	return(
		<Flex p='2' bg='#eee' borderRadius='5px' direction='column'>
		  <Text fontSize='24px' fontWeight='bold'>INCI Company</Text>
		  <Text>inci.sales@inci.com</Text>
		  <Text>0759233322</Text>
				<Flex gap='2'>
				<Text>Edit</Text>
				<Text color='red' cursor='pointer'>Remove</Text>
		    </Flex>
		</Flex>
	)
}