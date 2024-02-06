import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, Select, Switch, Text, Textarea, Tooltip, Wrap, useDisclosure, useToast } from "@chakra-ui/react"
import { useUserContext } from "../../../Providers/userContext"
import { Notification } from "../alert.ui";
// icons
import { MdPersonSearch } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// components
import { usedashboardContext } from "../../../Providers/dashboardContext";
import { Upload_documents } from "./documents";
// hooks
import { useIndustriesSrt } from "../../../../hooks/industries/useIndustriesSrt";
import { useTechnologiesSrt } from "../../../../hooks/technology/useTechnologiesSrt";
import { useDistributorSrt } from "../../../../hooks/distributor/useDistributorSrt";
import { useManufacturerSrt } from "../../../../hooks/manufacturer/useManufacturerSrt";
//api 
import { Add_Product } from "../../../../pages/api/product/route.api";


export const New_Product=()=>{
    const {user} = useUserContext();

    return(
        <Box p='2'>
            {(user?.suspension_status === true) || (user?.verification_status === false) || (user?.valid_email_status === false) ? <Notification /> : <Body/>}
        </Box>
    )
}

const Body=()=>{
    const toast = useToast();
    const {set_page} = usedashboardContext();
    const {user} = useUserContext();
    const distributor_action = useDisclosure();
    const manufactuer_action = useDisclosure();
    const expiry_action = useDisclosure();

    const [name_of_product,set_name_of_product]=useState('');
    const [email_of_lister,set_email_of_lister]=useState(user?.email_of_company);
    const [listed_by_id,set_listed_by_id]=useState(user?._id);
    const [short_on_expiry,set_short_on_expiry]=useState(false);
    const [short_on_expiry_date,set_short_on_expiry_date]=useState('');
    //manufacturer information
    const [manufactured_by,set_manufactured_by]=useState('');
    const [manufactured_by_id,set_manufactured_by_id]=useState('');
    //seller information
    const [distributed_by,set_distributed_by]=useState('');
    const [distributed_by_id,set_distributed_by_id]=useState('');
    //product information
    const [description_of_product,set_description_of_product]=useState('');
    const [chemical_name,set_chemical_name]=useState('');
    const [product_function,set_product_function]=useState('');
    const [brand,set_brand]=useState('');
    const [features_of_product,set_features_of_product]=useState('');
    const [application_of_product,set_application_of_product]=useState('');
    const [packaging_of_product,set_packaging_of_product]=useState('');
    const [storage_of_product,set_storage_of_product]=useState('');
    //category_of_product
    const [industry,set_industry]=useState('');
    const [technology,set_technology]=useState('');
    //website_link	
    const [website_link,set_website_link]=useState('');

    const [is_submitting,set_is_submitting]=useState(false);
    const [isfileupload,set_isfileupload]=useState(false);
    const [short_on_expiry_status_info, set_short_on_expiry_status_info]=useState(false);

    const [industries_data, set_industries_data]=useState([]);
    const [technologies_data, set_technologies_data]=useState([]);
    const [distributors_data,set_distributors_data]=useState([]);
    const [manufacturers_data,set_manufacturers_data]=useState([]);

    const [input_error,set_input_error]=useState(false);

    const payload = {
        name_of_product,
        manufactured_by,
        manufactured_by_id,
        distributed_by,
        distributed_by_id,
        listed_by_id ,
        description_of_product,
        chemical_name,
        function : product_function,
        brand,
        data_sheet_url:'',
        safety_data_sheet_url:'',
        formulation_document_url:'',
        features_of_product,
        application_of_product,
        packaging_of_product,
        storage_of_product,
        industry,
        technology,
        email_of_lister,
        short_on_expiry,
        short_on_expiry_date,
        website_link_to_Seller: website_link,
    }

    useEffect(()=>{
        if (user?.account_type === 'distributor'){
            set_distributed_by(user?.company_name);
            set_distributed_by_id(user?._id);
        }else if (user?.account_type === 'manufacturer'){
            set_manufactured_by(user?.company_name);
            set_manufactured_by_id(user?.id);
        }
    })
    useEffect(()=>{
        get_Distributors_Data()
    },[distributed_by])
    useEffect(()=>{
        get_Manufacturers_Data()
    },[manufactured_by])
    useEffect(()=>{
        get_Technologies_Data()
    },[technology])
    useEffect(()=>{
        get_Industries_Data()
    },[industry])

	async function get_Industries_Data(){
		let data = await useIndustriesSrt();
		set_industries_data(data)
	}

	async function get_Technologies_Data(){
		let data = await useTechnologiesSrt();
		set_technologies_data(data)
	}

	async function get_Distributors_Data(){
		let data = await useDistributorSrt();
		set_distributors_data(data)
	}

	async function get_Manufacturers_Data(){
		let data = await useManufacturerSrt();
		set_manufacturers_data(data)
	}
    const handle_add_new_product=async()=>{
        set_is_submitting(true);
        /**
         * handle_add_new_product: sends product payload to server to save product to db.
         * Props:
         * 		payload(obj): json data containing product details.
        */
        if (name_of_product === '' || industry === '' || technology === '' || manufactured_by === "" || distributed_by === "" || (short_on_expiry && short_on_expiry_date == '') ){
            /**
                Checks if the required fields have been filled and are not missing.
                Returns a alert modal to show the error.
            */
           set_input_error(true);
           set_is_submitting(false);
           return toast({title:'Error!',description:'Ensure all inputs are filled',status:'error',position:'top-left',variant:'left-accent',isClosable:true})
        }
        const response = await Add_Product(payload).then((res)=>{
                toast({title:'Success!',description:'Product saved successfully',status:'success',position:'top-left',variant:'left-accent',isClosable:true});
                Clean_input_data();
                const response = {
                    _id : res?.data?._id, //saved new_product id
                    status: 200
                }
                return response;
            }).catch((err)=>{
                toast({title:'Error!',description:`Something went wrong: ${err?.response?.data}`,status:'error',position:'top-left',variant:'left-accent',isClosable:true})
                const response = {
                    status: err.response.status
                }
                return response;
            }).finally(()=>{
                set_is_submitting(false);
            });
        return response;
    }
    const Clean_input_data=()=>{
        set_name_of_product('');
        set_short_on_expiry(false);
        set_short_on_expiry_date('');
        //manufacturer information
        set_manufactured_by('');
        set_manufactured_by_id('');
        //seller information
        set_distributed_by('');
        set_distributed_by_id('');
        //product information
        set_description_of_product('');
        set_chemical_name('');
        set_product_function('');
        set_brand('');
        set_features_of_product('');
        set_application_of_product('');
        set_packaging_of_product('');
        set_storage_of_product('');
        //category_of_product
        set_industry('');
        set_technology('');
        //website_link	
        set_website_link('');
        set_input_error(false);
        set_is_submitting(false);
    }
    return(
        <Box>
            <Box bg='#fff' borderRadius={'md'} boxShadow={'sm'} p='2' mb='2'>
                <Text fontSize={'xl'}>Create a New product</Text>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Inventory')})}>Inventory</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>New Product</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            {isfileupload?
                <Box bg='#fff' borderRadius={8} mt='4' p='4' py='4'>
                    <Text fontWeight={'bold'} fontSize={'2xl'} color='teal.400' >Documents</Text>
                    {/**
                     * 
                    */}
                    <Upload_documents set_isfileupload={set_isfileupload} handle_add_new_product={handle_add_new_product} uid={user?._id} />
                </Box>
                :
                <Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Details</Text>
                        <Divider/>
                        <FormControl mt='2' isRequired isInvalid={input_error && name_of_product == '' ? true : false}>
                            <FormLabel>Name</FormLabel>
                            <Input value={name_of_product} placeholder='Name of the product' type='text' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
                            {input_error && name_of_product == '' ? 
                                <FormErrorMessage>Name of the product is required.</FormErrorMessage>
                            : (
                                null
                            )}
                        </FormControl>
                        <FormControl mt='2' isRequired isInvalid={input_error && description_of_product == '' ? true : false}>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={description_of_product} type='text' placeholder='Give a detailed description of the product' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
                            {input_error && description_of_product == '' ?  <FormErrorMessage>Description of the product is required.</FormErrorMessage> : ( null )}
                        </FormControl>
                    </Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Listing details</Text>
                        <Divider/>
                        <Wrap mt='2'>
                            <FormControl isRequired isInvalid={input_error && manufactured_by == '' ? true : false}>
                                <FormLabel>Manufactured_by</FormLabel>
                                <Box>
                                    <HStack>
                                        <Input value={manufactured_by} type='text' placeholder='This product is manufactured by' onChange={((e)=>{set_manufactured_by(e.target.value);})}/>
                                        <IconButton colorScheme='teal' aria-label='Select supplier'  size='sm' icon={manufactuer_action?.isOpen? <IoClose/>:<MdPersonSearch />} onClick={manufactuer_action?.onToggle}/>
                                    </HStack>
                                    <Collapse in={manufactuer_action?.isOpen} animateOpacity>
                                        {manufacturers_data?.map((manufacturer)=>{
                                            return(
                                                <HStack  transition={'.3 ease-in-out'} _hover={{bg:'#eee',}} px='2' cursor={'pointer'} minH='48px' key={manufacturer?._id} onClick={(()=>{set_manufactured_by(manufacturer?.company_name);set_manufactured_by_id(manufacturer?._id);manufactuer_action?.onToggle()})}>
                                                    <Avatar boxSize='2rem' borderRadius='full' src={manufacturer?.profile_photo_url} name={manufacturer?.company_name} objectFit={'cover'} mr='12px'/>
                                                    <Text>{manufacturer.company_name}</Text>
                                                </HStack>
                                            )
                                        })}
                                    </Collapse>
                                </Box>
                                {input_error && manufactured_by == '' ?  <FormErrorMessage>A manufacturer account is required.</FormErrorMessage>: (null)}
                            </FormControl>
                            <FormControl isRequired isInvalid={input_error && distributed_by == '' ? true : false}>
                                <FormLabel>Distributed by</FormLabel>
                                <Box>
                                    <HStack>
                                        <Input value={distributed_by} type='text' placeholder='This product is distributed by' onChange={((e)=>{set_distributed_by(e.target.value);})}/>
                                        <IconButton colorScheme='teal' aria-label='Select supplier'  size='sm' icon={distributor_action?.isOpen? <IoClose/>:<MdPersonSearch />} onClick={distributor_action?.onToggle}/>
                                    </HStack>
                                    <Collapse in={distributor_action?.isOpen} animateOpacity>
                                        {distributors_data?.map((distributor)=>{
                                            return(
                                                <HStack  transition={'.3 ease-in-out'} _hover={{bg:'#eee',}} px='2' cursor={'pointer'} minH='48px' key={distributor?._id} onClick={(()=>{set_distributed_by(distributor?.company_name);set_distributed_by_id(distributor?._id);distributor_action?.onToggle()})}>
                                                    <Avatar boxSize='2rem' borderRadius='full' src={distributor?.profile_photo_url} name={distributor?.company_name} objectFit={'cover'} mr='12px'/>
                                                    <Text>{distributor.company_name}</Text>
                                                </HStack>
                                            )
                                        })}
                                    </Collapse>
                                </Box>
                                {input_error && distributed_by == '' ? <FormErrorMessage>A distributor account is required.</FormErrorMessage> : ( null )}
                            </FormControl>
                        </Wrap>
                    </Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Identification & Functionality</Text>
                        <Divider/>
                        <FormControl mt='2'>
                            <FormLabel>Brand name</FormLabel>
                            <Input value={brand} placeholder='Brand name' type="text" onChange={((e)=>{set_brand(e.target.value)})}/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Chemical Family</FormLabel>
                            <Input type='text' value={chemical_name} placeholder='Chemical Family' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
                        </FormControl>
                        <Flex mt='2' gap='2' flexDirection={{base:'column',md:'row'}}>
                            <FormControl isRequired isInvalid={input_error && industry == '' ? true : false}>
                                <FormLabel>Industry</FormLabel>
                                <Select value={industry} placeholder='select industry product will be categorized' onChange={((e)=>{set_industry(e.target.value)})}>
                                    {industries_data?.map((item)=>{
                                        return(
                                            <option key={item?._id} value={item?.title}>{item?.title}</option>
                                        )
                                    })}
                                </Select>
                                {input_error && industry == '' ? 
                                    <FormErrorMessage>A industry is required.</FormErrorMessage>
                                : (
                                    null
                                )}
                            </FormControl>
                            <FormControl isRequired isInvalid={input_error && technology == '' ? true : false}>
                                <FormLabel>Technology</FormLabel>
                                <Select value={technology} placeholder='select technology product will be categorized' onChange={((e)=>{set_technology(e.target.value)})} >
                                    {technologies_data?.map((item)=>{
                                        return(
                                            <option key={item?._id} value={item?.title}>{item?.title}</option>

                                        )
                                    })}
                                </Select>
                                {input_error && technology == '' ? 
                                    <FormErrorMessage>A technology is required.</FormErrorMessage>
                                : (
                                    null
                                )}
                            </FormControl>
                        </Flex>
                    </Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Application & Uses</Text>
                        <Divider/>
                        <FormControl mt='2'>
                            <FormLabel>Function</FormLabel>
                            <Textarea type='text' value={product_function} placeholder='function of the product' onChange={((e)=>{set_product_function(e.target.value)})}/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Applications</FormLabel>
                            <Textarea type='text' value={application_of_product} placeholder='application of the product' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Features and Benefits</FormLabel>
                            <Textarea type='text' value={features_of_product}  placeholder='Features of the product' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
                        </FormControl>
                    </Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Regulatory and compliance</Text>
                        <Divider/>
                        <FormControl mt='2'>
                            <FormLabel>Packaging & availability</FormLabel>
                            <Textarea type='text' value={packaging_of_product} placeholder='packaging availability of the product' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Storage & Handling</FormLabel>
                            <Textarea type='text' value={storage_of_product} placeholder='storage and handling  of the product' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
                        </FormControl>
                        {short_on_expiry_status_info?
                            <Alert status='info' mt='2'>
                                <AlertIcon />
                                <AlertTitle>Short on expiry status!</AlertTitle>
                                <AlertDescription>
                                    Toggling this button will list the product as expiring soon.
                                </AlertDescription>
                            </Alert>
                            :
                            null
                        }
                        <FormControl display='flex' alignItems='center' mt='4' gap='2'>
                            <Icon as={FaInfoCircle} cursor='pointer' onClick={(()=>{set_short_on_expiry_status_info(!short_on_expiry_status_info)})}/>
                            <FormLabel htmlFor='short_on_expiry_status' mb='0'>
                                List this product as short on expiry
                            </FormLabel>
                            <Switch id='short_on_expiry_status' onChange={(()=>{set_short_on_expiry(!short_on_expiry);set_short_on_expiry_date('');expiry_action?.onToggle()})}/>
                        </FormControl>
                        <Collapse in={expiry_action?.isOpen} animateOpacity>
                            <FormControl mt='2' isRequired isInvalid={input_error && short_on_expiry_date == '' &&  short_on_expiry ? true : false}>
                                <FormLabel>Short on expiry date</FormLabel>
                                <Input type='date' value={short_on_expiry_date} placeholder='storage and handling  of the product' onChange={((e)=>{set_short_on_expiry_date(e.target.value)})}/>
                                {input_error && short_on_expiry_date == '' &&  short_on_expiry ? 
                                    <FormErrorMessage>An expiration date is required.</FormErrorMessage>
                                : (
                                    null
                                )}
                            </FormControl>
                        </Collapse>
                    </Box>
                    <Box bg='#fff' borderRadius={8} mt='4' p='4'>
                        <Text fontWeight={'bold'} fontSize={'lg'} color='#009393'>Company external details</Text>
                        <Divider/>
                        <FormControl mt='2'>
                            <FormLabel>Website link</FormLabel>
                            <InputGroup size='sm'>
                                <InputLeftAddon children='https://' />
                                <Input type='url' value={website_link} placeholder='mysite' onChange={((e)=>{set_website_link(e.target.value)})}/>
                            </InputGroup>
                        </FormControl>
                    </Box>
                    <Box mt='2' align='end' gap='2'>
                        <Tooltip hasArrow label='proceed to add documents' placement='auto' >
                            {is_submitting? <Button variant='ghost' isLoading loadingText="Saving ..."/> : <Button bg='gray.400' color='#fff' onClick={(()=>{set_isfileupload(true)})}>Add documents</Button>}
                        </Tooltip>
                        <Tooltip hasArrow label='Save product details and add files later' placement='auto'>
                            {is_submitting? <Button variant='ghost' isLoading loadingText="Saving ..."/> : <Button ml={'2'} bg='#009393' color='#fff' onClick={handle_add_new_product} >Save product</Button> }
                        </Tooltip>
                    </Box>
                </Box>
            }
        </Box>
    )
}