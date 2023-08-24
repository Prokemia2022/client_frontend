import React, { useEffect, useRef, useState } from "react";
import {
    Text, 
    Box, 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    InputRightElement,
    CircularProgress,
    Tag,
    TagLabel,
    Flex,
    Wrap,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Heading
} from '@chakra-ui/react';
//utils
import {useRouter} from 'next/router';
//icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
//apis
import Get_Products from '../api/product/fetch_products_by_lister'
//import Get_Products from '../api/product/get_products'
import Delete_Product from "../api/product/delete_product";
import moment from "moment";

export default function Body(props){
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
            set_current_page,
            set_product_id,
            company_name,
            is_verified,
            is_suspended,
            email
    }={...props};

    //utils
    const router = useRouter();
    const toast = useToast();

    //data handlers
    const [products,set_products]=useState([]);

    //data manipulators
	const [search_query,set_search_query] = useState('');
	const debounce_search_value = useDebounceValue(search_query);
    
    const [refresh_data,set_refresh_data]=useState('') //refetches products on data change
    const [is_refetch_products,set_is_refetch_products]=useState('') //refetches products on data change
    
    useEffect(()=>{
        Fetch_Products_Data();
	},[lister_id,refresh_data]);

    {/**
        Fetch_Products_Data: Fetches all products by this lister

            Props:
                query_params (obj) : passes attributed used to query products 
                    attr:{
                        lister_id : used to filter products by this company,
                        query:      searches products based on the query
                    }            
            Returns: 
                onSuccess:  sets  products to array data handler; set_products.
                onError:    throws an error
    */}
    const Fetch_Products_Data=async()=>{
        const query_params = {
            lister_id,
        }
		await Get_Products(query_params).then((response)=>{
            return set_products(response?.data)
		}).catch((err)=>{
            toast({
                title: 'Error while fetching products',
                description: '',
                status: 'error',
                variant:'left-accent',
                position:'top-left',
                isClosable: true,
            });
		})
	}

    {/**
        Clear_Filter_Options: clears all filters
    */}

    const Clear_Filter_Options=()=>{
		set_search_query('');
	}

    const new_product_url = `/products/product/new?company_name=${company_name}&email=${email}&lister_id=${lister_id}&acc_type=distributor&is_verified=${is_verified}&is_suspended=${is_suspended}`;
    return (
        <Box gap='2'>
            <HStack justifyContent={'space-between'}>
                <Box>
                    <Heading as='h4'>Inventory</Heading>
                    <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={'semibold'}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={(()=>{set_current_page('dashboard')})}>Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>inventory</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>
                <Button 
                    colorScheme="teal" 
                    leftIcon={<AddIcon />} 
                    onClick={(()=>{router.push(new_product_url)})}
                >
                    New Product
                </Button>
            </HStack>
            <Box gap='2' bg='#fff' borderRadius={5} p='4' mt='2'>
                <SimpleGrid minChildWidth='250px' spacing='20px' mt='4'>
                    <InputGroup alignItems={'center'}>
                        <InputLeftElement pointerEvents='none' color='gray' alignItems={'center'}>
                            <SearchIcon style={{marginTop:'8px'}} />
                        </InputLeftElement>
                        <Input type='text' placeholder='Search products by name' size='lg' value={search_query} onChange={((e)=>{set_search_query(e.target.value)})}/>
                        {is_refetch_products? 
                            <InputRightElement>
                                <CircularProgress isIndeterminate color='gray' size={'20px'} />
                            </InputRightElement>
                            :
                            null
                        }
                    </InputGroup>
                </SimpleGrid>
                <Wrap align='center' spacing='20px' mt='4'>
                    <Flex fontSize={'sm'} gap='2'>
                        <Text fontWeight='bold' color='gray.800'>{products.length}</Text>
                        <Text fontWeight='light' color='gray.400'>results found</Text>
                    </Flex>
                    {search_query !== ''? 
                        <Tag  onClick={Clear_Filter_Options} size='lg' gap='1' _hover={{bg:'red.100'}} bg='gray:200' color='red' borderRadius='md' cursor={'pointer'}>
                            <DeleteSweepIcon/>
                            <TagLabel>clear</TagLabel>
                        </Tag>
                        :
                        null
					}
                </Wrap>
                <TableContainer bg='#fff' mt='4' borderRadius={5}>
                    <Table variant='simple'>
                        <Thead bg='#eee' borderRadius={'5'}>
                            <Tr>
                                <Th >
                                    <Flex align={'center'}>
                                        <Text>
                                            Product
                                        </Text>
                                    </Flex>
                                </Th>
                                <Th >
                                    <Flex align={'center'}>
                                        <Text>
                                            Featured status
                                        </Text>
                                    </Flex>
                                </Th>
                                <Th >Pending approval</Th>
                                <Th >Expiring</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products?.filter((item)=>item?.name_of_product.toLowerCase().includes(debounce_search_value.toLowerCase())).map((item)=>{
                                return(
                                    <Product_Card 
                                        key={item?._id}
                                        set_current_page={set_current_page}
                                        set_product_id={set_product_id}
                                        lister_id={lister_id}
                                        is_suspended={is_suspended}
                                        is_verified={is_verified}
                                        set_refresh_data={set_refresh_data}
                                        item={item}
                                    />
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

const useDebounceValue=(value, time = 500)=>{
	const [debounceValue, setDebounceValue]=useState(value);

	useEffect(()=>{
		const timeout = setTimeout(()=>{
			setDebounceValue(value);
		}, time);

		return () => {
			clearTimeout(timeout);
		}
	},[value, time]);

	return debounceValue;
}

const Product_Card=(props)=>{
    const {
        item,
        set_current_page,
        set_product_id,
        lister_id,
        is_suspended,
        is_verified,
        set_refresh_data
    } = {...props};
        
    const { isOpen, onOpen, onClose,} = useDisclosure()
    const cancelRef = useRef();

    const router = useRouter();
    const toast = useToast();

    const handle_deletion=async()=>{
        const payload= {
            _id: item?._id,
            lister_id,
        }
        if(is_suspended){
          toast({
            title: 'Your account is currently suspended.',
            description: 'reach out to support for guidance by emailing us at help@prokemia.com',
            status: 'error',
            variant:'left-accent',
            position:'top-left',
            isClosable: true,
          });
          onClose()
          return ;
        }else if(!is_verified){
            toast({
              title: 'Your account has not been verified',
              description: 'reach out to support for guidance by emailing us at help@prokemia.com',
              status: 'error',
              variant:'left-accent',
              position:'top-left',
              isClosable: true,
            });onClose()
            return ;
        }else {
          await Delete_Product(payload).then(()=>{
            toast({
              title: '',
              description: `${item?.name_of_product} has been deleted.`,
              status: 'success',
              variant:'left-accent',
              position:'top-left',
              isClosable: true,
            });
            set_refresh_data(`${item?.name_of_product} has been deleted.`)
            onClose()
          }).catch((err)=>{
            toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              variant:'left-accent',
              position:'top-left',
              isClosable: true,
            });
          });
        }
      }
    return(
        <Tr bg={!item?.verification_status? 'gray.100':'none'} align={'center'} fontWeight={'regular'}>
            <Td 
                onClick={(()=>{set_product_id(`${item?._id}`);set_current_page('product');})}
                color='#009393' 
                fontWeight={'semibold'}
                _hover={{
                    textDecoration:'underline dotted',
                    cursor:'pointer'
                }}
            >{item?.name_of_product}</Td>
            <Td>
                <Badge variant='subtle' bg={item?.sponsored? 'green.200':'orange.200'}>
                    {item?.sponsored? 'Featured':'not featured'}
                </Badge>
            </Td>
            <Td>
                <Badge variant='subtle' bg={item?.verification_status? 'green.200':'gray.300'}>
                    {item?.verification_status? 'Approved':'not approved'}
                </Badge>
            </Td>
            <Td>
                <Badge variant='subtle' bg={item?.short_on_expiry? 'orange.200':''}>
                    {item?.short_on_expiry_date ? moment( item?.short_on_expiry_date).format("MMM Do YY") : '-'}
                </Badge>
            </Td>
            <Td>
                <Menu >
                    <MenuButton >
                        <MoreVertIcon/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem 
                            onClick={(()=>{set_current_page('product');set_product_id(`${item?._id}`)})}
                        >View Product</MenuItem>
                        <MenuItem 
                            onClick={(()=>{router.push(`/products/product/edit/${item?._id}?uid=${lister_id}&acc_type='distributor'`)})}
                        >
                            Edit Product
                        </MenuItem>
                        <MenuItem 
                            onClick={onOpen}
                        >Delete Product</MenuItem>
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
                                    Delete this product: {item?.name_of_product}?
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
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}