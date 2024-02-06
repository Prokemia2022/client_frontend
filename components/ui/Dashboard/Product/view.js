import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, Divider, Flex, Grid, GridItem, HStack, Heading, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatHelpText, StatNumber, Tag, TagLeftIcon, Text, Tooltip, VStack, Wrap, useDisclosure, useToast } from "@chakra-ui/react"
// icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaLock, FaStar } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { CiFileOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// components
import { Share_Item } from "../../share.ui";
import DeleteProduct from "../delete_product.ui";
// providers
import { usedashboardContext } from "../../../Providers/dashboardContext";
import { useUserContext } from "../../../Providers/userContext";
//utils
import moment from "moment";
import { useEffect, useState } from "react";
// hooks
import { useProductData } from "../../../../hooks/product/useProductData.hook";
//api 
import { Feature_Product, Un_Feature_Product } from "../../../../pages/api/product/route.api";
import { useRouter } from "next/router";

export const ViewProduct=()=>{
    const {set_page,product_page_data,set_product_page_data} = usedashboardContext();
    const {user,set_user_handler } = useUserContext();
    const delete_product_disclosure = useDisclosure();
    const toast = useToast();
    const router = useRouter()

    const [product_data, set_product_data]=useState('')

    useEffect(()=>{
        FetchData()
    },[product_page_data]);

    async function FetchData(){
        const data = await useProductData(product_page_data?._id)
        set_product_data(data)
    }

    const HandleeditProduct=()=>{
        set_page('EditProduct');
        set_product_page_data(product_page_data)
    }

    const documents = [
        {
            title:'Technical Data Sheet',
            url:product_data?.data_sheet,
            color:'#EA9DB0'
        },
        {
            title:'Fomulation Document',
            url:product_data?.formulation_document,
            color:'teal'
        },
        {
            title:'Safety Data Sheet',
            url:product_data?.safety_data_sheet,
            color:'grey'
        },
    ];
    const payload = {
        _id: product_data?._id,
	}
    const Handle_Feature_Product=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else if(!user?.verification_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else {
            await Feature_Product(payload).then((response)=>{
                toast({ title: 'Product featured successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Error in featuring your product', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
                set_page('Inventory')
            })
        }
	}
	const Handle_Un_Feature_Product=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else if(!user?.verification_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
        }else {
            await Un_Feature_Product(payload).then((response)=>{
                toast({ title: 'Product un-featured successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Error in unfeaturing your product', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            }).finally(()=>{
                set_page('Inventory')
            })
        }
	}
    return(
        <Box gap='2'>
            <HStack justifyContent={'space-between'} align={'center'} bg='#fff' p='2' px='4' boxShadow={'sm'} borderRadius={'md'} mb='2'>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <Icon as={IoIosArrowBack}/>
                        <BreadcrumbLink onClick={(()=>{set_page('Inventory')})}>Back</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Menu>
                    <MenuButton colorScheme="teal" as={Button} rightIcon={<IoIosArrowDown />}>
                        Actions
                    </MenuButton>
                    <MenuList p='2'>
                        <MenuItem icon={<FiEdit/>} onClick={HandleeditProduct}>Edit Product</MenuItem>
                        <Share_Item tag='product' title={product_data?.name_of_product} text={product_data?.description_of_product} link={`https://prokemia.com/products/product?pid=${product_data?._id}`}/>
                        <MenuItem icon={<MdDelete />} onClick={delete_product_disclosure?.onToggle}>Delete Product</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(5, 1fr)'}} gap={4}>
                <GridItem colSpan={{ base: "1", md: "4", }}>
                    <Box bg='#fff' borderRadius={10} boxShadow={'sm'} p='4'>
                        <Wrap mb='2'>
                            {product_data?.sponsored?
                                <Tag size='lg' variant='solid' bg='orange.200' color='orange.800'>
                                    <TagLeftIcon boxSize={4} as={FaStar} />
                                    Featured
                                </Tag>
                            : null }
                            {product_data?.short_on_expiry?
                                <Tag size='lg' variant='solid' bg='gray.200' color='#000'>
                                    Expiring soon
                                </Tag>
                            : null }
                            {!product_data?.verification_status?
                                <Tag size='lg' variant='solid' bg='gray.300' color='#000'>
                                    not approved
                                </Tag>
                            : null}
                        </Wrap>
                        <Divider/>
                        <Wrap mt='2'>
                            <HStack align={'start'} pr='2' borderRight={'1px solid #000'} onClick={(()=>{router.push(`/products/${product_data?.industry}?type=Industries`)})}>
                                <Text fontWeight={'bold'}>Industry</Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.industry}</Text>
                            </HStack>
                            <HStack onClick={(()=>{router.push(`/products/${product_data?.technology}?type=Technologies`)})}>
                                <Text fontWeight={'bold'}>Technology:</Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.technology}</Text>
                            </HStack>
                        </Wrap>
                        <Heading as='h3' my='4' color='#009393'>{product_data?.name_of_product}</Heading>
                        <Box my='2' >
                            <Text fontWeight={'semibold'}>Product Description</Text>
                            <Text my='2'>{product_data?.description_of_product}</Text>
                        </Box>
                        <Wrap mt='2' mb='2'>
                            <HStack align={'start'} pr='2' borderRight={'1px solid #000'}>
                                <Text fontWeight={'bold'}>Manufacturer: </Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.manufactured_by}</Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight={'bold'}>Sold by:</Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.distributed_by}</Text>
                            </HStack>
                        </Wrap>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Brand:</Text>
                            <Text color='grey'>{product_data?.brand}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Chemical name:</Text>
                            <Text color='grey'>{product_data?.chemical_name}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Functions:</Text>
                            <Text color='grey'>{product_data?.function}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Features & Benefits:</Text>
                            <Text color='grey'>{product_data?.features_of_product}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Applications and benefits:</Text>
                            <Text color='grey'>{product_data?.application_of_product}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Packaging:</Text>
                            <Text color='grey'>{product_data?.packaging_of_product}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Storage & Handling:</Text>
                            <Text color='grey'>{product_data?.storage_of_product}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Expiry Date:</Text>
                            <Text color='grey'>{product_data?.short_on_expiry_date ? moment( product_data?.short_on_expiry_date).format("MMM Do YY") : '-'}</Text>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: "1", md: "1", }}>
                    <Box direction='column' gap='2' mt='2' mb='2' bg='#fff' borderRadius='5' p='4'>
                        <HStack color={user?.subscription? '': 'gray.400'}>
                            <Text>Product stats</Text>
                            {user?.subscription? null : <Icon as={FaLock} boxSize={4}/>}
                        </HStack>
                        {user?.subscription? 
                            <Stat flexDirection={'column'} textAlign={'center'} py='10' boxShadow={'sm'}>
                                <StatNumber>{product_data?.views}</StatNumber>
                                <StatHelpText>
                                    <StatArrow type='increase' />
                                        5.36%
                                </StatHelpText>
                            </Stat>
                        : 
                            <Center boxShadow={'sm'} display={'flex'} flexDirection={'column'} py='10' h='full' borderRadius='md'>
                                <Icon as={SiGoogleanalytics} boxSize={10} color={'gray.200'}/>
                                {user?.subscription? null : <Text fontSize={'xs'} color={'gray.400'} textAlign={'center'}>you need to upgrade to see<br/> your product's analytics</Text>}
                            </Center>
                        }
                        <Text fontWeight='bold'>Documents</Text>
                        <Divider/>
                        <VStack align={'flex-start'} flex='1'>
                            {documents?.map((file,index)=>{
                                return(
                                    <Flex key={index} w='full'>
                                        {file?.url === ''?
                                            <HStack opacity='0.5' bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                                <Icon as={CiFileOn} boxSize={4} color={file?.color}/>
                                                <Tooltip label={`${file?.title} missing`} placement={'auto'}>
                                                    <Text fontWeight={'semibold'}>{file?.title}</Text>
                                                </Tooltip>
                                            </HStack> 
                                            :
                                            <Link href={file?.url} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                                <Icon as={CiFileOn} boxSize={4} color={file?.color}/>
                                                {file?.title}
                                            </Link>
                                        }
                                    </Flex>
                                )
                            })}
                        </VStack>
                    </Box>
                    <Box bg='#fff' borderRadius='5' p='4' >
                        <Text fontWeight='bold'>Actions</Text>
                        <Divider />
                        <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={(()=>{set_page('EditProduct')})}>
                            <Icon as={FiEdit}/>
                            <Text>Edit Product</Text>
                        </HStack>
                        {product_data?.sponsored?
                            <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={Handle_Un_Feature_Product}>
                                <Icon as={FaRegStar}/>
                                <Text>Un Feature this product</Text>
                            </HStack>
                            :
                            <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={Handle_Feature_Product}>
                                <Icon as={FaStar}/>
                                <Text>Feature this product</Text>
                            </HStack>
                        }
                        <HStack bg='red.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'red.400',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={delete_product_disclosure?.onToggle}>
                            <Icon as={MdDelete} color={'red'}/>
                            <Text>Delete this product</Text>
                        </HStack>
                        <DeleteProduct delete_product_disclosure={delete_product_disclosure}/>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}