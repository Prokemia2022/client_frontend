import {Badge, Center, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { useUserContext } from "../../../components/Providers/userContext";
import { FetchSamplesByRequester } from "../../api/call_to_action/sample.api";
import { GoLinkExternal } from "react-icons/go";
import View_Sample_Request from "../distributor/uicomponents/viewsamplerequest";

export default function Samples(){
    const [data, set_data]=useState([]);
    const {user} = useUserContext()
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        const result= await FetchSamplesByRequester(user?._id);
        set_data(result.data)
    }
    return(
        <TableContainer bg='#fff' mt='4' borderRadius={5} boxShadow={'md'}>
            <Text p='4' fontSize={'lg'}> Samples</Text>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You have not Made any requests<br/> <span style={{textDecoration:'1px solid underline'}}>start browsing</span> to make request samples from suppliers</Text>
                </Center>
            :
                <Table variant='simple'>
                    <Thead bg='#eee' borderRadius={'5'}>
                        <Tr>
                            <Th > Name </Th>
                            <Th > Industry </Th>
                            <Th > Samples </Th>
                            <Th > Annual volume </Th>
                            <Th > units  </Th>
                            <Th > status </Th>
                            <Th >  </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((item)=>{
                            return(
                                <Sample_Card item={item} key={item}/>
                            )
                        })}
                    </Tbody>
                </Table>
            }
        </TableContainer>
    )
}

const Sample_Card=(props)=>{
    const { item} = {...props};
    const router = useRouter();
    const view_sample_drawer_disclosure = useDisclosure()
    return(
        <Tr>
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}} onClick={(()=>{router.push(`/products/product?pid=${item.product_details?._id}`)})}>{item?.product_details?.name_of_product}</Td>
            <Td> {item?.industry}</Td>
            <Td> {item?.number_of_samples}</Td>
            <Td> {item?.annual_volume}</Td>
            <Td> {item?.units}</Td>
            <Td> {item?.sample_status && item?.sample_status_stage === 'completed'? <Badge colorScheme="green">{item?.sample_status_stage}</Badge> : <Badge colorScheme="orange">{item?.sample_status_stage}</Badge>}</Td>
            <Td> <Icon as={GoLinkExternal} boxSize={4} color={'#000'} cursor='pointer' onClick={(()=>{view_sample_drawer_disclosure.onToggle()})}/> </Td>
            <View_Sample_Request view_drawer_disclosure={view_sample_drawer_disclosure} sample_data={item}/>
        </Tr>
    )
}