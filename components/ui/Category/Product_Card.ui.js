import { Text, Box, Flex, Image, Heading, Collapse, Divider, Icon } from '@chakra-ui/react'
import { useState } from 'react';
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useRouter } from 'next/router';

export default function Product_Card(props){
    const {item} = {...props};
    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show);
    const router = useRouter()
    return(
        <Box w={{base:'full',md:'400px',lg:'400px'}} borderRadius={10} bg='#fff' boxShadow={'md'} p='4' cursor={'pointer'}>
            <Flex gap='2'>
                <Image src='../../Pro.png' alt='image' boxSize={50} boxShadow={'md'} borderRadius={5}/>
                <Flex flexDirection={'column'}>
                    <Text>{item?.name_of_product}</Text>
                    <Text fontSize={'12px'}>{item?.distributed_by}</Text>
                </Flex>
            </Flex>
            <Flex gap='2' fontSize='10px' color='grey' my='2'>
                <Text>{item.industry? item.industry : "-"}</Text>
                <Text borderLeft='1px solid grey' paddingLeft='2'>{item.technology? item.technology : "-"}</Text>
            </Flex>
            <Flex flexDirection={'column'} gap='2' color='gray' fontSize={'14px'}>
                <Collapse startingHeight={200} in={show} gap='2'>
                    <Text my='1'><span style={{fontWeight:'bold'}}>Brand</span>:{item?.brand}</Text>
                    <Text my='1'><span style={{fontWeight:'bold'}}>Chemical name</span>:{item?.chemical_name}</Text>
                    <Text my='1'><span style={{fontWeight:'bold'}}>Application</span>:{item?.application_of_product}</Text>
                    <Text mb='2'><span style={{fontWeight:'bold'}}>Features</span>:{item?.features_of_product}</Text>
                    <Text>{item?.description_of_product}</Text>
                </Collapse>
                <Divider />
                <Flex align={'center'} justify={'space-between'}>
                    <Flex align={'center'} bg='#eee' p='2' w='110px' gap='2' borderRadius={'5'} onClick={handleToggle}>
                        <Text align='center' fontSize='sm' borderRadius={'5'} cursor={'pointer'}>Show {show ? 'Less' : 'More'}</Text>
                        {show ? <Icon as={IoIosArrowUp} boxSize={3}/> : <Icon as={IoIosArrowDown} boxSize={3}/>}
                    </Flex>
                    <Flex align={'center'} cursor={'pointer'} color='teal.400' fontWeight={'bold'} gap='1' onClick={(()=>{router.push(`/products/product?pid=${item._id}`)})}>
                        <Text >view product</Text>
                        <Icon as={HiOutlineExternalLink} boxSize={4}/>
                    </Flex>
                </Flex>
                
            </Flex>
        </Box>
    )
}