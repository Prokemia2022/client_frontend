import React from 'react';
import {Flex,Text,Center,Button,Image} from '@chakra-ui/react'
import Header from '../components/Header.js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from 'next/router';

export default function Favorite(){
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='2' p='2'>
				<Text fontSize='28px' fontFamily='ClearSans-Bold'  >Favorites</Text>
				<Text fontSize='20px' fontFamily='ClearSans-Bold'> Industries</Text>
				<Flex wrap='Wrap' justify='space-between'>
					{categories?.map((item)=>{
					return(
						<Flex key={item.id}>
							<Categories item={item}/>
						</Flex>
					)
				})}
				</Flex>
				<Text fontSize='20px' fontFamily='ClearSans-Bold'> Technologies</Text>
				{categories?.map((item)=>{
					return(
						<Flex key={item.id}>
							<Categories item={item}/>
						</Flex>
					)
				})}
				<Text fontSize='24px' fontFamily='ClearSans-Bold'>Distributors </Text>
				{distributors.map((distributor)=>{
					return(
						<Flex direction='column' bg='#eee' p='1' m='1' key={distributor.id}>
							<Text fontSize='20px' fontFamily='ClearSans-Bold'>{distributor.name}</Text>
							<Text>Industry: </Text>
							<Flex>
							{distributor.industries.map((ind)=>{
								return(
									<Flex key={ind.id}>
										<Text fontSize='14px'>{ind},</Text>
									</Flex>
								)
							})}
							</Flex>
							<Text fontSize='14px' color='#009393' cursor='pointer'> click to view &gt;&gt; </Text>
						</Flex>
					)
				})}
				<Text fontSize='24px' fontFamily='ClearSans-Bold'> Manufacturers </Text>
				{manufacturers.map((manufacturer)=>{
					return(
						<Flex direction='column' bg='#eee' p='1' m='1' key={manufacturer.id}>
							<Text fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.name}</Text>
							<Text>Industry: </Text>
							<Flex>
							{manufacturer.industries.map((ind)=>{
								return(
									<Flex key={ind.id}>
										<Text fontSize='14px'>{ind},</Text>
									</Flex>
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

const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='' gap='2' cursor='pointer'>
			<Flex wrap='Wrap' justify='space-between'>
				{item.contents.slice(3).map((content)=>{
					return(
						<Flex key={content.id}>
							<Item content={content}/>
						</Flex>
					)
				})}
			</Flex>
		</Flex>
	)
}

const Item=({content})=>{
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
			},]
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
			},]
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
]

const manufacturers=[
	{
		id:1,
		name:'Crda Inc.',
		industries:['Personal Care','H I &I']
	},
]