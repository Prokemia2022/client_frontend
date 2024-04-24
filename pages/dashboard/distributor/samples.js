import {Badge, Center, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast, Flex, HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FaFileCsv, FaFolderOpen } from "react-icons/fa";
import { useUserContext } from "../../../components/Providers/userContext";
import { FetchSamplesByLister } from "../../api/call_to_action/sample.api";
import View_Sample_Request from "./uicomponents/viewsamplerequest";
import { GoLinkExternal } from "react-icons/go";

import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";

export default function Samples(){
    const [data, set_data]=useState([]);
    const {user} = useUserContext()
    useEffect(()=>{
        fetchdata()
    },[])
    async function fetchdata(){
        const result= await FetchSamplesByLister(user?._id);
        set_data(result.data)
    }

    const headers = [
        { label: "Product", key: "product" },
        { label: "Industry", key: "industry" },
        { label: "Technology", key: "technology" },
        { label: "Supplier", key: "supplier" },
        { label: "Client", key: "client" },
        { label: "Email", key: "email" },
        { label: "Mobile", key: "mobile" },
        { label: "Application", key: "application" },
        { label: "Sample Quantity", key: "number_of_samples" },
        { label: "Annual Volume", key: "annual_volume" },
        { label: "Units", key: "units" },
        { label: "Last follow up date", key: "follow_up_date" },
        { label: "Follow up Remarks", key: "follow_up_remarks" },
        { label: "Sample period", key: "follow_up_sampling_period" },
        { label: "Sample price", key: "follow_up_sampling_price" },
        { label: "Sample status", key: "sample_status_stage" },
        { label: "Sample remark", key: "sample_status_comment" },
    ];
    const TempCSVArr= data?.map((item)=>{
        return (
            {
                product: item?.product_details?.name_of_product,
                industry: item?.industry,
                technology: item?.technology,
                supplier: item?.lister_details?.company_name,
                client: item?.client_details?.company_name,
                email: item?.client_details?.email_of_company,
                mobile: item?.client_details?.mobile_of_company,
                application: item?.description,
                number_of_samples: item?.number_of_samples,
                annual_volume: item?.annual_volume,
                units: item?.units,
                follow_up_date: moment(item?.follow_up_date).format("MMM Do YY"),
                follow_up_remarks: item?.follow_up_remarks,
                follow_up_sampling_period: item?.follow_up_sampling_period,
                follow_up_sampling_price: item?.follow_up_sampling_price,
                sample_status_stage: item?.sample_status_stage,
                sample_status_comment: item?.sample_status_comment,
            }
        )
    })
    console.log(TempCSVArr);
    return(
        <TableContainer bg='#fff' mt='4' borderRadius={5} boxShadow={'md'}>
            <Flex justify='space-between' align='center' pr='4'>
                <Text p='4' fontSize={'lg'}> Samples</Text>
                <CSVLink data={TempCSVArr} headers={headers}>
                    <HStack spacing='2' bg='#009393' p='1' color='#FFF' borderRadius={'sm'}>
                        <Icon as={FaFileCsv} boxSize={'5'}/>
                        <Text fontWeight={'bold'} fontSize={'sm'}>Export</Text>
                    </HStack>
                </CSVLink>
            </Flex>
            {data?.length == 0? 
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={FaFolderOpen} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You do not have any requests<br/> We will notify you once there are new samples request from your customers</Text>
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
    const edit_sample_drawer_disclosure = useDisclosure()
    return(
        <Tr>
            <Td color='#009393' _hover={{ textDecoration:'underline dotted', cursor:'pointer'}} onClick={(()=>{router.push(`/products/product?pid=${item?.product_details?._id}`)})}>{item?.product_details?.name_of_product}</Td>
            <Td> {item?.industry}</Td>
            <Td> {item?.number_of_samples}</Td>
            <Td> {item?.annual_volume}</Td>
            <Td> {item?.units}</Td>
            <Td> <Badge colorScheme={item?.sample_status && item?.sample_status_stage === 'completed' ? 'green' : 'orange'}>{item?.sample_status_stage}</Badge></Td>
            <Td> <Icon as={GoLinkExternal} boxSize={4} color={'#000'} cursor='pointer' onClick={(()=>{view_sample_drawer_disclosure.onToggle()})}/> </Td>
            <View_Sample_Request view_drawer_disclosure={view_sample_drawer_disclosure} edit_drawer_disclosure={edit_sample_drawer_disclosure} sample_data={item}/>
        </Tr>
    )
}