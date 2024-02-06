import { Box, Button, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react"
import { Carousel } from "../../../components/ui/Dashboard/carousel.ui";
import { useUserContext } from "../../../components/Providers/userContext";
import { Product_Table } from "../../../components/ui/Dashboard/product_table.ui";
import Consultancy_Form from "../../../components/ui/Dashboard/consultationform.ui";

export const Home=()=>{
    const {user,set_user_handler } = useUserContext();
    const consultation_drawer_form = useDisclosure()
    return(
        <Box>
            <Flex gap='2' flexDirection={{base:'column',md:'row'}}>
                <Flex flexDirection={{base:'column',md:'row'}} flex='1' bg={'#fff'} p='4' borderRadius={20} bgGradient="linear(to-r, rgba(175,175,175,255), rgba(175,175,175,255))" gap='2' align='center' justify={'space-between'} boxShadow={'md'}>
                    <Box px='2' gap='2'>
                        <Text fontSize={'2xl'} my='2'> Welcome back 👋 {user?.first_name} </Text>
                        <Text my='3'>Looking to earn more money? <br/> Offer qualified information about ingredients and chemicals to buyers and suppliers. <br/> Become an expert and join the community.</Text>
                        <Button bg='#343838' color='white' onClick={(()=>{consultation_drawer_form.onToggle()})}>Register now</Button>
                    </Box>
                    <Image src='../../dashboard_image.jpg' alt='bannerimage' boxSize='200' display={{sm:'block',md:'none',lg:'block'}}/>
                </Flex>
                <Consultancy_Form label='Become an expert' consultation_drawer_form={consultation_drawer_form}/>
                <Carousel w='300px' h='250px' boxShadow={'md'}/>
            </Flex>
            <Product_Table />
        </Box>
    )
}