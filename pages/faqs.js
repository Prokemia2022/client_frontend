import React,{useState} from 'react';
import {Flex,Text} from '@chakra-ui/react';
import {Add,HorizontalRule} from '@mui/icons-material';

export default function FAQs(){
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	return(
		<Flex direction='column' p='4'>
			<Text fontSize='52px' fontFamily='ClearSans-bold'>Faqs</Text>
			<Text color='grey'>Frequently asked Questions.</Text>
			<Text color='grey'>Here are some common asked questions about Prokemia</Text>

			<Flex direction='column' mt='4' gap='3'>
				{faqs.map((item)=>{
					return(
						<Flex key={item.id} borderTop='3px solid grey' borderBottom='3px solid grey' p='2' direction='column'>
							<Flex cursor='pointer' onClick={(()=>{setActive(!active); setcurrentValue(`${item.title}`)})} align='center' justify='space-between' w='100%'>
								<Text>{item.title}</Text>
								{active && item.title === currentValue ? <HorizontalRule /> : <Add />}
							</Flex>
							{active && item.title === currentValue ? 
								<Flex direction='column' gap='1'>
									{item.content.map((text)=>{
										return(
											<Flex key={text.id} bg='#eee' p='2'>
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
	)
}

const faqs=[
	{
		id:1,
		title:'What is Prokemia? and how do we work?',
		content:['',''],
	},
	{
		id:2,
		title:'Getting Started',
		content:['',''],
	},
	{
		id:3,
		title:'How to Open an account on Prokemia',
		content:['',''],
	},
	{
		id:4,
		title:'How to Find Suppliers?',
		content:['',''],
	},
	{
		id:5,
		title:'What features does Prokemia offer?',
		content:['',''],
	},
	{
		id:6,
		title:'How to buy products on Prokemia?',
		content:['',''],
	},
	{
		id:7,
		title:'What should I do if my desired industry is not represented?',
		content:['',''],
	},
	{
		id:8,
		title:'Process for Tracking Orders.',
		content:['',''],
	},
	{
		id:9,
		title:'Can I cancel my orders?',
		content:['',''],
	},
]