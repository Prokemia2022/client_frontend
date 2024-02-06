import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Loading_Card from './Loading_Card';
import { Product_Card } from './Item_Card'

export const Product_Section = (props) =>{
    const {isloading, data, setquery_search, setsearchbaractive } = {...props};
    return(
        <Flex direction='column' gap='2' w='100%'>
            <Text mb='10' mt='10' fontFamily='ClearSans-Bold' fontSize='24px' align={'center'} w='100%'>Featured Products</Text>
            <SimpleGrid minChildWidth='300px' spacing='40px' my='2'>
                {isloading ?
                    <>
                        {Array.from({length:4})?.map((i, idx)=>{return(<Loading_Card key={idx}/>)})}
                    </>
                    :
                    <>
                        {data?.slice(0,6).map((item)=>{
                            return(
                                <Product_Card item={item} key={item?._id} setquery_search={setquery_search} setsearchbaractive={setsearchbaractive}/>
                            )
                        })}
                    </>
                    
                }				
            </SimpleGrid>
        </Flex>
    )
}