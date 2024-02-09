import React,{useState} from 'react';
import {Flex,Text} from '@chakra-ui/react';
import { MdAdd,MdHorizontalRule } from "react-icons/md";

export default function FAQs(){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	return(
		<Flex direction='column'>
			<Flex direction='column' p='8'>
				<Text fontSize='52px' fontFamily='ClearSans-bold'>FAQs</Text>
				<Text color='grey'>Frequently asked Questions.</Text>
				<Text color='grey'>Here are some common asked questions about Prokemia</Text>
				<Flex direction='column' mt='4' gap='3'>
					{faqs.map((item)=>{
						return(
							<Flex key={item.id} borderTop='0px solid grey' borderBottom='1px solid grey' p='2' direction='column'>
								<Flex cursor='pointer' onClick={(()=>{setActive(!active); setcurrentValue(`${item.title}`)})} align='center' justify='space-between' w='100%'>
									<Text fontWeight='bold'>{item.title}</Text>
									{active && item.title === currentValue ? <MdHorizontalRule /> : <MdAdd style={{color:'#009393'}}/>}
								</Flex>
								{active && item.title === currentValue ? 
									<Flex direction='column' gap='1'>
										{item.content.map((text,index)=>{
											return(
												<Flex key={index} bg='#eee' p='2'>
													<Text mb='0'>{text}</Text>
												</Flex>
											)
										})}
									</Flex>
								:
								null
							}
							</Flex>
						)
					})}
				</Flex>
			</Flex>
		</Flex>
	)
}

const faqs=[
	{
		id:1,
		title:'What is Prokemia?',
		content:['Prokemia is an online marketplace that offers a platform for industrial companies to sell their products and connects buyers to sellers.'],
	},
	{
		id:2,
		title:'How do I find products on prokemia?',
		content:['Our Home page offers a selection of industies and technologies under which various products are listed.',
					'You can use the search feature to query and find products, industies, technologies, distributors and manufacturers that meet your need.'],
	},
	{
		id:3,
		title:'How to Open an account on Prokemia',
		content:[`Creating a seller account or a buyer account on prokemia is free, By signing up, you get to join our community, browse for products and connect with buyers`],
	},
	{
		id:4,
		title:'How to find suppliers?',
		content:['Suppliers are listed as Distributors and Manufacturers, They will list their products on prokemia and you get to access and view their profile.'],
	},
	{
		id:5,
		title:'What features does Prokemia offer?',
		content:['We as prokemia are a growing community.','We connect suppliers to buyers and help you keep track of your products.','We help market your products to targeted clients to help you boost your sales.'],
	},
	{
		id:6,
		title:'How to buy products on Prokemia?',
		content:['Prokemia does not sell products but we help connect you to suppliers that produce and sell Whatyou are looking for.'],
	},
	{
		id:7,
		title:'What should I do if my desired industry is not represented?',
		content:['Suppliers working in specific industries that are not represented in our database, can suggest an industry or a technology that will be considered by prokemia.'],
	},
]