import React,{useState} from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react';
import ViewExpert from '../components/modals/viewexpertmodal.js';
import FilterExperts from '../components/modals/filterExpertsModal.js';
import TuneIcon from '@mui/icons-material/Tune';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';

function Experts(){
	const [isviewexpertModalvisible,setisViewExpertModalvisible]=useState(false);
	const [isfilterexpertsModalvisible,setisfilterexpertsModalvisible]=useState(false);
	return(
		<Flex direction='column' gap='3'>
			<Header/>
			<Flex direction='column' p='2' gap='2'>
				<ViewExpert isviewexpertModalvisible={isviewexpertModalvisible} setisViewExpertModalvisible={setisViewExpertModalvisible}/>
				<FilterExperts isfilterexpertsModalvisible={isfilterexpertsModalvisible} setisfilterexpertsModalvisible={setisfilterexpertsModalvisible}/>
				<Text fontSize='28px' textDecoration='3px solid #009393 underline' >Experts</Text>
				<Flex gap='2'>
					<Button onClick={(()=>{setisfilterexpertsModalvisible(true)})}>Filter<TuneIcon/></Button>
					<Select placeholder='sort' w='150px'>
						<option>A - Z</option>
						<option>Z - A</option>
					</Select>
				</Flex>
				<Flex gap='2' p='2'>
					<Input placeholder='search by Industry,Technology, Company' bg='#fff' flex='1'/>
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
				<Flex p='2' direction='column' gap='2' overflowY='scroll' h='80vh'>
					<Expert setisViewExpertModalvisible={setisViewExpertModalvisible}/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Experts;

const Expert=({setisViewExpertModalvisible})=>{
	return(
		<Flex p='2' gap='2' bg='#eee' borderRadius='5px' direction='column'>
			<Image bg='#fff' w='100%' h='50px' borderRadius='5px'/>
			<Text color='#009393' fontWeight='bold' fontSize="24px">Name</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Industry:</Text>
				<Text>Agriculture</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Technology:</Text>
				<Text>crops</Text>
			</Flex>
			<Text fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{setisViewExpertModalvisible(true)})}>View Expert -&gt;  </Text>
			</Flex>
	)
}

