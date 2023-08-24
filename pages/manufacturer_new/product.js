import React, { useEffect, useRef, useState } from "react";
import {
    Text, 
    Box, 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    HStack,
    Tag,
    Grid,
    Wrap,
    GridItem,
    Heading,
    VStack,
    Divider,
    useToast,
    Link,
    Tooltip,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Skeleton
} from '@chakra-ui/react';
//utils
import {useRouter} from 'next/router';
import moment from 'moment';
//icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShareIcon from '@mui/icons-material/Share';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
//api
import Get_Product from '../api/product/get_product';
import Feature_Product from '../api/product/feature_product';
import Un_Feature_Product from '../api/product/un_feature_product';
import Delete_Product from '../api/product/delete_product';
//components
import { RWebShare } from "react-web-share";

export default function Product(props){
    {/**
        Props
            lister_id           (string)      :    id of the company account listing     
            set_current_page    (string)      :    status of the current_page            
            set_product_id      (string)      :    status of the product             
            company_name        (string)      :    name of the company         
            is_verified         (booloean)    :    verification_status of the company         
            is_suspended        (booloean)    :    suspension_status of the company         
            email               (string)      :    email of the compnay
    */}
    const {
        lister_id,
        product_id,
        set_current_page,
        is_suspended,
        is_verified,
        is_subscribed
    } = {...props}
    //console.log(product_id);
    const id = product_id
    const router = useRouter();
    const toast = useToast();

    const [product_data,set_product_data]=useState('');

    const [is_submitting,set_is_submitting]=useState(false);
    const [refresh_data,set_refresh_data]=useState(false);

	const payload = {
		//_id : id?.id,
        _id: id,
		acc_type: 'manufacturer',
        lister_id: lister_id
	}

	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			console.log(response.data)
		})
	}
	useEffect(()=>{
		if (payload._id || id ){
			get_Data(payload)
		}
	},[id,is_submitting,refresh_data]);

    const Handle_Feature_Product=async()=>{
		set_is_submitting(true)
        if(product_data?.verification_status){
            await Feature_Product(payload).then((res)=>{
                toast({
                    position: 'top-left',
                    variant:"subtle",
                    title: '',
                    description: `Successfully featured ${product_data?.name_of_product}`,
                    status: 'success',
                    isClosable: true,
                });
            }).catch((err)=>{
                toast({
                    position: 'top-left',
                    variant:"subtle",
                    title: 'Error while featuring this product',
                    description: err.response.data,
                    status: 'error',
                    isClosable: true,
                });
                //console.log(err.response.data)
            }).finally(()=>{
                setTimeout(()=>{set_is_submitting(false)},1000)
            })
        }else{
            toast({
                position: 'top-left',
                variant:"subtle",
                title: 'Error while featuring this product',
                description: 'This product has not been approved yet',
                status: 'error',
                isClosable: true,
            });
            return;
        }
	}
	const Handle_Un_Feature_Product=async()=>{
		set_is_submitting(true)
        if(product_data?.verification_status){
            await Un_Feature_Product(payload).then((res)=>{
                toast({
                    position: 'top-left',
                    variant:"subtle",
                    title: '',
                    description: `Successfully un-featured ${product_data?.name_of_product}`,
                    status: 'success',
                    isClosable: true,
                });
            }).catch((err)=>{
                toast({
                    position: 'top-left',
                    variant:"subtle",
                    title: 'Error while un-featuring this product',
                    description: err.response.data,
                    status: 'error',
                    isClosable: true,
                });
                //console.log(err.response.data)
            }).finally(()=>{
                setTimeout(()=>{set_is_submitting(false)},1000)
            })
        }else{
            toast({
                position: 'top-left',
                variant:"subtle",
                title: 'Error while un featuring this product',
                description: 'This product has not been approved yet',
                status: 'error',
                isClosable: true,
            });
            return;
        }
		
	}
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();

    const handle_deletion=async()=>{
        if(is_suspended){
          toast({
            title: 'Your account is currently suspended.',
            description: 'reach out to support for guidance by emailing us at help@prokemia.com',
            status: 'error',
            isClosable: true,
          });
          return ;
        }else if(!is_verified){
            toast({
              title: 'Your account has not been verified',
              description: 'reach out to support for guidance by emailing us at help@prokemia.com',
              status: 'error',
              isClosable: true,
            });
            return ;
        }else {
          await Delete_Product(payload).then(()=>{
            toast({
              title: '',
              description: `${product_data?.name_of_product} has been deleted.`,
              status: 'success',
              isClosable: true,
            });
            set_current_page('inventory')
          }).catch((err)=>{
            toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              isClosable: true,
            });
          });
        }
        onClose()
      }
    return (
        <Box gap='2' m={{
            base:'0',
            md:'8'
        }}>
            <HStack justifyContent={'space-between'}>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <ChevronLeftIcon style={{fontSize:'20px',marginTop:'2'}}/>
                        <BreadcrumbLink onClick={(()=>{set_current_page('inventory')})}>Back</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <HStack>
                    <Tooltip label='Share this product'>
                        <Box align='center' p='1' borderRadius='5' bg='gray.200' px='2'>
                            <RWebShare
                                data={{
                                    title: `${product_data?.name_of_product}`,
                                    text: `${product_data?.description_of_product}`,
                                    url: `https://prokemia.com/product/${product_data?._id}`,
                                }}
                            >
                                <ShareIcon style={{fontSize:24,marginTop:2,marginBottom:'-1'}}/>
                            </RWebShare>
                        </Box>
                    </Tooltip>
                    <Menu>
                        <MenuButton colorScheme="teal" as={Button} rightIcon={<ExpandMoreIcon />}>
                            Actions
                        </MenuButton>
                        <MenuList p='2'>
                            <MenuItem _hover={{bg:'gray.300',borderRadius:'5',}} onClick={(()=>{router.push(`/products/product/edit/${product_data?._id}?uid=${lister_id}&acc_type='manufacturer'`)})}>
                                <HStack>
                                    <EditIcon/>
                                    <Text>Edit Product</Text>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
                mt='4'
            >
                <GridItem 
                    colSpan={{
                        base: "5",
                        md: "4",
                    }}
                >
                    <Box
                        bg='#fff'
                        borderRadius={10}
                        boxShadow={'sm'}
                        p='4'
                    >
                        <Wrap mb='2'>
                            {product_data?.sponsored?
                                <Tag size='lg' variant='solid' bg='gray.200' color='gray.800'>
                                    Featured
                                </Tag>
                            :
                                null
                            }
                            {product_data?.short_on_expiry?
                                <Tag size='lg' variant='solid' bg='orange.200' color='#000'>
                                    Expiring soon
                                </Tag>
                            :
                                null
                            }
                            {!product_data?.verification_status?
                                <Tag size='lg' variant='solid' bg='gray.300' color='#000'>
                                    not approved
                                </Tag>
                            :
                                null
                            }
                        </Wrap>
                        <Divider/>
                        <Wrap>
                            <HStack align={'start'}>
                                <Text fontWeight={'bold'}>Industry</Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.industry}</Text>
                            </HStack>
                            <Divider orientation='vertical' />
                            <Divider orientation='vertical' />
                            <HStack>
                                <Text fontWeight={'bold'}>Technology:</Text>
                                <Text color='#009393' cursor='pointer'>{product_data?.technology}</Text>
                            </HStack>
                        </Wrap>
                        <Heading as='h3' my='4' color='#009393'>{product_data?.name_of_product}</Heading>
                        <Box my='2' >
                            <Text fontWeight={'semibold'}>Product Description</Text>
                            <Text my='2'>{product_data?.description_of_product}</Text>
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Manufactured by:</Text>
                            {product_data?.manufactured_by_id ?
                                <Text
                                    color='#009393'
                                    cursor='pointer'
                                > 
                                    {product_data?.manufactured_by}
                                </Text>
                                :
                                <Text 
                                    color='grey'
                                    cursor='pointer'
                                > 
                                    {product_data?.manufactured_by}
                                </Text>
                            }
                        </Box>
                        <Box mt='2'>
                            <Text fontWeight={'semibold'}>Distributed by:</Text>
                            {product_data?.distributed_by_id ?
                                <Text
                                    color='#009393'
                                    cursor='pointer'
                                > 
                                    {product_data?.distributed_by}
                                </Text>
                                :
                                <Text 
                                    color='grey'
                                    cursor='pointer'
                                > 
                                    {product_data?.distributed_by}
                                </Text>
                            }
                        </Box>
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
                <GridItem 
                    colSpan={{
                        base: "5",
                        md: "1",
                    }} 
                    rowSpan={{
                        base: "0",
                        md: "1",
                    }} 
                    
                >
                    <Box 
                        bg='#fff'
                        borderRadius='5'
                        p='2'
                    >
                        <Box 
                            direction='column' 
                            gap='2' 
                            mt='2' 
                            mb='2'
                            
                        >
                            <Box mt='2'>
                                <Text fontWeight={'bold'}>Website</Text>
                                <HStack color='teal' my='2' fontSize='sm'>
                                    <LanguageIcon mx='2px' />
                                    <a href={`${product_data?.website_link_to_Seller}`} target="_blank" rel="noopener noreferrer" style={{width:'50px'}}>{product_data?.website_link_to_Seller}</a>
                                </HStack>
                            </Box>
                            <Box mb='2'>
                                <Text fontWeight={'semibold'}>Created by:</Text>
                                <Text color='grey'>{product_data?.listed_by_id}</Text>
                            </Box>
                            <HStack mb='2'>
                                <Text fontWeight={'semibold'}>Viewed :</Text>
                                {is_subscribed?
                                    <Text color='grey'>{product_data?.views}</Text>
                                    :
                                    <HStack color='gray.300'>
                                        <Tooltip label='you need to upgrade to see how your products are perfoming'>
                                            <LockIcon fontSize='20'/>
                                        </Tooltip>
                                        <Skeleton w='30px'>
                                            <Text color='grey'>{product_data?.views}</Text>
                                        </Skeleton>
                                    </HStack>
                                }                                
                            </HStack>
                            <HStack mb='2'>
                                <CalendarMonthIcon/>
                                <Text color='gray.600' fontWeight={'semibold'}>{moment( product_data?.created_At).format("MMM Do YY")}</Text>
                            </HStack>
                            <Text fontWeight='bold'>Documents</Text>
                            <Divider/>
                            <VStack align={'flex-start'} flex='1'>
                                {product_data?.data_sheet === ''?
                                    <HStack opacity='0.5' bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'#EA9DB0',fontSize:'20px'}} />
                                        <Tooltip label='Technical Data Sheet missing' placement={'auto'}>
                                            <Text fontWeight={'semibold'}>Technical Data Sheet</Text>
                                        </Tooltip>
                                    </HStack> 
                                    : 
                                    <Link href={product_data?.data_sheet} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'#EA9DB0',fontSize:'20px'}} /> 
                                        Technical Data Sheet
                                    </Link>
                                }
                                {product_data?.formulation_document === ''?
                                    <HStack opacity='0.5' bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'teal',fontSize:'20px'}} />
                                        <Tooltip label='Fomulation Document missing' placement={'auto'}>
                                            <Text fontWeight={'semibold'}>Fomulation Document</Text>
                                        </Tooltip>
                                    </HStack> 
                                    : 
                                    <Link href={product_data?.formulation_document} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'teal',fontSize:'20px'}} />
                                        Fomulation Document
                                    </Link>
                                }
                                {product_data?.safety_data_sheet === ''?
                                    <HStack opacity='0.5' bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'grey',fontSize:'20px'}} />
                                        <Tooltip label='Safety Data Sheet missing' placement={'auto'}>
                                            <Text fontWeight={'semibold'}>Safety Data Sheet</Text>
                                        </Tooltip>
                                    </HStack> 
                                    : 
                                    <Link href={product_data?.safety_data_sheet} bg='#fff' border='1px' borderColor='grey' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'}>
                                        <InsertDriveFileIcon style={{color:'grey',fontSize:'20px'}} /> 
                                        Safety Data Sheet
                                    </Link>
                                } 
                            </VStack>
                        </Box>
                        <Text fontWeight='bold'>Actions</Text>
                        <Divider/>
                        <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={(()=>{router.push(`/products/product/edit/${product_data?._id}?uid=${lister_id}&acc_type='manufacturer'`)})}>
                            <EditIcon/>
                            <Text>Edit Product</Text>
                        </HStack>
                        {product_data?.sponsored?
                            <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={Handle_Un_Feature_Product}>
                                <StarOutlineRoundedIcon/>
                                <Text>Un Feature this product</Text>
                            </HStack>
                            :
                            <HStack bg='gray.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'#009393',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={Handle_Feature_Product}>
                                <StarRateRoundedIcon/>
                                <Text>Feature this product</Text>
                            </HStack>
                        }
                        <HStack bg='red.100' borderRadius={5} p='2' mt='2' flex='1' w='full' alignItems={'center'} _hover={{bg:'red.400',color:'#fff'}} cursor={'pointer'} transition={'1s ease'} onClick={onOpen}>
                            <DeleteRoundedIcon style={{color:'red'}}/>
                            <Text>Delete this product</Text>
                        </HStack>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete this product: {product_data?.name_of_product}?
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can't undo this action afterwards.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={handle_deletion} ml={3}>
                                    Delete
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}