import React,{useState} from 'react';
import {Flex,Text,Select,Input,Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function Search(){
	const [active,setActive]=useState(false)
	return(
		<Flex p='3' borderRadius='5'>
			<Input borderRadius='5px 0 0 5px' placeholder='Search Product by Name, Industry, Technology' variant='filled'/>
			<Button color='#fff' bg='#009393'borderRadius='0 5px 5px 0' onClick={(()=>{setActive(!active)})}>{active? <CloseFullscreenIcon/> : <SearchIcon/>}</Button>
			{active? <Result/> : null}
		</Flex>	
	)
}

const Result=()=>{
	return(
		<Flex className={styles.ResultsBar} direction='column'  bg='#eee' p='2' borderRadius='10'>
			<Flex direction='column' p='1' bg='#fff' borderRadius='5' m='1'>
				<Text fontSize='20px' textDecoration='1px solid #009393 underline'>Products</Text>
				<Text>Cereals</Text>
				<Text>Beans</Text>
			</Flex>
			<Flex direction='column' p='1' bg='#fff' borderRadius='5' m='1'>
				<Text fontSize='20px' textDecoration='1px solid #009393 underline'>Industry</Text>
				<Text>H I & I</Text>
				<Text>Food and Nutrition</Text>
			</Flex>
			<Flex direction='column' p='1' bg='#fff' borderRadius='5' m='1'>
				<Text fontSize='20px' textDecoration='1px solid #009393 underline'>Distributor</Text>
				<Text>Itaconix</Text>
				<Text>Du point</Text>
			</Flex>
		</Flex>
	)
}
