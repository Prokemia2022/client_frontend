import { Flex, Grid, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Supplier_Section = (props) =>{
    const {isloading, data, title, link_tag} = {...props};
    const router = useRouter()
    return(
        <Flex direction='column' gap='2' w='100%'>
            <Text mb='10' mt='10' fontFamily='ClearSans-Bold' fontSize='24px' align={'center'} w='100%'>{title}</Text>
            <Grid
                templateRows={{base:'repeat(4, 1fr)',lg:'repeat(2, 1fr)'}}
                templateColumns={{base:'repeat(2, 1fr)',lg:'repeat(4, 1fr)'}}
                gap={2}
                mt='6'
                px='6'
            >
                {data?.map((item)=>{
                return(
                        <Image boxSize={'full'} src={item?.profile_photo_url || "../Pro.png"} alt='image' key={item?.id} objectFit={'contain'} border={'2px dotted #eee'} p='2' _hover={{boxShadow:'lg'}} onClick={(()=>{router.push(`/supplier?id=${item?._id}&supplier=${item?.account_type}`)})}/>
                    )
                })}
            </Grid>
        </Flex>
    )
}