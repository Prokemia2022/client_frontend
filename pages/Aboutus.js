import {Flex,Text,Image,Heading, Box, Center, Icon} from '@chakra-ui/react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function About(){
	return(
		<Box p='10' w='full'>
			<Flex align={'center'}>
				<Center  w='50%' fontWeight={'bold'} display={{base:'none',md:'block'}}>
					<Text>About Us, <br/> Our Team<br/></Text>
				</Center>
				<Box w='full' flex={1}>
					<Heading as='h1'>ABOUT US</Heading>
					<Text my='4'>
						Welcome to our dynamic online marketplace, where we seamlessly bridge the gap <br/>between sellers and consumers across East, Central, and Southern Africa. At the heart<br/> of our platform is a commitment to empowering businesses by providing a robust<br/> space for sellers to showcase and market their products. Our user-friendly interface<br/> ensures a hassle-free experience for sellers to list their offerings, reaching a diverse <br/>and expansive customer base.<br/><br/>
						For consumers, we offer an unparalleled opportunity to explore a vast array<br/> of products while effortlessly connecting with trusted suppliers in the region. Whether<br/> you are searching for unique handmade crafts, cutting-edge technology, or everyday <br/>essentials, our marketplace is a one-stop destination for all your needs. Our <br/>commitment to fostering meaningful connections between buyers and sellers sets us <br/>apart, creating a thriving community where commerce meets convenience.<br/><br/>
						Discover the ease of navigating through a marketplace that transcends geographical <br/>boundaries, creating a vibrant ecosystem for economic growth. Join us in reshaping<br/> the way business is done in East, Central, and Southern Africa – where opportunities <br/>abound, and connections flourish.
					</Text>
				</Box>
			</Flex>
			<Flex w='full' align='center' justify={'space-around'} my='8' gap='2' flexDirection={{base:'column',md:'row'}}>
				<Center w={{base:'100%',md:'50%'}} position={'relative'} my={{base:'6',md:'0'}}>
					<Icon as={FaQuoteLeft} boxSize='4' position='absolute' top='-5' left='20'/>
					<Icon as={FaQuoteRight} boxSize='4' position='absolute' bottom='-5' right='20'/>
					<Box>
						<Text fontStyle={'italic'} fontWeight={'bold'}>Our Work does make sense only if it<br/> is a faithfull witness of his time.</Text>
						<Text fontWeight={'semibold'} fontSize={'xs'} color='gray.300'>Margeret Ruth, Sales Team Supervisor</Text>
					</Box>
				</Center>
				<Image src='../quoteworker.jpg' boxSize={{base:'100%',md:300}} borderRadius={'0'} boxShadow={'sm'} objectFit={'cover'} alt='banner'/>
			</Flex>
			<Flex align={'center'} mt='8' bg='#eee' p='8'>
				<Box w='full' flex={1}>
					<Text fontSize='20px' fontFamily='clearSans-Bold'>We are on a mission to bring the industry that enables<br/> every physical product into the digital Era.</Text>
					<Text fontSize='16px'>The Chemical Industry touches every aspect of your daily life.Yet, it is one<br/> of the few remaining Industries that is offline.</Text>
				</Box>
				<Center  w='50%' fontWeight={'bold'} display={{base:'none',md:'block'}}>
					<Text fontSize={'lg'}>Our Mission</Text>
				</Center>
			</Flex>
			<Flex align={'center'} mt='8' bg='#eee' p='8'>
				<Center  w='50%' fontWeight={'bold'} display={{base:'none',md:'block'}}>
					<Text fontSize={'lg'}>Our Vision</Text>
				</Center>
				<Box w='full' flex={1}>
					<Text fontSize='20px' fontFamily='clearSans-Bold'>To bring quality and diverse services .</Text>
					<Text fontSize='16px'>At Prokemia, we envision a connected marketplace that empowers and simplifies commerce in <br/>East, Central and Southern Africa, by providing a seamless platform<br/> for sellers and buyers to discover and transact with ease.</Text>
				</Box>
			</Flex>
		</Box>
	)
}

export default About;