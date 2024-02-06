import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Loading_Card from './Loading_Card';
import Item_Card from './Item_Card'
import { useRouter } from 'next/router'

export const Section = (props) =>{
    const router = useRouter();
    const {isloading, data, title} = {...props};
    return(
        <Flex direction='column' gap='2' w='100%'>
            <Flex justify='space-between' align='center' p='2'>
                <Text mb='0' fontFamily='ClearSans-Bold' fontSize='24px'>{title}</Text>
                <Text mb='0' fontSize='18px' color='#009393' onClick={(()=>{router.push(`/${title}/all`)})} cursor='pointer'>see more</Text>
            </Flex>
            <SimpleGrid minChildWidth='150px' spacing='20px'>
                {isloading ?
                    <>
                        {Array.from({length:4})?.map((i, idx)=>{return(<Loading_Card key={idx}/>)})}
                    </>
                    :
                    <>
                        {data?.slice(0,6).map((item)=>{
                            return(
                                <Item_Card item={item} key={item?._id} active={title}/>
                            )
                        })}
                    </>
                    
                }				
            </SimpleGrid>
        </Flex>
    )
}

