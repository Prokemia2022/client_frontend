import React, { useEffect, useState } from "react";
import { Text,  Box,  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Input, InputGroup, InputLeftElement, SimpleGrid, InputRightElement, CircularProgress, Tag, TagLabel, Flex, Wrap, Accordion, AccordionItem, Avatar, AccordionIcon, AccordionPanel, AccordionButton, useToast } from '@chakra-ui/react';
//utils
//icons
import { MdAdd,MdSearch,MdDeleteSweep,MdPhone,MdEmail } from "react-icons/md";
//apis
//modals
import AddNewManufacturer from '../../../components/modals/addNewManufacturer.js';
import { useUserContext } from "../../../components/Providers/userContext.js";
import { usedashboardContext } from "../../../components/Providers/dashboardContext.js";
import { Delete_Manufacturer_Distributor, Edit_Manufacturer_Distributor } from "../../api/supplier/distributor/route.api.js";

export default function Manufacturers(){
    const {user} = useUserContext();
    const {set_page} = usedashboardContext()
    const [manufacturers,set_manufacturers]=useState(user?.manufacturers);

	const [search_query,set_search_query] = useState('');

    const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);

    let [is_fetching,set_is_fetching]=useState(false);

    const id = user?._id
    useEffect(()=>{

        set_is_fetching(true)
        if(search_query !== ''){
            const results = user?.manufacturers?.filter((item)=> item.name.toLowerCase().includes(search_query.toLowerCase()));
            set_manufacturers(results)
        }else{
            set_manufacturers(user?.manufacturers)
        }
        setTimeout(()=>{
            set_is_fetching(false);
        },500)
    },[search_query])

    const Clear_Filter_Options=()=>{
		set_search_query('');
	}

    return (
        <Box gap='2'>
            <AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible} id={id}/>
            <HStack justifyContent={'space-between'}>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'sm'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Home')})}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>manufacturers</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Button colorScheme="teal" leftIcon={<MdAdd />} onClick={(()=>{setisaddnewmanufacturerModalvisible(true)})}>New Manufacturer</Button>
            </HStack>
            <Box gap='2' bg='#fff' borderRadius={5} p='4' mt='2'>
                <SimpleGrid minChildWidth='250px' spacing='20px' mt='4'>
                    <InputGroup alignItems={'center'}>
                        <InputLeftElement pointerEvents='none' color='gray' alignItems={'center'}>
                            <MdSearch style={{marginTop:'8px'}} />
                        </InputLeftElement>
                        <Input type='text' placeholder='Search...' size='lg' value={search_query} onChange={((e)=>{set_search_query(e.target.value)})}/>
                        {is_fetching? 
                            <InputRightElement>
                                <CircularProgress isIndeterminate color='gray' size={'20px'} />
                            </InputRightElement>
                            :
                            null
                        }
                    </InputGroup>
                </SimpleGrid>
                <Wrap align='center' spacing='20px' mt='4'>
                    <Flex fontSize={'sm'}>
                        <Text fontWeight='bold' color='gray.800'>{user?.manufacturers?.length}</Text>
                        <Text fontWeight='light' color='gray.400'>results found</Text>
                    </Flex>
                    {search_query !== ''? 
                        <Tag  onClick={Clear_Filter_Options} size='lg' gap='1' _hover={{bg:'red.100'}} bg='gray:200' color='red' borderRadius='md' cursor={'pointer'}>
                            <MdDeleteSweep/>
                            <TagLabel>clear</TagLabel>
                        </Tag>
                        :
                        null
					}
                </Wrap>
                <Accordion allowToggle>
                {user?.manufacturers?.filter((item)=> item.name.toLowerCase().includes(search_query.toLowerCase())).map((item,index)=>{
                        return(
                        <AccordionItem key={index}>
                            <AccordionButton>
                                <HStack justify='space-between' flex='1'>
                                    <HStack flex='1'>
                                        <Avatar name={item.name} size='md'/>
                                        <Box align='start'>
                                            <Text fontWeight='bold' fontSize='lg'>{item.name}</Text>
                                            <Text fontSize='sm' color='gray.400'>{item.email}</Text>
                                        </Box>
                                    </HStack>
                                    <AccordionIcon />
                                </HStack>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Manufacturer key={item?._id} item={item} id={user?._id}/>
                            </AccordionPanel>
                        </AccordionItem>
                        )
                    })}
                </Accordion>
            </Box>
        </Box>
    )
}

const Manufacturer=({item,id})=>{
	const toast = useToast();
	const [is_verify,set_is_verify]=useState(false);
	const [is_edit,set_is_edit]=useState(false);
	const [u_name,set_u_name]=useState(item?.name)
	const [u_email,set_u_email]=useState(item?.email)
	const [u_mobile,set_u_mobile]=useState(item?.mobile)

	const payload = {
		name : item?.name,
		_id : id
	}
	const handle_delete_manufacturer=async()=>{
		await Delete_Manufacturer_Distributor(payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been removed successfully`,
				status: 'success',
				isClosable: true,
			});
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err?.response?.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const handle_edit_manufacturer=async()=>{
		const edit_payload = {
			_id : id,
			prev_name: item?.name,
			name : u_name,
			email: u_email,
			mobile: u_mobile,
		}

		await Edit_Manufacturer_Distributor(edit_payload).then(()=>{
			toast({
				title: '',
				description: `${payload.name} has been edited successfully`,
				status: 'success',
				isClosable: true,
			});
		}).catch((err)=>{
            console.log(err)
			toast({
				title: '',
				description: `${err?.response?.data}`,
				status: 'error',
				isClosable: true,
			});
		})
		set_is_edit(false)
	}
	return(
		<Flex p='2' direction='column' >
			{is_verify?
				<Flex direction='column'>
					<Text fontSize='24px' fontWeight='bold'>{item?.name}</Text>
					<Text color='grey'>Are you sure you want to remove this manufacturer?</Text>
					<Flex gap='2'>						
						<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={handle_delete_manufacturer}>Remove Manufacturer</Button>
						<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_verify(false)})}>Cancel</Button>
					</Flex>
				</Flex>
			:
				<Flex direction='column' gap='2'>
					{is_edit?
						<>
							<Flex direction='column'>
								<Text>Name</Text>
								<Input type='text' placeholder={item?.name} variant='filled' onChange={((e)=>{set_u_name(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Email:</Text>
								<Input type='Email' placeholder={item?.email} variant='filled' onChange={((e)=>{set_u_email(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Mobile</Text>
								<Input type='tel' placeholder={item?.mobile} variant='filled' onChange={((e)=>{set_u_mobile(e.target.value)})}/>
							</Flex>
							<Flex gap='2' align='center'>
								<Button bg='#009393' color='#fff' onClick={handle_edit_manufacturer}>Edit Manufacturer</Button>
								<Button bg='#fff' color='#000' border='1px solid #000' cursor='pointer' onClick={(()=>{set_is_edit(false)})}>Cancel</Button>
						    </Flex>
						</>
					:
						<>
                            <HStack alignItems='center' mt='2'>
                                <MdEmail style={{fontSize:'16'}}/>
                                <Text fontSize='sm'>{item?.email ? item?.email : '-'}</Text>
                            </HStack>
                            <HStack alignItems='center' mt='3'>
                                <MdPhone style={{fontSize:'16'}}/>
                                <Text fontSize='sm' fontWeight='light'>{item?.mobile ? item?.mobile : '-'}</Text>
                            </HStack>
							<Flex gap='2' align='center'>
								<Button bg='#009393' color='#fff' cursor='pointer' onClick={(()=>{set_is_edit(true)})}>Edit</Button>
								<Button bg='#fff' border='1px solid red' color='red' cursor='pointer' onClick={(()=>{set_is_verify(true)})}>Remove</Button>
						    </Flex>
						</>
					}
				</Flex>
			}
		</Flex>
	)
}