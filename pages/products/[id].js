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
					<div key={item.id}>
						<Categories item={item} />
					</div>
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
						<div key={content.id}>
							<Item content={content}/>
						</div>
					)
				})}
				<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Distributors </Text>
				{distributors.map((distributor)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1' key={distributor.id}>
						<Text fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.name}</Text>
						<Text>Industry: </Text>
						<Flex>
						{distributor.industries.map((ind)=>{
							return(
								<div key={ind.id}>
									<Text fontSize='14px'>{ind},</Text>
								</div>
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
					<Flex direction='column' bg='#eee' p='1' m='1' key={manufacturer.id}>
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
		<Flex position='relative' gap='2' align='center' onClick={(()=>{router.push(`/product/${content.name}`)})}>
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
		id:1,
		contents:[
				{
					id:1,
					name:"Cereals",
					img:"../images.jpeg",
					distributor:'Itaconix'
				},
				{
					id:2,
					name:"Corn",
					img:"../download.jpeg",
					distributor:'Du point'
				},
				{
					id:3,
					name:"Beans",
					img:"../download (1).jpeg",
					distributor:'Du point'
				},
			]
	}]

const technologiesop=[
			{
				id:1,
				name:"Agriculture Crops",
				img:"../images (1).jpeg",
			},
			{
				id:2,
				name:"Agriculture films",
				img:"../images (1).jpeg",
			},
			{
				id:3,
				name:"Animal Health & Nutrition",
				img:"../images (1).jpeg",
			},
			{
				id:4,
				name:"Pest Control",
				img:"../images (1).jpeg",
			},
]

const distributors=[
	{
		id:1,
		name:'IMCD',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:2,
		name:'Carst and Walker',
		industries:['Personal Care','H I &I']
	},
	{
		id:3,
		name:'Azelis',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:4,
		name:'Brentag',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
]

const manufacturers=[
	{
		id:1,
		name:'Crda Inc.',
		industries:['Personal Care','H I &I']
	},
	{
		id:2,
		name:'BASF',
		industries:['Personal Care','H I &I']
	},
	{
		id:3,
		name:'Du Pont',
		industries:['Personal Care','Building and Construction',]
	},
]