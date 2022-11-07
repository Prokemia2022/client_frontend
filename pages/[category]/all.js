import React from 'react';
import {Flex,Text,Center,Button,Image} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function All(){
	const router = useRouter()
	const categ = router.query;
	console.log(categ)
	return(
		<Flex direction='column' gap='2' p='2'>
			<Text fontSize='28px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000' >{categ.category}</Text>
			{categories?.filter((op)=> op.title == categ.category).map((item)=>{
				return(
					<>
						<Categories item={item}/>
					</>
				)
			})}
			<Center>
				<Flex direction='column'>
					<Text textAlign='center' fontSize='20px' fontFamily='ClearSans-Bold'>Want to find a specific product?</Text>
					<Text textAlign='center'>Click to </Text>
					<Flex cursor='pointer' align='center' color='#009393' justify='center'>
						<Text >Try our deep search feature</Text>
						<ArrowForwardIcon/>
					</Flex>
				</Flex>
			</Center>
			<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Featured Distributors </Text>
			{distributors.map((distributor)=>{
				return(
					<Flex direction='column' bg='#eee' p='1' m='1' key={distributor.id}>
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
	)
}

export default All;

const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='' gap='2' cursor='pointer'>
			<Flex wrap='Wrap' justify='space-between'>
				{item.contents.map((content)=>{
					return(
						<>
							<Item content={content}/>
						</>
					)
				})}
			</Flex>
		</Flex>
	)
}

const Item=({content})=>{
	const router = useRouter();
	return(
		<Flex w='175px' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/industry/${content.name}`)})}>
			<Image borderRadius='10px' objectFit='cover' src={content.img} alt='next'/>
			<Text position='absolute' top='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{content.name}</Text>
		</Flex>
	)
}

const categories=[
	{
		id:1,
		title:'Industries',
		contents:[
			{
				id:1,
				name:"Adhesives",
				img:"../images.jpeg",
			},
			{
				id:2,
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				id:3,
				name:"Food and Nutrition",
				img:"../download (1).jpeg",
			},
			{
				id:4,
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:5,
				name:"Personal Care",
				img:"../download (2).jpeg",
			},
			{
				id:6,
				name:"Electrical & Electronics",
				img:"../download (3).jpeg",
			},
			{
				id:7,
				name:"Paintings & Coatings",
				img:"../images (2).jpeg",
			},
			{
				id:8,
				name:"Printing & Labelling",
				img:"../download (4).jpeg",
			}]
	},
	{
		id:2,
		title:'Technologies',
		contents:[
			{
				id:1,
				name:"AgroChemicals",
				img:"../download.jpeg",
			},
			{
				id:2,
				name:"Cosmetics ingredients",
				img:"../images (3).jpeg",
			},
			{
				id:3,
				name:"Lab ingredients",
				img:"../download (6).jpeg",
			},
			{
				id:4,
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:5,
				name:"Paints",
				img:"../images (2).jpeg",
			}]
	},
]

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