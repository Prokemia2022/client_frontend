import React, { useEffect, useState } from "react";
import { Text,  Box, Button, HStack, Tag, Grid, Wrap, GridItem, Heading, VStack, Divider, useToast, Link, Tooltip, TagLeftIcon, Icon, Flex, AbsoluteCenter, useDisclosure } from '@chakra-ui/react';
//utils
import {useRouter} from 'next/router';
import moment from 'moment';
//icons
import { FaStar } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { CgBrowser } from "react-icons/cg";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
//api
import { Get_Product } from "../../api/product/route.api.js";
//components
import Make_A_Quote from "../../../components/ui/call-to_action/quote.js";
import Make_A_Sample from "../../../components/ui/call-to_action/sample.js";
import { Share_Item } from "../../../components/ui/share.ui";
//providers
import { useUserContext } from '../../../components/Providers/userContext.js'
import { UseGetLocalStorage, UseStoreLocalStorage } from "../../../hooks/useLocalStorage.hook.js";

export default function Product(){
    const { user } = useUserContext();
    const router = useRouter();
    const toast = useToast();

    const view_quote_drawer_disclosure = useDisclosure()
    const view_sample_drawer_disclosure = useDisclosure()

    const id = router.query.pid;
    
    const [product_data,set_product_data]=useState('');
    const [file_access, set_file_access]=useState(false);
    const [is_prod_liked, set_is_prod_liked]=useState(false);

    const handle_file=()=>{
        {/**
            Checks if user exists and allows access to view documents
        */}
        if(!user){
            set_file_access(false);
            return null;
        }
        set_file_access(true);
    }

    const alertViewer=()=>{
        // Alerts user if they can access documents
        toast({ title: 'Failed to access file', description: 'Sign In or create an account to get access to documents.', position: 'top-left', variant:"left-accent", status: 'warning', isClosable: true,});
        return ;
    }

	const get_Data=async()=>{
		await Get_Product(id).then((response)=>{
			set_product_data(response.data);
		})
	}

    const [saving_liked_prod,set_saving_liked_prod]=useState(false);

    const Save_To_Favorite=()=>{
        set_saving_liked_prod(true)
        if(!user){
            toast({ title: 'Failed to save this product', description: 'Sign In or create an account to access this feature.', position: 'top-left', variant:"left-accent", status: 'warning', isClosable: true,});
            return;
        }
        let supplier_link;
        if(product_data?.listed_by_id === product_data?.distributed_by_id){
           supplier_link = (`/supplier?id=${product_data?.distributed_by_id}&supplier=distributor`)
        }else if(product_data?.listed_by_id === product_data?.manufactured_by_id){
            supplier_link = (`/supplier?id=${product_data?.manufactured_by_id}&supplier=manufactured`)
        }else{
            supplier_link = null;
        }
        const data = {
            _id: product_data?._id,
            name_of_product: product_data?.name_of_product,
            industry: product_data?.industry,
            technology: product_data?.technology,
            distributed_by: product_data?.distributed_by,
            manufactured_by: product_data?.manufactured_by,
            listed_by_id:   product_data?.listed_by_id,
            supplier_link
        }
        UseStoreLocalStorage('products',data).then((res)=>{
            toast({ title: 'Product added to your library', description: '',position:'top-left',variant:'left-accent'})
        }).catch((err)=>{
            toast({ title: 'Something went wrong', description: 'Could not add this product to your library, seems it already exists',position:'top-left',variant:'left-accent' })
        }).finally(()=>{
            set_saving_liked_prod(false)
        })
    }
    
	useEffect(()=>{
        if (id ){
            get_Data()
            Handle_Check_Liked_Prod()
		}
        handle_file();
	},[id,saving_liked_prod,is_prod_liked]);

    const Handle_Check_Liked_Prod=async()=>{
        const data= await UseGetLocalStorage('products');
        set_is_prod_liked(data?.some(item => item?._id === product_data?._id))
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
    return (
        <Box gap='2' p={{base:'2',md:'6'}} bg='#eee'>
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
                        <Link href={`${product_data?.website_link_to_Seller}`} rel="noopener noreferrer" target="_blank" my='3' fontSize='sm' color={'teal'} display={'flex'} gap='2' align='center'>
                            <Icon as={CgBrowser} boxSize={4} mx='2'/>
                            <Text fontWeight={'bold'}>Website</Text>
                        </Link>
                        <HStack p='2' my='2' cursor={'pointer'} transition={'.3s ease-out'} _hover={{bg:'#eee'}}
                            onClick={(()=>{
                                if(product_data?.listed_by_id === product_data?.distributed_by_id){
                                    router.push(`/account/distributor/${product_data?.distributed_by_id}`)
                                }else if(product_data?.listed_by_id === product_data?.manufactured_by_id){
                                    router.push(`/account/manufacturer/${product_data?.manufactured_by_id}`)
                                }else{
                                    return ;
                                }
                            })}
                        >
                            <Icon as={FaStore} boxSize={4}/>
                            <Text>More from this seller</Text>
                        </HStack>
                        <Share_Item tag='product' title={product_data?.name_of_product} text={product_data?.description_of_product} link={`https://prokemia.com/products/product?pid=${product_data?._id}`}/>
                        {is_prod_liked? 
                        <HStack p='2' my='2' cursor={'pointer'} transition={'.3s ease-out'} _hover={{bg:'#eee'}} onClick={Save_To_Favorite}>
                            <Icon as={MdFavorite} boxSize={4} color='red'/>
                            <Text>Product saved</Text>
                        </HStack>
                        :
                        <HStack p='2' my='2' cursor={'pointer'} transition={'.3s ease-out'} _hover={{bg:'#eee'}} onClick={Save_To_Favorite}>
                            <Icon as={MdFavoriteBorder} boxSize={4}/>
                            <Text>Save this product</Text>
                        </HStack>}
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
                                            <>
                                                {file_access?
                                                    <Link href={file?.url} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                                        <Icon as={CiFileOn} boxSize={4} color={file?.color}/>
                                                        {file?.title}
                                                    </Link>
                                                    :
                                                    <Link onClick={alertViewer} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                                        <Icon as={CiFileOn} boxSize={4} color={file?.color}/>
                                                        {file?.title}
                                                    </Link>
                                                }
                                            </> 
                                        }
                                    </Flex>
                                )
                            })}
                        </VStack>
                    </Box>
                    <Box bg='#fff' borderRadius='5' p='4' >
                        <HStack>
                            <Icon as={FaCartShopping} boxSize={4}/>
                            <Text fontWeight='bold'>Order</Text>
                        </HStack>
                        <Box>
                            <Text>Price</Text>
                            <Text fontSize={'12px'}>Available on quote</Text>
                        </Box>
                        <Flex direction={'column'} gap='2' mt='2'>
                            <Make_A_Quote view_drawer_disclosure={view_quote_drawer_disclosure} prod_data={product_data}/>
                            <Make_A_Sample view_drawer_disclosure={view_sample_drawer_disclosure} prod_data={product_data}/>
                            <Button bg='#343838' color={'#fff'} onClick={(()=>{view_sample_drawer_disclosure.onToggle()})}>Request a Sample</Button>
                            <Box position='relative' padding='2'>
                                <Divider />
                                <AbsoluteCenter bg='white' px='4'>
                                    or
                                </AbsoluteCenter>
                            </Box>
                            <Button bg={'#009393'} color='#fff' onClick={(()=>{view_quote_drawer_disclosure.onToggle()})}>Request a Qoute</Button>
                        </Flex>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}