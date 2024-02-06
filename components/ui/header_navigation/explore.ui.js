import { Text, Image, SlideFade, useDisclosure, Box, Icon, Flex, Divider, HStack,  Grid } from '@chakra-ui/react'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown,IoIosClose } from "react-icons/io";
import { UseIndustriesSrt } from '../../../hooks/industries/useIndustriesSrt';
import { UseTechnologiesSrt } from '../../../hooks/technology/useTechnologiesSrt';

export const Explore_Industries=()=>{
    const router = useRouter();
    const { isOpen, onToggle } = useDisclosure();
    return(
        <Box>
            <Text onMouseEnter={() => onToggle()} onClick={(()=>{router.push(`/Industries/all`)})} bg={isOpen? '#343838' : ''} color={isOpen? '#fff' : ''} p={isOpen? '2' : ''} borderRadius={isOpen? 'sm' : ''} transition='ease-out .5s' boxShadow={isOpen? 'sm' : ''} _hover={{bg:'#343838', color: '#fff', p:'2', borderRadius:'sm', boxShadow:'sm'}} cursor={'pointer'}>
                Explore industries
                <Icon as={IoMdArrowDropdown} boxSize={3}/>
            </Text>
            <SlideFade direction='bottom' in={isOpen} style={{ position:'absolute',top:'60px',left:'10px',width:'calc(100% - 20px)' }}>
                <Box p='20px' color='#000' mt='4' bg='rgba(52, 56, 56,.99)' rounded='md' boxShadow={'lg'} position={'relative'} display={isOpen? 'block':'none'} zIndex={isOpen? 10:-100}>
                    <Icon  onClick={() => onToggle()} as={IoIosClose} boxSize={6} position={'absolute'} color='#fff' top='10px' right='10px' cursor={'pointer'} transition={'.3s ease-in-out'} bg='rgba(0,0,0,0.6)' borderRadius='full'/>
                    <Industries onToggle={onToggle}/>
                </Box>
            </SlideFade>
        </Box>
    )
}

const Industries=({onToggle})=>{
    const [active, set_active]=useState('Industries');
    const [data, set_data]=useState([]);

    async function get_Industries_Data(){
		let data = await UseIndustriesSrt();
		set_data(data);
	}
	async function get_Technologies_Data(){
		let data = await UseTechnologiesSrt();
		set_data(data);
	}

    useEffect(()=>{
        if(active === 'Industries'){
            get_Industries_Data();
        }else{
            get_Technologies_Data()
        }
    },[active])
    return(
        <Flex gap='4'>
            <Box borderRight={'1px solid #fff'} pr='2'>
                {navs?.map((item, idx)=>{
                    return(
                        <Nav_Item title={item} key={idx} set_active={set_active} active={active} onToggle={onToggle}/>
                    )
                })}
            </Box>
            <Divider orientation='vertical'/>
            <Grid templateColumns='repeat(5, 1fr)' gap={''}>
                {data?.map((item)=>{
                    return(
                        <Item_card onToggle={onToggle} image={item?.cover_image} title={item?.title} base_route={'/products'} route={item?.title} key={item?._id} active={active}/>
                    )
                })}
            </Grid>
        </Flex>
    )
}
const Nav_Item=(props)=>{
    const {title,active,set_active} = {...props};
    return(
        <HStack bg={active == title? '#fff': ''} color={active == title? '#000': '#fff'} _hover={{bg:'#fff',color:'#000'}} p='4' transition={'.3s ease-in-out'} borderRadius='5' my='2' cursor={'pointer'} onClick={(()=>{set_active(title)})}>
            <Text>{title}</Text>
        </HStack>
    )
}
const navs=[
    'Industries','Technologies'
]

export const Item_card=(props)=>{
	const router = useRouter();
	const { image, title, base_route, route, active,onToggle} = {...props};
	const handleClick=()=>{
		router.replace(`${base_route}/${route}?type=${active}`);
        onToggle()
	}
	return(
		<Flex cursor={'pointer'} my='2' mx='1' gap='2' align='center' onClick={handleClick} bg='#eee' p='2' _hover={{m:'2',scale:'1'}} >
			<Image w='30px' h='30px' boxShadow={'md'} borderRadius='sm' objectFit='cover' src={image == '' || !image? '../../Pro.png' : image} alt='next'/>
			<Text mb='0' fontSize='12px' >{title}</Text>
		</Flex>
	)
}