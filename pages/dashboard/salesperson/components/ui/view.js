import React from "react";
import { Text,  Box,  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Badge, Menu, MenuButton, MenuList, MenuItem, Button, HStack, Tag, TagLabel, TagCloseButton, Grid, Flex, Wrap, GridItem, Heading, VStack, Divider, useToast, Link, Tooltip, Avatar, Popover, Portal, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Icon, AbsoluteCenter } from '@chakra-ui/react';
//utils
import { UsedashboardContext } from "../../../../../components/Providers/dashboardContext.js";
import { IoIosArrowDown, IoMdCloudDownload } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline, MdEmail } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { RiAccountCircleLine, RiUserLocationLine } from "react-icons/ri";
import moment from "moment";
import { FaPhone } from "react-icons/fa";
import DeleteSale from "./delete_sale.ui.js";
import { Notification } from "./status_notification.js";
import { Create_Invoice_PDF } from "../../../../../hooks/sales.hook.js";

const ViewSale=()=>{
    const delete_sale_disclosure = useDisclosure();
    const {set_page,sales_data}= UsedashboardContext();
    const vat_total = sales_data?.total*0.16;
    const total = vat_total+sales_data?.total;

    const HandleeditSale=()=>{
        set_page('Edit_Sale');
    }

    const HandleDeleteSale=()=>{
        delete_sale_disclosure?.onToggle();
    }

    const HandleInvoiceDownload=()=>{
        const order_payload = {
            _id: sales_data?._id,
            //client-info
            name_of_client: sales_data?.name_of_client,
            company_name_of_client: sales_data?.company_name_of_client,
            mobile_of_client: sales_data?.mobile_of_client,
            email_of_client: sales_data?.email_of_client,
            location_of_client: sales_data?.location_of_client,
            //product info
            name_of_product: sales_data?.name_of_product,
            volume_of_items: sales_data?.volume_of_items,
            unit_price: sales_data?.unit_price,
            total: sales_data?.volume_of_items * sales_data?.unit_price,
            //payment&delivery
            createdAt:moment(sales_data?.createdAt).format("MMM Do YY"),
            delivery_date: moment(sales_data?.delivery_date).format("MMM Do YY"),
            delivery_terms: sales_data?.delivery_terms,
            payment_terms: sales_data?.payment_terms
        }
        Create_Invoice_PDF(order_payload)
    }

    return (
        <Box gap='2'>
            <Notification/>
            <Flex align='center' justify={'space-between'}>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Sales')})}>Sales</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>{sales_data?._id}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Menu>
                    <MenuButton>
                        <MenuButton colorScheme="teal" as={Button} rightIcon={<IoIosArrowDown />}> Actions </MenuButton>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<BiEdit />} onClick={HandleeditSale}>Edit Sale</MenuItem>
                        {sales_data?.order_status === 'pending' && !sales_data?.order_notification_status?
                            <MenuItem icon={<MdDeleteOutline />} onClick={HandleDeleteSale}>Delete Sale </MenuItem>
                            :
                            <MenuItem icon={<MdDeleteOutline />} opacity={'0.5'}>Delete Sale </MenuItem>
                        }
                        <DeleteSale delete_sale_disclosure={delete_sale_disclosure}/>
                    </MenuList>
                </Menu>
            </Flex>
            <Box alignItems='center' bg='#fff' my='2' p='2' borderRadius={5} boxShadow={'sm'}>
                <Heading>Order</Heading>
                <Text mt='1' fontWeight='bold' color='gray.400' fontSize='sm'>#{sales_data?._id}</Text>
                {sales_data?.publish_status? <Badge colorScheme="green" mr='2'>active</Badge> : <Badge colorScheme="orange" mr='2'>draft</Badge>}
                {sales_data?.order_status === 'completed'? <Badge colorScheme="green">{sales_data?.order_status}</Badge> : <Badge colorScheme="orange">{sales_data?.order_status}</Badge>}
                <HStack mt='1'>
                    <Icon as={IoCalendarOutline} boxSize={4} />
                    <Text fontSize={'sm'} mt='1'>{moment(sales_data?.createdAt).format("MMM Do YY")}</Text>
                </HStack>
            </Box>
            <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='4'>
                <GridItem colSpan={{ base: "5", md: "4", }}>
                    <Box bg='#fff' borderRadius={10} boxShadow={'sm'} p='4'>
                        <Text fontSize={'lg'} fontWeight={'bold'}>Details</Text>
                        <HStack justify={'space-between'} borderBottom={'2px'} borderColor={'gray.200'} borderStyle={'dashed'} py='6' px='4'>
                            <Text fontSize={'xl'} color='#009393' fontWeight={'bold'}>{sales_data?.name_of_product}</Text>
                            <HStack gap='8'>
                                <Text>x{sales_data?.volume_of_items}</Text>
                                <Text fontWeight={'bold'}>KES {sales_data?.unit_price}</Text>
                            </HStack>
                        </HStack>
                        <Box>
                            <HStack gap='2' w='full' justify={'space-between'} p='4'>
                                <Text fontWeight={'medium'} color='gray.400'>Subtotal</Text>
                                <Text fontWeight={'bold'}>KES {sales_data?.total}</Text>
                            </HStack>
                            <HStack gap='2' w='full' justify={'space-between'} p='4'>
                                <Text fontWeight={'medium'} color='gray.400'>vat (16%)</Text>
                                <Text fontWeight={'bold'} color='gray.400'>KES {vat_total}</Text>
                            </HStack>
                            <HStack gap='2' w='full' justify={'space-between'} p='4'>
                                <Text fontWeight={'medium'} color='gray.400'>Total</Text>
                                <Text fontWeight={'bold'}>KES {total}</Text>
                            </HStack>
                        </Box>
                    </Box>
                    <Box  bg='#fff' borderRadius={10} boxShadow={'sm'} p='4' mt='2'>
                        <Text fontSize={'lg'} fontWeight={'bold'}>Delivery Terms</Text>
                        <Text>{sales_data?.delivery_terms}</Text>
                        <HStack color='gray.400' fontSize={'sm'}>
                            <Text >Date:</Text>
                            <Text >{moment(sales_data?.delivery_date).format("MMM Do YY")}</Text>
                        </HStack>
                    </Box>
                    <Box  bg='#fff' borderRadius={10} boxShadow={'sm'} p='4' mt='2' >
                        <Text fontSize={'lg'} fontWeight={'bold'}>Payment</Text>
                        <Text>{sales_data?.payment_terms ? sales_data?.payment_terms : '-'}</Text>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: "5", md: "1", }}>
                    <Box bg='#fff' borderRadius={10} boxShadow={'sm'} p='4'>
                        <HStack justify={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'bold'}>Client Info</Text>
                        </HStack>
                        <HStack mt='2' gap='2'>
                            <Avatar name={sales_data?.company_name_of_client} size='sm' borderRadius={'md'}/>
                            <Text fontSize={'sm'}>{sales_data?.company_name_of_client? sales_data?.company_name_of_client : '-'}</Text>
                        </HStack>
                        <Box mt='2'>
                            <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                <Icon as={MdEmail} boxSize={4}/>
                                <Text >{sales_data?.email_of_client? sales_data?.email_of_client : '-'}</Text>
                            </HStack>
                            <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                <Icon as={RiAccountCircleLine} boxSize={4}/>
                                <Text >{sales_data?.name_of_client? sales_data?.name_of_client : '-'}</Text>
                            </HStack>
                            <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                <Icon as={FaPhone} boxSize={4}/>
                                <Text >{sales_data?.mobile_of_client? sales_data?.mobile_of_client : '-'}</Text>
                            </HStack>
                            <HStack mt='1' fontSize={'sm'} color='gray.500'>
                                <Icon as={RiUserLocationLine} boxSize={4}/>
                                <Text >{sales_data?.location_of_client? sales_data?.location_of_client : '-'}</Text>
                            </HStack>
                        </Box>
                    </Box>
                    <Box bg='#fff' borderRadius='5' p='4' mt='2'>
                        <HStack>
                            <Icon as={IoMdCloudDownload} boxSize={4}/>
                            <Text fontWeight='bold'>Download Invoice</Text>
                        </HStack>
                        <Box>
                            <Text>Invoice</Text>
                            <Text fontSize={'12px'}>Available on sale approval</Text>
                        </Box>
                        <Flex direction={'column'} gap='2' mt='2'>
                            {sales_data?.order_status === 'completed' ? 
                                <Button bg='#009393' color={'#fff'} leftIcon={<IoMdCloudDownload/>} onClick={HandleInvoiceDownload}>Download Invoice</Button>
                                : 
                                <Button bg='#009393' color={'#fff'} disabled leftIcon={<IoMdCloudDownload/>} >Download Invoice</Button>
                            }
                            <Box position='relative' padding='2'>
                                <Divider />
                                <AbsoluteCenter bg='white' px='4'>
                                    or
                                </AbsoluteCenter>
                            </Box>
                            {sales_data?.order_status === 'rejected' ? 
                                <Button bg='red.200' color={'#fff'}>Request Review</Button>
                                : 
                                null
                            }
                        </Flex>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default ViewSale