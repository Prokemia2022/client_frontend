import {Badge, Center, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { useUserContext } from "../../../components/Providers/userContext";
import { FetchQuotesByRequester } from "../../api/call_to_action/quote.api";

export default function Quotes(){
    const [data, set_data]=useState([]);
    const {user} = useUserContext()
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        const result= await FetchQuotesByRequester(user?._id);
        set_data(result.data)
    }
    return(
        <TableContainer bg='#fff' mt='4' borderRadius={5} boxShadow={'md'}>
            <Text p='4' fontSize={'lg'}> Qoutes</Text>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You have not Made any requests<br/> <span style={{textDecoration:'1px solid underline'}}>start browsing</span> to make new qoutes to suppliers</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > Name </Th>
                            <Th > Industry </Th>
                            <Th > Annual volume </Th>
                            <Th > units  </Th>
                            <Th > status </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((item)=>{
                            return(
                                <Quote_Card item={item} key={item}/>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </TableContainer>
    )
}

const Quote_Card=(props)=>{
    const { item} = {...props};
    const router = useRouter();
    const toast = useToast();
    return(
        <Tr>
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}} onClick={(()=>{router.push(`/products/product?pid=${item.product_id}`)})}>{item?.product_name}</Td>
            <Td> {item?.industry}</Td>
            <Td> {item?.annual_volume}</Td>
            <Td> {item?.units}</Td>
            <Td> <Badge bgColor={item?.approval_status ? 'green' : 'orange'} color={item?.approval_status ? '#fff' : ''}>{item?.approval_status ? 'approved' : 'pending'}</Badge></Td>
        </Tr>
    )
}