import { Flex, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Card=(props)=>{
    const {item,active} = {...props};
    const router = useRouter();
	return(
		<Flex 
            _hover={{m:'2',boxShadow:'lg',opacity:'100%'}} 
            opacity='75%' 
            cursor='pointer' 
            w='100%' 
            h='225px' 
            m='1' 
            position='relative' 
            transition={'.3s ease-in-out'}
            onClick={(()=>{router.push(`/products/${item?.title}?type=${active}`)})}
        >
			<Image 
                objectFit={item?.cover_image == ''? "contain":'cover'} 
                src={item?.cover_image == ''? "../Pro.png":item?.cover_image} 
                alt='photo' 
                boxShadow='lg' 
                w='100%'
            />
			<Text 
                bg='rgb(0,0,0,0.6)' 
                p='1' 
                position='absolute' 
                bottom='0px' 
                left='0px' 
                w='100%' 
                fontSize='14px' 
                color='#fff'
            >
                {item?.title}
            </Text>
		</Flex>
	)
}

export default Card;