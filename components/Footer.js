import {useEffect,useState} from 'react'
import {Flex, Text,Button,Center,Link,SimpleGrid} from '@chakra-ui/react'
import {useRouter} from 'next/router';

function Footer(){
	const router = useRouter();
	const [window,set_window]=useState({});

	
	useEffect(()=>{
		const client = {
			width: document?.documentElement?.clientWidth,
		}
		if (client != {}){
			set_window(client)
		}else{
			set_window({})
		}
	},[])
	return(
		<Flex borderTop='1px solid #eee' direction='column' gap='5' mt='5' cursor='pointer' p='4' pl={window?.width > 500? '100px':'10px'} pr={window?.width > 500? '100px':'10px'}>
			<Flex justify='space-between'  wrap='Wrap' p='2'>
				<Flex direction='column'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' onClick={(()=>{router.push('/')})} fontSize='1.5em' color='#00e0c6' fontWeight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
					<Link href='/contact' w='100px' fontWeight={'bold'} bg='#009393' p='2' color='#fff' borderRadius={'5px'} cursor='pointer' onClick={(()=>{router.push('/contact')})}>Contact Us</Link>
				</Flex>
				<Flex direction='column' gap='1'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontWeight='bold' >Company</Text>
					<Link href='/Aboutus' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/Aboutus')})}>About Us</Link>
					<Link href='/careers' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/careers')})}>Careers</Link>
					<Link href='/contact' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/contact')})}>Contact us</Link>					
				</Flex>
				<Flex direction='column' gap='1'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' fontSize='18px' color='#009393' fontWeight='bold' >For Our Clients</Text>
					<Link href='/signup/client' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/signup/client')})}>Buyer</Link>
					<Link href='/account/1' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/account/1')})}>Seller</Link>				
				</Flex>
				<Flex direction='column' gap='1'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='20px' color='#009393' fontWeight='bold' >Support</Text>
					
					<Link href='/faqs' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/faqs')})}>FAQs</Link>
					<Link href='/feedback' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/feedback')})}>FeedBacks</Link>
				</Flex>
				<Flex direction='column' gap='1'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='20px' color='#009393' fontWeight='bold' >Legals</Text>
					<Link href='/t&c' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/t&c')})}>Terms&Conditions</Link>
					<Link href='/privacy_policy' fontSize={'14px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/privacy_policy')})}>Privacy Policy</Link>
				</Flex>
			</Flex>
			<Center>
				<Text fontSize={'12px'} color={'grey'}>Copyright @ ProKemia 2022</Text>
			</Center>
		</Flex>
	)
}

export default Footer;