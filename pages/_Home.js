import React from 'react'
import { Flex,Text,Image,Center,Select,Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useRouter} from 'next/router';

function _Home(){
	return(
		<Flex direction='column' position='relative' gap='2'>
			{/*
			<Image src='/wave.svg' alt='next'/>
		*/}
			<Flex h='' mt='5' direction='column' gap='2' w='100%' p='5'>
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='36px' >The Marketplace for ingredients,Polymers and Chemistry.</Text>
					<Text cursor='pointer' w='80%'>Search, Learn, Engage ,sample , quote and purchase from thousands of distributors - all in one platform.Access all easily.</Text>
				</Flex>
			<Filter />
			<Center w='100vw'>
				<Flex direction='column' w='100%' p='2'>
					<Text fontSize='18px'>Do not know what you are looking for?</Text>
					<Text fontSize='16px' color='#009393'>Click to ask our Experts</Text>
				</Flex>
			</Center>
			{categories?.map((item)=>{
				return(
					<>
						<Categories item={item}/>
					</>
				)
			})}
			<Promo />
		</Flex>
	)
}

export default _Home;

const Filter=()=>{
	return(
		<Flex className={styles.filterbody} direction='column' gap='1'>
			<Flex direction='column' gap='2'>
				<Text ontFamily='ClearSans-Bold'>Industry</Text>
				<Select variant='filled' placeholder='Select Industry'>
		          <option value='personalcare'>Personal Care</option>
		          <option value='hi&i'>H I & I</option>
		          <option value='building&construction'>Building and Construction</option>
		          <option value='food&nutrition'>Food and Nutrition</option>
		        </Select>
			</Flex>
			<Flex direction='column' gap='3'>
				<Text fontFamily='ClearSans-Bold'>Technology</Text>
				<Select variant='filled' placeholder='Select Technology'>
		          <option value='pharmaceuticals'>Pharmaceuticals</option>
		          <option value='cosmetics'>Cosmetics</option>
		        </Select>
			</Flex>
			<Button bg='#009393' color='#fff' fontFamily='ClearSans-Bold'>Search Product</Button>
		</Flex>
	)
}

const categories=[
	{
		title:'Industries',
		contents:[
			{
				name:"Adhesives",
				img:"./images.jpeg",
			},
			{
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				name:"Food and Nutrition",
				img:"./download (1).jpeg",
			},
			{
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				name:"Personal Care",
				img:"./download (2).jpeg",
			},
			{
				name:"Electrical & Electronics",
				img:"./download (3).jpeg",
			},
			{
				name:"Paintings & Coatings",
				img:"./images (2).jpeg",
			},
			{
				name:"Printing & Labelling",
				img:"./download (4).jpeg",
			}]
	},
	{
		title:'Technologies',
		contents:[
			{
				name:"AgroChemicals",
				img:"../download.jpeg",
			},
			{
				name:"Cosmetics ingredients",
				img:"../images (3).jpeg",
			},
			{
				name:"Lab ingredients",
				img:"./download (6).jpeg",
			},
			{
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				name:"Paints",
				img:"./images (2).jpeg",
			}]
	},
]
const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='2' gap='2'>
			<Text borderBottom='2px solid #000' fontFamily='ClearSans-Bold' fontSize='24px'>{item.title}</Text>
			<Flex wrap='Wrap' justify=''>
				{item.contents.map((content)=>{
					return(
						<>
							<Item content={content} item={item}/>
						</>
					)
				})}
			</Flex>
			<Button bg='#009393' color='#fff' onClick={(()=>{router.push(`/${item.title}/all`)})}>Explore More {item.title}</Button>
		</Flex>
	)
}

const Item=({content,item})=>{
	const router = useRouter();
	return(
		<Flex w='175px' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/${item.title}/${content.name}`)})}>
			<Image borderRadius='10px' objectFit='cover' src={content.img} alt='next'/>
			<Text position='absolute' top='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{content.name}</Text>
		</Flex>
	)
}

const Promo=()=>{
	
	return(
		<Flex bg='#000' h='' p='2' >
			<Image className={styles.promoimg} h='99%' w='40%' borderRadius='2px' objectFit='cover' src='../images.jpeg' alt='next'/>
			<Flex className={styles.promotext} p='2' direction='column' color='#fff' gap='3'>
				<Text fontSize='48px'>Want to Sell Products?</Text>
				<Text fontSize=''>Register as a Manufacturer or Distributor to start marketing your products in East Africa on Prokemia</Text>
				<Text fontSize=''>Boost your sales and access a wide market for your company or business.</Text>
				<Button bg='#000' border='1px solid #fff'>Request a demo <PlayArrowIcon /></Button>
				<Button bg='#009393' color='#fff' borderRadius='0'>Create an Account</Button>
			</Flex>
		</Flex>
	)
}