import { Badge, Box, Center, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Table, TableContainer, Tag, TagLabel, Tbody, Td, Text, Th, Thead, Tooltip, Tr, Wrap, useDisclosure } from "@chakra-ui/react"
import { useEffect,  useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { UsedashboardContext } from "../../../../../components/Providers/dashboardContext";
import { useUserContext } from "../../../../../components/Providers/userContext";
import { GoDotFill } from "react-icons/go";
import { AiOutlineClear } from "react-icons/ai";
import { UseDebounceValue } from "../../../../../hooks/lib/useDebounce.hook";
import { IoClose, IoSearch } from "react-icons/io5";
import { TbExternalLink } from "react-icons/tb";
import { Get_Sales_By_Creator } from "../../../../api/clients/salesperson/route.api";

export default function Sales_Table(){
    const {user} = useUserContext()
    const [data, set_data]=useState([]);
    const [publish_sort,set_publish_sort]=useState(null);
    const [search_query,set_search_query] = useState('');
    const [is_fetching, set_is_fetching]=useState(false);
    const debounce_search_value = UseDebounceValue(search_query);

    const Clear_Filter_Options=()=>{
		set_search_query('');
	}

    useEffect(()=>{
        fetchData()
    },[user?._id,publish_sort,search_query])
    const fetchData=async()=>{
        set_is_fetching(true)
        await Get_Sales_By_Creator(user?._id).then((res)=>{
            let arr;
            switch(publish_sort){
                case null:
                    arr = res?.data;
                case true:
                    arr = res.data.sort(function(x, y) {
                        return (x.publish_status === y.publish_status)? 0 : x? -1 : 1;
                    });
                case false:
                    arr = res.data.sort(function(x, y) {
                        return (x.publish_status === y.publish_status)? 0 : x? 1 : -1;
                    });
                default:
                    arr = res?.data;
            }
            set_data(arr.filter((item) => item.name_of_product?.toLowerCase().includes(debounce_search_value.toLowerCase())))
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            set_is_fetching(false)
        })
    }
    return(
        <Box>
            <InputGroup alignItems={'center'} size='md' w={{base:'full', md:'40%'}}>
                <InputLeftElement pointerEvents='none' color='gray' alignItems={'center'}>
                    <Icon as={IoSearch} boxSize={5}/>
                </InputLeftElement>
                <Input type='text' placeholder='Search sales ' value={search_query} onChange={((e)=>{set_search_query(e.target.value)})}/>
                <InputRightElement>
                    {is_fetching? <Spinner size={'sm'}/> : null}
                    {search_query !== '' && !is_fetching? <Icon as={IoClose} onClick={Clear_Filter_Options}/> : null}
                </InputRightElement>
            </InputGroup>
            <Wrap align='center' spacing='20px' mt='2' px='2'>
                <Flex fontSize={'sm'} gap='2'>
                    <Text fontWeight='bold' color='gray.800'>{data?.length}</Text>
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
            <TableContainer bg='#fff' mt='4' borderRadius={5}>
                {data?.length == 0? 
                    <Center display={'flex'} flexDirection={'column'} py='10' >
                        <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                        <Text color={'gray.300'} textAlign={'center'}>You have not made any sales yet.</Text>
                    </Center>
                :
                    <Table variant='simple'>
                        <Thead bg='#eee' borderRadius={'5'}>
                            <Tr>
                                <Th cursor={'pointer'}>
                                    {publish_sort == null? 
                                        <Flex onClick={(()=>{set_publish_sort(true)})}>
                                            <Icon as={GoDotFill} boxSize={4} color={'orange'}/>
                                            <Text>/</Text>
                                            <Icon as={GoDotFill} boxSize={4} color={'green.300'}/>
                                        </Flex>
                                        : null 
                                    }
                                    {publish_sort !== null && !publish_sort? <Icon as={GoDotFill} boxSize={4} color={'green'} onClick={(()=>{set_publish_sort(true)})}/>: null}
                                    {publish_sort !== null && publish_sort? <Icon as={GoDotFill} boxSize={4} color={'orange'} onClick={(()=>{set_publish_sort(false)})}/>: null}
                                </Th>
                                <Th > Name </Th>
                                <Th > Client </Th>
                                <Th > Price</Th>
                                <Th > Volume</Th>
                                <Th > Total</Th>
                                <Th > Sale Status</Th>
                                <Th > Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((item)=>{
                                return(
                                    <Sale_Card item={item} key={item?._id}/>
                                )
                            })}
                        </Tbody>
                    </Table>
                }
            </TableContainer>
        </Box>
    )
}

const Sale_Card=(props)=>{
    const { item} = {...props};
    const {set_page,set_sales_data} = UsedashboardContext();
    const delete_sale_disclosure = useDisclosure();

    const HandleViewSale=()=>{
        set_page('View_Sale');
        set_sales_data(item)
    }
    const HandleeditSale=()=>{
        set_page('Edit_Sale');
        set_sales_data(item)
    }

    const HandleDeleteSale=()=>{
        delete_sale_disclosure?.onToggle()
        console.log(item)
        set_sales_data(item)
    }


    return(
        <Tr bg={item?.publish_status ? '' : 'gray.200'} position={'relative'}>
            {item?.publish_status ? 
                <Td> 
                    <Badge colorScheme="green">active</Badge>
                </Td>
                :
                <Td> 
                    <Badge colorScheme="orange">draft</Badge>
                </Td>
            }
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}}>{item?.name_of_product}</Td>
            <Td> {item.name_of_client}</Td>
            <Td> {item?.unit_price}</Td>
            <Td> {item?.volume_of_items}</Td>
            <Td> {item?.total}</Td>
            <Td> {item?.order_status === 'completed'? <Badge colorScheme="green">{item?.order_status}</Badge> : <Badge colorScheme="orange">{item?.order_status}</Badge>}</Td>
            <Td> 
                <Tooltip label='view sale'>
                    <IconButton icon={<TbExternalLink/>} size={'md'} onClick={HandleViewSale} bg='#fff'/>
                </Tooltip>
            </Td>
        </Tr>
    )
}