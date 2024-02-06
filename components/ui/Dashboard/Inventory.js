import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Tag, TagLabel, Text, Wrap } from "@chakra-ui/react"
import { IoIosAdd } from "react-icons/io";
import { usedashboardContext } from "../../Providers/dashboardContext";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { useProductsByLister } from "../../../hooks/product/useProductByLister.hook";
import { useUserContext } from "../../Providers/userContext";
import { useDebounceValue } from "../../../hooks/lib/useDebounce.hook";
import { Product_Table } from "./supplier_product_table.ui";

export const Inventory=()=>{
    const {set_page,refetch_products} = usedashboardContext();
    const {user} = useUserContext()
    const [search_query,set_search_query] = useState('');
    const [is_fetching, set_is_fetching]=useState(false);
    const [products, set_products]=useState([]);
    const debounce_search_value = useDebounceValue(search_query);

    useEffect(()=>{
        Fetch_Data()
    },[user,debounce_search_value,refetch_products])

    async function Fetch_Data(){
        set_is_fetching(true)
        let data = await useProductsByLister(user?._id);
        data = data.filter((item) => item.name_of_product?.toLowerCase().includes(debounce_search_value.toLowerCase()) || item.industry?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||  item.technology?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||  item.manufactured_by?.toLowerCase().includes(debounce_search_value.toLowerCase()) ||  item.distributed_by?.toLowerCase().includes(debounce_search_value.toLowerCase()))
        set_products(data);
        set_is_fetching(false)
    }
    const Clear_Filter_Options=()=>{
		set_search_query('');
	}
    const HandleAddProduct=()=>{
        set_page('AddProduct');
    }

    return(
        <Box gap='2'>
            <HStack justifyContent={'space-between'} align={'center'} bg='#fff' p='2' px='4' boxShadow={'sm'} borderRadius={'md'} mb='2'>
                <Box>
                    <Heading as='h4'>Inventory</Heading>
                    <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={''}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={(()=>{set_page('Home')})}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>inventory</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>
                <Button colorScheme="teal" leftIcon={<IoIosAdd />} onClick={HandleAddProduct}> New Product </Button>
            </HStack>
            <Box w='full' bg='#fff' p='2' borderRadius={'md'} boxShadow={'sm'}>
                <InputGroup alignItems={'center'} size='md' w={{base:'full', md:'40%'}}>
                    <InputLeftElement pointerEvents='none' color='gray' alignItems={'center'}>
                        <Icon as={IoSearch} boxSize={5}/>
                    </InputLeftElement>
                    <Input type='text' placeholder='Search products ' value={search_query} onChange={((e)=>{set_search_query(e.target.value)})}/>
                    <InputRightElement>
                        {is_fetching? <Spinner size={'sm'}/> : null}
                        {search_query !== '' && !is_fetching? <Icon as={IoClose} onClick={Clear_Filter_Options}/> : null}
                    </InputRightElement>
                </InputGroup>
                <Wrap align='center' spacing='20px' mt='2' px='2'>
                    <Flex fontSize={'sm'} gap='2'>
                        <Text fontWeight='bold' color='gray.800'>{products?.length}</Text>
                        <Text fontWeight='light' color='gray.400'>results found</Text>
                    </Flex>
                    {search_query !== ''? 
                        <Tag  onClick={Clear_Filter_Options} size='lg' gap='1' _hover={{bg:'red.100'}} bg='gray:200' color='red' borderRadius='md' cursor={'pointer'}>
                            <Icon as={AiOutlineClear}/>
                            <TagLabel>clear</TagLabel>
                        </Tag>
                        :
                        null
					}
                </Wrap>
                <Product_Table data={products}/>
            </Box>
        </Box>
    )
}