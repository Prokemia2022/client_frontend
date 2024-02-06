import { Box, Button, Flex, Grid, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react"
import { Carousel } from "../../../components/ui/Dashboard/carousel.ui";
import { useUserContext } from "../../../components/Providers/userContext";
import { Account } from "./uicomponents/home/account";
import { Analytics } from "./uicomponents/home/analytics";
import Consultancy_Form from "../../../components/ui/Dashboard/consultationform.ui";

export const Home=()=>{
    const {user,set_user_handler } = useUserContext();
    const consultation_drawer_form = useDisclosure()
    return(
        <Box>
            <Flex gap='2' flexDirection={{base:'column',md:'row'}}>
                <Flex flexDirection={{base:'column',md:'row'}} flex='1' bg={'#fff'} p='4' borderRadius={20} bgGradient="linear(to-r, rgba(175,175,175,255), rgba(175,175,175,255))" gap='2' align='center' justify={'space-between'} boxShadow={'md'}>
                    <Box px='2' gap='2'>
                        <Text fontSize={'2xl'} my='2'> Welcome back 👋 {user?.contact_person_name} </Text>
                        <Text my='3'>Need assistance in growing your seller account to grow in our marketplace? <br/>Talk to our sales team.</Text>
                        <Button bg='#343838' color='white' onClick={(()=>{consultation_drawer_form.onToggle()})}>Go now</Button>
                        <Consultancy_Form label='Talk to our sales team' consultation_drawer_form={consultation_drawer_form}/>
                    </Box>
                    <Image src='../../dashboard_image.jpg' boxSize='200' display={{sm:'block',md:'none',lg:'block'}}/>
                </Flex>
            </Flex>
            <Grid  templateColumns='repeat(5, 1fr)' gap={4} mt='4'>
                <GridItem colSpan={{  base: "5", md: "1", }}>
                    <Account/>
                </GridItem>
                <GridItem colSpan={{ base: "5", md: "4", }}>
                    <Analytics/>
                </GridItem>
            </Grid>
        </Box>
    )
}