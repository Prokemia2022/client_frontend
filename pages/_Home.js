import React from 'react'
import { Flex,Text,Image,Center,Select,Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useRouter} from 'next/router';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function _Home(){
	const router = useRouter();
	return(
		<Flex direction='column' position='relative' gap='2'>
			<Image h='400px' w='100vw' objectFit='cover' src='../2.png' alt='next' />
			<Flex h='' mt='-350px' direction='column' gap='3' w='100%' p='3' >
					<Text mb='0' fontFamily='ClearSans-Bold' fontSize='36px' >The Marketplace for ingredients,Polymers and Chemistry.</Text>
					<Text mb='0' cursor='pointer' w='80%'>Search, Learn, Engage ,sample , quote and purchase from thousands of distributors - all in one platform.Access all easily.</Text>
					<Filter />
			</Flex>			
				<Center w='100vw'>
					<Flex direction='column' w='100%' p='2'>
						<Text mb='0' fontSize='18px'>Do not know what you are looking for?</Text>
						<Text mb='0' fontSize='16px' onClick={(()=>{router.push('/experts')})} color='#009393' cursor='pointer'>Click to ask our Experts</Text>
					</Flex>
				</Center>
			{categories?.map((item)=>{
				return(
					<Flex key={item.id}>
						<Categories item={item}/>
					</Flex>
				)
			})}
			<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'>Top Distributors </Text>
			{distributors.map((distributor)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1' key={distributor.id}>
						<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.name}</Text>
						<Text mb='0' >Industry: </Text>
						<Flex>
						{distributor.industries.map((ind)=>{
							return(
								<Flex key={ind.id}>
									<Text mb='0' fontSize='14px'>{ind},</Text>
								</Flex>
							)
						})}
						</Flex>
						<Text mb='0' fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
					</Flex>
				)
			})}
			<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'>Top Manufacturers </Text>
			{manufacturers.map((manufacturer)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1' key={manufacturer.id}>
						<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.name}</Text>
						<Text mb='0' >Industry: </Text>
						<Flex>
						{manufacturer.industries.map((ind)=>{
							return(
								<Flex key={ind.id}>
									<Text mb='0' fontSize='14px'>{ind},</Text>
								</Flex>
							)
						})}
						</Flex>
						<Text mb='0' fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
					</Flex>
				)
			})}
			<Center>
				<Flex justify='space-around'>
					{numbers.map((item)=>{
						return(
							<Flex key={item.id} textAlign='center' align='center' direction='column' m='5'>
								<Text mb='0' color='#009393' fontSize='32px' fontFamily='ClearSans-Bold'>{item.numbers}</Text>
								{item.icon}
								<Text mb='0' fontSize='20px'>{item.title}</Text>
								<Text mb='0' fontSize=''>made</Text>
							</Flex>
						)
					})}
				</Flex>
			</Center>
			<Promo router={router}/>
		</Flex>
	)
}

export default _Home;

const Filter=()=>{
	return(
		<Flex className={styles.filterbody} direction='column' gap='2'>
			<Flex direction='column' gap='2'>
				<Text mb='0' fontFamily='ClearSans-Bold'>Industry</Text>
				<Select variant='filled' placeholder='Select Industry'>
		          <option value='personalcare'>Personal Care</option>
		          <option value='hi&i'>H I & I</option>
		          <option value='building&construction'>Building and Construction</option>
		          <option value='food&nutrition'>Food and Nutrition</option>
		        </Select>
			</Flex>
			<Flex direction='column' gap='3'>
				<Text mb='0' fontFamily='ClearSans-Bold'>Technology</Text>
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
				id:'1',
				name:"Adhesives",
				img:"./images.jpeg",
			},
			{
				id:'2',
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				id:'3',
				name:"Food and Nutrition",
				img:"./download (1).jpeg",
			},
			{
				id:'4',
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:'5',
				name:"Personal Care",
				img:"./download (2).jpeg",
			},
			{
				id:'6',
				name:"Electrical & Electronics",
				img:"./download (3).jpeg",
			},
			{
				id:'7',
				name:"Paintings & Coatings",
				img:"./images (2).jpeg",
			},
			{
				id:'8',
				name:"Printing & Labelling",
				img:"./download (4).jpeg",
			}]
	},
	{
		title:'Technologies',
		contents:[
			{
				id:'1',
				name:"AgroChemicals",
				img:"../download.jpeg",
			},
			{
				id:'2',
				name:"Cosmetics ingredients",
				img:"../images (3).jpeg",
			},
			{
				id:'3',
				name:"Lab ingredients",
				img:"./download (6).jpeg",
			},
			{
				id:'4',
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:'5',
				name:"Paints",
				img:"./images (2).jpeg",
			}]
	},
]

const distributors=[
	{
		id:'1',
		name:'IMCD',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:'2',
		name:'Carst and Walker',
		industries:['Personal Care','H I &I']
	},
	{
		id:'3',
		name:'Azelis',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:'4',
		name:'Brentag',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
]

const manufacturers=[
	{
		id:'1',
		name:'Crda Inc.',
		industries:['Personal Care','H I &I']
	},
	{
		id:'2',
		name:'BASF',
		industries:['Personal Care','H I &I']
	},
	{
		id:'3',
		name:'Du Pont',
		industries:['Personal Care','Building and Construction',]
	},
]

const numbers=[
	{
		id:'1',
		title:'Quotation requests',
		numbers:'1k',
		icon:<CloudDownloadIcon/>,
	},
	{
		id:'2',
		title:'Search results',
		numbers:'200k',
		icon:<QueryStatsIcon/>,
	},
	{
		id:'3',
		title:'Sample requests',
		numbers:'2k',
		icon:<CloudDownloadIcon/>,
	},
]
const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='2' gap='2'>
			<Text mb='0' borderBottom='2px solid #000' fontFamily='ClearSans-Bold' fontSize='24px'>{item.title}</Text>
			<Flex wrap='Wrap' justify=''>
				{item.contents.map((content)=>{
					return(
						<Flex key={content.id}>
							<Item content={content} item={item}/>
						</Flex>
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
			<Text mb='0' position='absolute' top='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{content.name}</Text>
		</Flex>
	)
}

const Promo=({router})=>{
	
	return(
		<Flex bg='#000' h='' p='2' >
			<Image className={styles.promoimg} h='99%' w='40%' borderRadius='2px' objectFit='cover' src='../2.png' alt='next'/>
			<Flex className={styles.promotext} p='2' direction='column' color='#fff' gap='3'>
				<Text mb='0'  fontSize='48px'>Want to Sell Products?</Text>
				<Text mb='0'  fontSize=''>Register as a Manufacturer or Distributor to start marketing your products in Africa on Prokemia</Text>
				<Text  mb='0' fontSize=''>Boost your sales and access a wide market for your company or business.</Text>
				<Button bg='#000' border='1px solid #fff'>Request a demo <PlayArrowIcon /></Button>
				<Button bg='#009393' color='#fff' borderRadius='0' onClick={(()=>{router.push('/account')})}>Create an Account</Button>
			</Flex>
		</Flex>
	)
}
