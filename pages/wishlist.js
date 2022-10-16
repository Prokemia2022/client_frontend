import React from 'react';
import {Flex,Image,Text,Divider} from '@chakra-ui/react'
import FavoriteIcon from '@mui/icons-material/Favorite';

function wishlist(){
	return(
		<Flex direction='column' p='2' gap='2'>
			<Text  borderBottom='1px solid #000' fontSize='32px' fontWeight='bold' fontFamily='ClearSans-Bold'>wishlist <FavoriteIcon /></Text>
			<Flex direction='column' gap='1'>
				<Text fontWeight='bold' fontSize='24px'>Products</Text>
				<Flex borderRadius='5px' direction='column' bg='#e5e5e5' p='2'>
					<Text fontWeight='bold'>Cereal</Text>
					<Flex>
						<Text>Industry: </Text>
						<Text>Agricultural Crops</Text>
					</Flex>
					<Flex justify='' gap='4' align='center'>
						<Text color='#009393'>View </Text>
						<Text color='red'>Remove</Text>
					</Flex>
				</Flex>
				<Flex borderRadius='5px' direction='column' bg='#e5e5e5' p='2'>
					<Text fontWeight='bold'>Cereal</Text>
					<Flex>
						<Text>Industry: </Text>
						<Text>Agricultural Crops</Text>
					</Flex>
					<Flex justify='' gap='4' align='center'>
						<Text color='#009393'>View </Text>
						<Text color='red'>Remove</Text>
					</Flex>
				</Flex>
				<Flex borderRadius='5px' direction='column' bg='#e5e5e5' p='2'>
					<Text fontWeight='bold'>Cereal</Text>
					<Flex>
						<Text>Industry: </Text>
						<Text>Agricultural Crops</Text>
					</Flex>
					<Flex justify='' gap='4' align='center'>
						<Text color='#009393'>View </Text>
						<Text color='red'>Remove</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' >
				<Text fontWeight='bold' fontSize='24px'>Distributors</Text>
				<Flex borderRadius='5px' direction='column' bg='#e5e5e5' p='2'>
					<Text fontWeight='bold'>Name</Text>
					<Flex>
						<Text>Industry: </Text>
						<Text>Agricultural Crops</Text>
					</Flex>
					<Flex justify='' gap='4' align='center'>
						<Text color='#009393'>View </Text>
						<Text color='red'>Remove</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction='column' >
				<Text fontWeight='bold' fontSize='24px'>Manufacturers</Text>
				<Flex borderRadius='5px' direction='column' bg='#e5e5e5' p='2'>
					<Text fontWeight='bold'>NAme</Text>
					<Flex>
						<Text>Industry: </Text>
						<Text>Agricultural Crops</Text>
					</Flex>
					<Flex justify='' gap='4' align='center'>
						<Text color='#009393'>View </Text>
						<Text color='red'>Remove</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default wishlist;