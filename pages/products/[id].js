import React from 'react';
import {Flex,Text,Center,Button,Image} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Explore(){
	const router = useRouter()
	const categ = router.query;
	console.log(categ)
	return(
		<Flex direction='column' gap='2' p='2'>
			<Text fontSize='28px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000' >{categ.id}</Text>
			{categories.map((item)=>{
				return(
					<Categories item={item} />
				)
			})}
		</Flex>
	)
}

export default Explore;

const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='' gap='' cursor='pointer'>
			<Flex wrap='Wrap' justify='space-between' direction='column' gap='2'>
				{item.contents.map((content)=>{
					return(
						<>
							<Item content={content}/>
						</>
					)
				})}
				<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Distributors </Text>
				{distributors.map((distributor)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1'>
						<Text fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.name}</Text>
						<Text>Industry: </Text>
						<Flex>
						{distributor.industries.map((ind)=>{
							return(
								<>
									<Text fontSize='14px'>{ind},</Text>
								</>
							)
						})}
						</Flex>
						<Text fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
					</Flex>
				)
			})}
			<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Manufacturers </Text>
			{manufacturers.map((manufacturer)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1'>
						<Text fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.name}</Text>
						<Text>Industry: </Text>
						<Flex>
						{manufacturer.industries.map((ind)=>{
							return(
								<>
									<Text fontSize='14px'>{ind},</Text>
								</>
							)
						})}
						</Flex>
						<Text fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
					</Flex>
				)
			})}
			</Flex>
		</Flex>
	)
}

const Item=({content,categ})=>{
	const router = useRouter();
	return(
		<Flex position='relative' gap='2' align='center'>
			<Image w='50px' h='50px' borderRadius='10px' objectFit='cover' src={content.img} alt='next'/>
			<Flex direction='column'>
			<Text fontSize='16px' fontFamily='ClearSans-Bold'>{content.name}</Text>
			<Text fontSize='14px'>distributed by :{content.distributor}</Text>
			</Flex>
		</Flex>
	)
}

const categories=[
	{
		contents:[
				{
					name:"Cereals",
					img:"../images.jpeg",
					distributor:'Itaconix'
				},
				{
					name:"Corn",
					img:"../download.jpeg",
					distributor:'Du point'
				},
				{
					name:"Beans",
					img:"../download (1).jpeg",
					distributor:'Du point'
				},
			]
	}]

const technologiesop=[
			{
				name:"Agriculture Crops",
				img:"../images (1).jpeg",
			},
			{
				name:"Agriculture films",
				img:"../images (1).jpeg",
			},
			{
				name:"Animal Health & Nutrition",
				img:"../images (1).jpeg",
			},
			{
				name:"Pest Control",
				img:"../images (1).jpeg",
			},
]

const distributors=[
	{
		name:'IMCD',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		name:'Carst and Walker',
		industries:['Personal Care','H I &I']
	},
	{
		name:'Azelis',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		name:'Brentag',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
]

const manufacturers=[
	{
		name:'Crda Inc.',
		industries:['Personal Care','H I &I']
	},
	{
		name:'BASF',
		industries:['Personal Care','H I &I']
	},
	{
		name:'Du Pont',
		industries:['Personal Care','Building and Construction',]
	},
]