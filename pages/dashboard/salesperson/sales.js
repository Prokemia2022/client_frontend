import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Tag, TagLabel, Text, Wrap } from "@chakra-ui/react"
import { IoIosAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { UsedashboardContext } from "../../../components/Providers/dashboardContext";
import { useUserContext } from "../../../components/Providers/userContext";
import { Sales_Table } from "./components/ui/sales_table";

export default function Sales(){
    const {set_page} = UsedashboardContext();
    const HandleAddSales=()=>{
        set_page('New_Sales');
    }

    return(
        <Box gap='2'>
            <HStack justifyContent={'space-between'} align={'center'} bg='#fff' p='2' px='4' boxShadow={'sm'} borderRadius={'md'} mb='2'>
                <Box>
                    <Heading as='h4'>Sales</Heading>
                    <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={''}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={(()=>{set_page('Home')})}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>sales</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>
                <Button colorScheme="teal" leftIcon={<IoIosAdd />} onClick={HandleAddSales}> New Sale </Button>
            </HStack>
            <Box w='full' bg='#fff' p='2' borderRadius={'md'} boxShadow={'sm'}>
                <Sales_Table />
            </Box>
        </Box>
    )
}