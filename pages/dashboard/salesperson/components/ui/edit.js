import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Switch, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { UsedashboardContext } from "../../../../../components/Providers/dashboardContext";
import { useState } from "react";
import { Edit_Sale_Data } from "../../../../api/clients/salesperson/route.api";

export default function Edit_Sale(){
    const {sales_data,set_page} = UsedashboardContext();
    const DiscardDialog = useDisclosure();
    const toast = useToast();

    const [name_of_client,set_name_of_client]=useState(sales_data?.name_of_client);
    const [company_name_of_client,set_company_name_of_client]=useState(sales_data?.company_name_of_client);
    const [mobile_of_client,set_mobile_of_client]=useState(sales_data?.mobile_of_client);  
    const [email_of_client,set_email_of_client]=useState(sales_data?.email_of_client);
    const [location_of_client,set_location_of_client]=useState(sales_data?.location_of_client);
    /*product information*/
    const [name_of_product,set_name_of_product]=useState(sales_data?.name_of_product);
    const [volume_of_items,set_volume_of_items]=useState(sales_data?.volume_of_items);
    const [unit_price,set_unit_price]=useState(sales_data?.unit_price);
    const total = volume_of_items * unit_price
    /*payment & delivery info*/
    const [delivery_terms,set_delivery_terms]=useState(sales_data?.delivery_terms);
    const [payment_terms,set_payment_terms]=useState(sales_data?.payment_terms);
    const [delivery_date,set_delivery_date]=useState(sales_data?.delivery_date);
    const [publish_status,set_publish_status]=useState(sales_data?.publish_status);

    const [is_saving,set_is_saving]=useState(false);
    const [input_error,set_input_error]=useState(false);

    const Handle_Submit=async()=>{
        console.log(payload)
        set_is_saving(true);
        if (!name_of_product || !name_of_client || !company_name_of_client || !email_of_client || !mobile_of_client ){
           set_input_error(true);
           set_is_saving(false);
           return toast({title:'Error!',description:'Ensure all required inputs are filled',status:'error',position:'top-left',variant:'left-accent',isClosable:true})
        }
        if ((sales_data?.order_status !== 'under-review' || sales_data?.order_status !== 'completed' || sales_data?.order_status !== 'rejected' || sales_data?.order_status === 'pending') && !sales_data?.publish_status){
            await Edit_Sale_Data(payload).then((res)=>{
                toast({title:'Success!',description:'Sale saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
                set_page('Sales')
                return ;
            }).catch((err)=>{
                toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
                return ;
            }).finally(()=>{
                set_is_saving(false);
            });
        }
        if (sales_data?.order_status === 'pending' && sales_data?.publish_status){
            await Edit_Sale_Data(payload).then((res)=>{
                toast({title:'Success!',description:'Sale saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
                set_page('Sales')
                return ;
            }).catch((err)=>{
                toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
                return ;
            }).finally(()=>{
                set_is_saving(false);
            });
        }
        if ((sales_data?.order_status === 'under-review' || sales_data?.order_status === 'completed' || sales_data?.order_status === 'rejected') && sales_data?.publish_status){
            toast({title:'Error!',description:`This sale is published and either has been reviewed,completed or rejected and is not available for update. contact support by emailing us at @support@prokemia.com`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            set_is_saving(false);
            return ;
        }
    }
    

    const payload = {
        sale_id: sales_data?._id,
        //client-info
        name_of_client,
        company_name_of_client,
        mobile_of_client,
        email_of_client,
        location_of_client,
        //product info
        name_of_product,
        volume_of_items,
        unit_price,
        total,
        //payment&delivery
        delivery_date,
        delivery_terms,
        payment_terms,
        publish_status
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={'md'} boxShadow={'sm'} p='2' mb='2'>
                <Text fontSize={'xl'}>Edit sale</Text>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Sales')})}>Sales</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>{sales_data?._id}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Product Details</Text>
                    <Divider/>
                    <FormControl mt='2' isRequired isInvalid={input_error && name_of_product == '' ? true : false}>
                        <FormLabel>Name of product</FormLabel>
                        <Input value={name_of_product} placeholder='Name of the product' type='text' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
                        {input_error && name_of_product == '' ? 
                            <FormErrorMessage>Name of the product is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Quantity of products</FormLabel>
                        <NumberInput defaultValue={volume_of_items} min={1} onChange={((e)=>{set_volume_of_items(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Unit price</FormLabel>
                        <NumberInput defaultValue={unit_price} min={1} onChange={((e)=>{set_unit_price(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Client details</Text>
                    <Divider/>
                    <FormControl mt='2' isRequired isInvalid={input_error && name_of_client == '' ? true : false}>
                        <FormLabel>Name of client</FormLabel>
                        <Input value={name_of_client} placeholder='Name of the client' type='text' onChange={((e)=>{set_name_of_client(e.target.value)})}/>
                        {input_error && name_of_client == '' ? 
                            <FormErrorMessage>Name of the client is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2' isRequired isInvalid={input_error && company_name_of_client == '' ? true : false}>
                        <FormLabel>Company Name</FormLabel>
                        <Input value={company_name_of_client} placeholder='Name of the company' type='text' onChange={((e)=>{set_company_name_of_client(e.target.value)})}/>
                        {input_error && company_name_of_client == '' ? 
                            <FormErrorMessage>Name of the company is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2' isRequired isInvalid={input_error && email_of_client == '' ? true : false}>
                        <FormLabel>Company Email</FormLabel>
                        <Input value={email_of_client} placeholder='Email of the company' type='email' onChange={((e)=>{set_email_of_client(e.target.value)})}/>
                        {input_error && email_of_client == '' ? 
                            <FormErrorMessage>Email of the company is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2' isRequired isInvalid={input_error && mobile_of_client == '' ? true : false}>
                        <FormLabel>Company Mobile</FormLabel>
                        <Input value={mobile_of_client} placeholder='Mobile of the company' type='tel' onChange={((e)=>{set_mobile_of_client(e.target.value)})}/>
                        {input_error && mobile_of_client == '' ? 
                            <FormErrorMessage>Mobile of the company is required.</FormErrorMessage>
                        : (
                            null
                        )}
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Company Address</FormLabel>
                        <Input value={location_of_client} placeholder='Address of the company' type='tel' onChange={((e)=>{set_location_of_client(e.target.value)})}/>
                    </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Delivery details</Text>
                    <Divider/>
                    <FormControl mt='2'>
                        <FormLabel>Terms</FormLabel>
                        <Input value={delivery_terms} placeholder='' type="text" onChange={((e)=>{set_delivery_terms(e.target.value)})}/>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Payment terms</FormLabel>
                        <Input value={payment_terms} placeholder='' type="text" onChange={((e)=>{set_payment_terms(e.target.value)})}/>
                    </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Sale status</Text>
                    <Divider/>
                    <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                        <FormLabel htmlFor='short_on_expiry_status' mb='0'>
                            {publish_status? 'Sale has been published for review' : 'Sale is saved as a draft'}
                        </FormLabel>
                        <Switch id='short_on_expiry_status' onChange={(()=>{set_publish_status(!publish_status)})}/>
                    </FormControl>
                </Box>
                <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                    <Flex direction='column'>
                        <Text fontSize='14px'>- by creating this invoice you acknowledge that Prokemia will formally trade on behalf </Text>
                        <Text fontSize='14px'>- a 5% service fee will be charged for this process.</Text>
                    </Flex>
                    <Flex align='center' gap='2'>
                        <Text cursor={'pointer'} onClick={(()=>{DiscardDialog.onToggle()})}>Discard Changes</Text>
                        <AlertDiscardDialog DiscardDialog={DiscardDialog}/>
                        <Box mt='2' align='end' gap='2'>
                            <Tooltip hasArrow label='Save sale details' placement='auto'>
                                {is_saving? <Button variant='ghost' isLoading loadingText={publish_status? 'Publishing' : "Saving draft..."}/> : <Button ml={'2'} bg='#009393' color='#fff' onClick={Handle_Submit} >Save Sale</Button> }
                            </Tooltip>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

const AlertDiscardDialog=(props)=>{
    const {DiscardDialog} = {...props}
    const {set_page} = UsedashboardContext()
    const HandleClick=()=>{
        set_page('Sales');
        DiscardDialog.onClose();
    }
    return(
        <AlertDialog
            isOpen={DiscardDialog.isOpen}
            onClose={DiscardDialog.onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Discard Sale 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You cant undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={DiscardDialog.onClose}>
                            Cancel
                        </Button>
                        <Button bg='red.300' color='white' onClick={HandleClick} ml={3}>
                            Discard
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}