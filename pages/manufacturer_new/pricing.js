import React from 'react';
import {Flex,Text,Center, Box} from '@chakra-ui/react';
import styles from '../../styles/Home.module.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Pricing(){
	return(
		<Box className={styles.premiumbody} direction='column' borderRadius={'md'}>
			<Text fontSize='36px' color='#fff' fontFamily='ClearSans-bold'>Upgrade to  Premium</Text>
			<Box>
				<Flex gap='1' direction='column' color='#fff' m='4'>
					{features.map((item)=>{
						return(
							<Flex align='center' w='80%' key={item.id}>
								<BookmarkIcon />
								<Flex direction='column' p='1'>
									<Text fontSize='18px' fontFamily='ClearSans-bold'>{item.title}</Text>
									<Text color='#000'>{item.content}</Text>
								</Flex>
							</Flex>
						)
					})}
					{packages.map((item)=>{
						return(
							<Flex key={item.id} className={styles.premiumsubscriptioncard} cursor='pointer' align='center' fontSize='20px' p='5' gap='2' bg='#fff' borderRadius='10' direction='column'>
								<Flex justify='space-between' w='100%'>
									<Text color='#000' fontFamily='ClearSans-bold'>{item.period}</Text>
									<Text color='#009393' fontFamily='ClearSans-bold' fontSize='20px'>KSH.{item.price}</Text>
								</Flex>
								<Flex justify='space-between' w='100%'>
									<Text color='grey'>Billed:{item.billed}</Text>
									<Text color='grey'>{item.offer}%off</Text>
								</Flex>

							</Flex>
						)
					})}
				</Flex>
			</Box>
		</Box>
	)
}

const features=[
	{
		id:1,
		title: "Sponsored Products",
		content: 'Boost the ranking of your products, to help increase your sales.',
	},
	{
		id:2,
		title: "Rank up in search results",
		content: 'Be the first to appear in search results.',
	},
	{
		id:3,
		title: "Get directed offers from clients.",
		content: "Personalized Offers and requests made by Clients, are first channeled to you,before being made public.",
	},
]

const packages=[
	{
		id:1,
		period:'1 month',
		price:'1,999',
		billed:'Monthly',
		offer:'-'
	},
	{
		id:2,
		period:'6 months',
		price:'9,999',
		billed:'semi-annully',
		offer:'17'
	},
	{
		id:3,
		period:'12 months',
		price:'19,999',
		billed:'Annually',
		offer:'25'
	},
]