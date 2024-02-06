import { Flex, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Card=(props)=>{
    const {item, link_tag} = {...props}
    const router = useRouter();
    const base_photo_url = item?.profile_photo_url || "../Pro.png"
	return(
		<Flex  boxShadow='lg' cursor='pointer'  w='100%'  h='250px'  m='1' bg='#fff' flexDirection={'column'} borderRadius={'5'} onClick={(()=>{router.push(`/supplier?id=${item?._id}&supplier=${link_tag}`)})} >
			<Image  objectFit='contain'  src={base_photo_url}  alt='photo' w='100%' h='200px' />
			<Text  p='4' bottom='0px'  left='0px'  w='100%'  fontSize='16px'  color='#000' align={'center'} > {item?.company_name} </Text>
		</Flex>
	)
}

export default Card;