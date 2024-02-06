import { Box, Flex, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight  } from "react-icons/md";
import { motion } from "framer-motion";
import {Get_Top_Product} from "../../../pages/api/product/route.api";
import { useRouter } from "next/router";

export const Carousel=(props) => {
  const [slides,set_slides]=useState([]);
  const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length;

    const SLIDES_INTERVAL_TIME = 5000;
    const ANIMATION_DIRECTION = "right";
    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
    useEffect(() => {
        const automatedSlide = setInterval(() => {
            ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
        }, SLIDES_INTERVAL_TIME);
        return () => clearInterval(automatedSlide);
    }, [slidesCount]);
  
    const setSlide = (slide) => {
      setCurrentSlide(slide);
    };
  
    const carouselStyle = {
      transition: "all 1.5s",
      ml: `-${currentSlide * 100}%`,
    };

    useEffect(()=>{
      FetchData()
    },[])

    const FetchData=async()=>{
      await Get_Top_Product().then((res)=>{
        set_slides(res.data)
      }).catch((err)=>{
      })
    }
    return (
        <Flex pos="relative" overflow="hidden" borderRadius={20} {...props} w={{base:'full',md:props.w}}>
            <Flex h="full" w="full" {...carouselStyle}>
                {slides.map((slide, sid) => (
                <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none" onClick={(()=>{router.push(`/products/product?pid=${slide._id}`)})} cursor='pointer'>
                    <Image src={'../../Pro.png'} alt="carousel image" boxSize="full" backgroundSize="cover" objectFit={'cover'}/>
                    <Stack p="8px 12px" pos="absolute" bottom="0px" pb='5' w="full" color="white" bgGradient="linear(to-t,rgba(0,0,0,0.6), rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.2), rgba(0,0,0,0))">
                      <motion.div
                          key={currentSlide === sid ? sid : 0}
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 1 }}
                      >
                          <Text fontSize="lg" color='#009393' fontWeight={'bold'}>Featured product</Text>
                          <Text fontSize="lg">{slide?.name_of_product}</Text>
                      </motion.div>
                    </Stack>
                </Box>
                ))}
            </Flex>
            <Icon as={MdKeyboardArrowLeft} boxSize={"6"} top='15' right="10" color='#e5e5e5' transition="0.4s ease-in-out" bg='rgba(0,0,0,0.3)' borderRadius={'full'} _hover={{color:'#fff',bg:'#000',borderRadius:'full'}} position={'absolute'} cursor={'pointer'} onClick={prevSlide}/>
            <Icon as={MdKeyboardArrowRight} boxSize={"6"} top='15' right="2" color='#e5e5e5' transition="0.4s ease-in-out" bg='rgba(0,0,0,0.3)' borderRadius={'full'} _hover={{color:'#fff',bg:'#000',borderRadius:'full'}} position={'absolute'} cursor={'pointer'} onClick={nextSlide}/>
            <HStack justify="center" pos="absolute" top="15px" left='15px'>
                {Array.from({
                    length: slidesCount,
                }).map((_, slide) => (
                <Box key={`dots-${slide}`} cursor="pointer" boxSize={3} m="0 1px" bg={currentSlide === slide ? "teal.100" : "teal.800"} rounded="50%" display="inline-block" transition="background-color 0.4s ease" _hover={{ bg: "teal.100", }}onClick={() => setSlide(slide)}></Box>
                ))}
            </HStack>
        </Flex>
    );
  };
  