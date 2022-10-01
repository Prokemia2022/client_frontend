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
			<Flex wrap='Wrap' justify='space-between'>
				{technologiesop?.map((content)=>{
					return(
						<>
							<Item content={content} categ={categ}/>
						</>
					)
				})}
			</Flex>
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
			<Text fontSize='24px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000'> Related {categ.category} </Text>
			<Text>browse and explore more {categ.category}</Text>
			{categories?.filter((op)=> op.title === categ.category).map((item)=>{
				return(
					<>
						<Categories item={item}/>
					</>
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

export default Explore;

const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='' gap='2' cursor='pointer'>
			<Flex wrap='Wrap' justify='space-between'>
				{item.contents.slice(3).map((content)=>{
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

const Item=({content,categ})=>{
	const router = useRouter();
	return(
		<Flex w='175px' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/products/${content.name}`)})}>
			<Image borderRadius='10px' objectFit='cover' src={content.img} alt='next'/>
			<Text position='absolute' top='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{content.name}</Text>
		</Flex>
	)
}

const categories=[
	{
		title:'Industries',
		contents:[
			{
				name:"Adhesives",
				img:"../images.jpeg",
			},
			{
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				name:"Food and Nutrition",
				img:"../download (1).jpeg",
			},
			{
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				name:"Personal Care",
				img:"../download (2).jpeg",
			},
			{
				name:"Electrical & Electronics",
				img:"../download (3).jpeg",
			},
			{
				name:"Paintings & Coatings",
				img:"../images (2).jpeg",
			},
			{
				name:"Printing & Labelling",
				img:"../download (4).jpeg",
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
				img:"../download (6).jpeg",
			},
			{
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				name:"Paints",
				img:"../images (2).jpeg",
			}]
	},
]

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