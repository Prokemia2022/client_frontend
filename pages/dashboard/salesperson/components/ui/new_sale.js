import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Text, Textarea, Tooltip, Wrap, useDisclosure, useToast } from "@chakra-ui/react"
import { Notification } from "../../../../../components/ui/Dashboard/alert.ui";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../../../components/Providers/userContext";
import { UsedashboardContext } from "../../../../../components/Providers/dashboardContext";
import Create_Sale from "../../../../api/clients/salesperson/route.api";

export default function New_Sale(){
    const {user} = useUserContext();
    return(
        <Box p='2'>
            {(user?.suspension_status === true) || (user?.verification_status === false) || (user?.valid_email_status === false) ? <Notification /> : <Body/>}
        </Box>
    )
}

const Body=()=>{
    const toast = useToast();
    const {set_page} = UsedashboardContext();
    const DiscardDialog = useDisclosure()
    const {user} = useUserContext();

    const [name_of_client,set_name_of_client]=useState('');
    const [company_name_of_client,set_company_name_of_client]=useState('');
    const [mobile_of_client,set_mobile_of_client]=useState('');    
    const [email_of_client,set_email_of_client]=useState('');
    const [location_of_client,set_location_of_client]=useState('');
    /*product information*/
    const [name_of_product,set_name_of_product]=useState('');
    const [volume_of_items,set_volume_of_items]=useState(1);
    const [unit_price,set_unit_price]=useState(1);
    const total = volume_of_items * unit_price
    /*payment & delivery info*/
    const [delivery_terms,set_delivery_terms]=useState('');
    const [payment_terms,set_payment_terms]=useState('');
    const [delivery_date,set_delivery_date]=useState('');
    const [publish_status,set_publish_status]=useState(false);

    const salesperson_name = user?.first_name + ' ' + user?.last_name

    const payload = {
      //creator-info
      creator_id: user?._id,
      creator_name: salesperson_name,
      email_of_creator: user?.email_of_salesperson,
      mobile_of_creator: user?.mobile_of_salesperson,
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

    const [is_saving,set_is_saving]=useState(false);
    const [input_error,set_input_error]=useState(false);

    const Handle_Submit=async()=>{
        set_is_saving(true);
        if (!name_of_product || !name_of_client || !company_name_of_client || !email_of_client || !mobile_of_client ){
           set_input_error(true);
           set_is_saving(false);
           return toast({title:'Error!',description:'Ensure all inputs are filled',status:'error',position:'top-left',variant:'left-accent',isClosable:true})
        }
        await Create_Sale(payload).then((res)=>{
            toast({title:'Success!',description:'Sale saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
            Clean_input_data();
            return ;
        }).catch((err)=>{
            toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
            return ;
        }).finally(()=>{
            set_is_saving(false);
        });
    }
    const Clean_input_data=()=>{
		//client-info
		set_name_of_client('');
		set_company_name_of_client('');
		set_mobile_of_client('');
		set_email_of_client('');
		set_location_of_client('');
		//product info
		set_name_of_product('');
		set_volume_of_items(1);
		set_unit_price(1);
		//payment&delivery
		set_delivery_date('');
		set_delivery_terms('');
		set_payment_terms('');
        set_input_error(false);
        set_publish_status(false)
	}
    return(
        <Box>
            <Box bg='#fff' borderRadius={'md'} boxShadow={'sm'} p='2' mb='2'>
                <Text fontSize={'xl'}>Create a New sale</Text>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Sales')})}>Sales</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>New sale</BreadcrumbLink>
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
                        <NumberInput defaultValue={1} min={1} onChange={((e)=>{set_volume_of_items(e)})}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel>Unit price</FormLabel>
                        <NumberInput defaultValue={1} min={1} onChange={((e)=>{set_unit_price(e)})}>
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
                            {!publish_status? 'Save as draft' : 'Sale will be active'}
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
                        <Text cursor={'pointer'} onClick={(()=>{DiscardDialog.onToggle()})}>Discard</Text>
                        <AlertDiscardDialog DiscardDialog={DiscardDialog} Clean_input_data={Clean_input_data}/>
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
        props.Clean_input_data();
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