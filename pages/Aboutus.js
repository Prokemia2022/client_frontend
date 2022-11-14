import React from 'react'
import {Flex,Text,Image,Heading} from '@chakra-ui/react'
import Header from '../components/Header.js';
function About(){
	return(
		<Flex p='' direction='column' gap='3'>
			<Header/>
			<Image src='./circle-scatter.png'/>
				<Heading as='h1' fontSize='42px' textDecoration='1px solid underline #009393'>About Us, Prokemia </Heading>
			<Text fontSize='28px'>We are on a mission to bring the industry that enables every physical product into the digital Era.</Text>
			<Flex direction='column' gap='3' mt='2' bg='#eee' p='2' borderRadius='5'>
				<Text fontSize='24px' fontFamily='clearSans-Bold'>The Chemical Industry touches every aspect of your daily life.Yet, it is one of the few remaining Industries that is offline.</Text>
				<Text fontSize='20px'>Raw Materials Suppliers and their customers are the hidden innovators behind the end products we rely on every day.Chemistry is used to make every physical good  on earth,including the products we love.</Text>
			</Flex>
			<Flex direction='column' gap='3' mt='2' bg='#eee' p='2' borderRadius='5'>
				<Text fontSize='24px' fontFamily='clearSans-Bold'>The Industry is the building blocks of the entire world.</Text>
				<Text fontSize='20px'>15,000 plus suppliers provide every single ingredient,polymer and chemistry that make up every physical product in existence.Yet the expensive world of chemistry had gone largely unorganized and remained inaccessible to many.</Text>
				<Text fontSize='20px'>The Industry craved a single destination to efficiently conduct research, compare and purchase raw materials without the hassle of scouring thousands of websites calling and emailing sales reps.</Text>
			</Flex>
		</Flex>
	)
}

export default About;