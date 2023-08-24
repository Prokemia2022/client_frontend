import React, { useState } from 'react';
import { 
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box, 
    Button, 
    Flex, 
    Grid, 
    GridItem, 
    HStack, 
    Input, 
    Skeleton, 
    Stat, 
    StatArrow, 
    StatGroup, 
    StatHelpText, 
    StatLabel, 
    StatNumber,
    Text,
    Textarea,
    Tooltip,
    useToast
} from '@chakra-ui/react';
//utilities
import moment from 'moment';
//icons
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PhoneIcon from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LockIcon from '@mui/icons-material/Lock';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

import Suggest_Industry from '../api/control/suggest_industry.js';
import Suggest_Technology from '../api/control/suggest_technology.js';

export default function Dashboard({client_data,set_current_page}) {
    //category suggestion form visibility handlers.
	const [_suggest_new_ind,set_suggest_new_ind]=useState(false);
	const [_suggest_new_technology,set_suggest_new_technology]=useState(false);
  return (
    <Box mt='2'>
        <HStack bg='#fff' p='4' alignItems='center' borderRadius={'md'} boxShadow={'sm'}>
            <Avatar 
                size={{
                    base:'lg',
                    md:'2xl'
                }} 
                mr='4'
                src={client_data?.profile_photo_url}
                name={client_data?.company_name}
            >
                {client_data?.subscription?
                    <Tooltip label='your account is featured'>
                        <StarRateRoundedIcon style={{fontSize:'0.7em',padding:'0.1em',position:'absolute',bottom:"10px",right:'-5px',backgroundColor:"gold",borderRadius:'20px',color:'teal',cursor:'pointer'}}/>
                    </Tooltip>
                    :
                    null
                }
            </Avatar>
            <Box >
                <Text 
                    fontSize={{
                        base:'lg',
                        md:'xl'
                    }} 
                    fontWeight='bold'
                >
                    {client_data?.company_name ? client_data?.company_name : '-'}
                </Text>
                <Text
                    fontSize={{
                        base:'8px',
                        md:'md'
                    }} 
                >
                    {client_data?.email_of_company ? client_data?.email_of_company : '-'}
                </Text>
                <Text
                    fontSize={{
                        base:'sm',
                        md:'md'
                    }} 
                >
                    {client_data?.address_of_company ? client_data?.address_of_company : '-'}
                </Text>
            </Box>
        </HStack>
        <Grid
            templateColumns='repeat(5, 1fr)'
            gap={4}
            mt='4'
        >
            <GridItem 
                colSpan={{
                    base: "5",
                    md: "1",
                }} 
            >
                <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                    <Text fontWeight='bold' fontSize='lg'>About</Text>
                    <Text>{client_data?.description ? client_data?.description : '-'}</Text>
                </Box>
                <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                    <Text fontWeight='bold' fontSize='lg'>Company Profile</Text>
                    <HStack alignItems='center' mt='2'>
                        <EmailIcon/>
                        <Text fontSize='sm'>{client_data?.email_of_company ? client_data?.email_of_company : '-'}</Text>
                    </HStack>
                    <HStack alignItems='center' mt='3'>
                        <PhoneIcon/>
                        <Text fontSize='sm' fontWeight='light'>{client_data?.mobile_of_company ? client_data?.mobile_of_company : '-'}</Text>
                    </HStack>
                    <HStack alignItems='center' mt='3'>
                        <FmdGoodIcon/>
                        <Text fontSize='sm' fontWeight='light'>{client_data?.address_of_company ? client_data?.address_of_company : '-'}</Text>
                    </HStack>
                    <HStack alignItems='center' mt='2'>
                        <InsertInvitationIcon/>
                        <Text fontSize='sm' fontWeight='light'>{moment( client_data?.joined_in).format("MMM Do YY")}</Text>
                    </HStack>
                </Box>
                <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                    <Text fontWeight='bold' fontSize='lg'>Account handler</Text>
                    <HStack alignItems='center' mt='2'>
                        <PersonIcon/>
                        <Text fontSize='sm' fontWeight='light'>{client_data?.contact_person_name ? client_data?.contact_person_name : '-'}</Text>
                    </HStack>
                    <HStack alignItems='center' mt='2'>
                        <EmailIcon/>
                        <Text fontSize='sm'>{client_data?.contact_email ? client_data?.contact_email : '-'}</Text>
                    </HStack>
                    <HStack alignItems='center' mt='3'>
                        <PhoneIcon/>
                        <Text fontSize='sm' fontWeight='light'>{client_data?.contact_mobile ? client_data?.contact_mobile : '-'}</Text>
                    </HStack>
                </Box>
            </GridItem>
            {!client_data?.valid_email_status || !client_data?.verification_status? 
                <GridItem 
                    colSpan={{
                        base: "5",
                        md: "4",
                    }}
                > 
                    <Skeleton 
                        h='full'
                        borderRadius='md'
                    >
                        <div>contents wrapped</div>
                        <div>won't be visible</div>
                    </Skeleton>
                </GridItem>
                :
                <GridItem 
                    colSpan={{
                        base: "5",
                        md: "4",
                    }}
                >
                    <StatGroup bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                        <Stat>
                            <HStack color={client_data?.subscription? 'black':'gray.400'}>
                                {client_data?.subscription?
                                    null
                                    :
                                    <Tooltip label='you need to upgrade to see how your account is perfoming'>
                                        <LockIcon fontSize='20'/>
                                    </Tooltip>
                                }
                                <StatLabel>Products stats</StatLabel>
                            </HStack>
                            {client_data?.subscription?
                                <Box>
                                    <StatNumber>-</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='increase' />
                                            5.36%
                                    </StatHelpText>
                                </Box>
                                :
                                <Skeleton height='40px' w='100px'>
                                    <StatNumber>345,670</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='increase' />
                                        23.36%
                                    </StatHelpText>
                                </Skeleton>
                            }
                        </Stat>
                        <Stat>
                            <HStack color={client_data?.subscription? 'black':'gray.400'}>
                                {client_data?.subscription?
                                    null
                                    :
                                    <Tooltip label='you need to upgrade to see how your account is perfoming'>
                                        <LockIcon fontSize='20'/>
                                    </Tooltip>
                                }
                                <StatLabel>Profile stats</StatLabel>
                            </HStack>
                            {client_data?.subscription?
                                <Box>
                                    <StatNumber>{client_data?.views ===  0? '0' : client_data?.views}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='increase' />
                                            1.36%
                                    </StatHelpText>
                                </Box>
                                :
                                <Skeleton height='40px' w='100px'>
                                    <StatNumber>{client_data?.views ===  0? '0' : client_data?.views}</StatNumber>
                                    <StatHelpText>
                                        <StatArrow type='increase' />
                                        1.36%
                                    </StatHelpText>
                                </Skeleton>
                            }
                        </Stat>
                    </StatGroup>
                    <Box bg='#fff' p='4'>
                        <Text mb='0'>Operating in an industry or Technology not included in our options?</Text>
                        {_suggest_new_ind || _suggest_new_technology ? 
                            <>	
                                {_suggest_new_ind ? 
                                    <Suggest_New_Industry set_suggest_new_ind={set_suggest_new_ind}/> 
                                    : 
                                    <Suggest_New_Technology set_suggest_new_technology={set_suggest_new_technology}/>
                                } 
                            </>
                            :
                            <Flex cursor='pointer' gap='2' direction='column'>
                                <Text color='#009393' onClick={(()=>{set_suggest_new_ind(true)})}>Suggest a new Industry</Text>
                                <Text color='#009393' onClick={(()=>{set_suggest_new_technology(true)})}>Suggest a new Technology</Text>
                            </Flex>
                        }
                    </Box>
                    <Box
                        p='4'
                        bg='#fff'
                        borderRadius='md'
                        boxShadow='sm'
                        mt='2'      
                    >
                        <HStack justify={'space-between'}>
                            <Text fontWeight='bold' fontSize='lg'>Experts</Text>
                            {client_data?.experts?.length > 1 ? (
                                <Text onClick={(()=>set_current_page('experts'))}>see all</Text>
                                )
                                 : null
                            }
                        </HStack>
                        <Accordion allowToggle>
                            {client_data?.experts?.slice(0,1).map((item,index)=>{
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
                                            <HStack alignItems='center' mt='2'>
                                                <EmailIcon style={{fontSize:'16'}}/>
                                                <Text fontSize='sm'>{item?.email ? item?.email : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='3'>
                                                <PhoneIcon style={{fontSize:'16'}}/>
                                                <Text fontSize='sm' fontWeight='light'>{item?.mobile ? item?.mobile : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='2'>
                                                <BusinessCenterIcon style={{fontSize:'16'}}/>
                                                <Text fontSize='sm' fontWeight='light'>works as <span style={{fontWeight:'bold'}}>{item?.role ? item?.role : '-'}</span></Text>
                                            </HStack>
                                            <Text fontSize='md' mt='2' fontWeight='light'>{item?.description ? item?.description : '-'}</Text>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    )
                                })}
                        </Accordion>
                    </Box>
                    <Box
                        p='4'
                        bg='#fff'
                        borderRadius='md'
                        boxShadow='sm'
                        mt='2'      
                    >
                        <HStack justify={'space-between'}>
                            <Text fontWeight='bold' fontSize='lg'>Manufacturers</Text>
                            {client_data?.manufacturers?.length > 1 ? (
                                <Text onClick={(()=>set_current_page('manufacturers'))}>see all</Text>
                                )
                                 : null
                            }
                        </HStack>
                        <Accordion allowToggle>
                            {client_data?.manufacturers?.slice(0,2).map((item,index)=>{
                                return(
                                    <AccordionItem key={index}>
                                        <AccordionButton>
                                            <HStack justify='space-between' flex='1'>
                                                <HStack flex='1'>
                                                
                                                    <Avatar size='md' icon={<HomeWorkIcon fontSize='1.5rem' />}/>
                                                    <Box align='start'>
                                                        <Text fontWeight='bold' fontSize='lg'>{item.name}</Text>
                                                        <Text fontSize='sm' color='gray.400'>{item.email}</Text>
                                                    </Box>
                                                </HStack>
                                                <AccordionIcon />
                                            </HStack>
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <HStack alignItems='center' mt='2'>
                                                <EmailIcon style={{fontSize:'16'}}/>
                                                <Text fontSize='sm'>{item?.email ? item?.email : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='3'>
                                                <PhoneIcon style={{fontSize:'16'}}/>
                                                <Text fontSize='sm' fontWeight='light'>{item?.mobile ? item?.mobile : '-'}</Text>
                                            </HStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    )
                                })}
                        </Accordion>
                    </Box>
                </GridItem>
            }
        </Grid>
    </Box>
  )
}

const Suggest_New_Industry=({set_suggest_new_ind})=>{
	const toast = useToast();
	const [suggest_industry_title,set_suggest_industry_title]=useState(false);
	const [suggest_industry_description,set_suggest_industry_description]=useState(false);

	const payload = {
		title: suggest_industry_title,
		description: suggest_industry_description
	}

	const handle_suggest_industry=async()=>{
		if (suggest_industry_title == '' || suggest_industry_description == ''){
			toast({
              title: '',
              description: `Ensure all inputs are filled`,
              status: 'info',
              isClosable: true,
            });
            return;
		}else{
			await Suggest_Industry(payload).then((response)=>{
				toast({
	              title: '',
	              description: `${payload.title} has been suggested successfully.`,
	              status: 'info',
	              isClosable: true,
	            });
			}).catch((err)=>{
				toast({
	              title: '',
	              description: err.response.data,
	              status: 'error',
	              isClosable: true,
	            });
			})
		}
		set_suggest_new_ind(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Industry</Text>
			<Input bg='#fff' type='text' placeholder='Title of Industry' onChange={((e)=>{set_suggest_industry_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Industry' onChange={((e)=>{set_suggest_industry_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_industry}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{set_suggest_new_ind(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}

const Suggest_New_Technology=({set_suggest_new_technology})=>{
	const toast = useToast();
	const [suggest_technology_title,set_suggest_technology_title]=useState(false);
	const [suggest_technology_description,set_suggest_technology_description]=useState(false);

	const payload = {
		title: suggest_technology_title,
		description: suggest_technology_description
	}

	const handle_suggest_technology=async()=>{
		if (suggest_technology_title == '' || suggest_technology_description == ''){
			toast({
              title: '',
              description: `Ensure all inputs are filled`,
              status: 'info',
              isClosable: true,
            });
            return;
		}else{
			await Suggest_Technology(payload).then((response)=>{
				toast({
	              title: '',
	              description: `${payload.title} has been suggested successfully.`,
	              status: 'info',
	              isClosable: true,
	            });
			}).catch((err)=>{
				toast({
	              title: '',
	              description: err.response.data,
	              status: 'error',
	              isClosable: true,
	            });
			})
		}
		set_suggest_new_technology(false)
	}

	return(
		<Flex direction='column' gap='2' bg='#eee' p='2'>
			<Text fontWeight='bold'>Suggest Technology</Text>
			<Input bg='#fff' type='text' placeholder='Title of Technology' onChange={((e)=>{set_suggest_technology_title(e.target.value)})}/>
			<Textarea bg='#fff' type='text' placeholder='description of Technology' onChange={((e)=>{set_suggest_technology_description(e.target.value)})}/>
			<Flex gap='2'>
				<Button color='#fff' bg='#009393' onClick={handle_suggest_technology}>Submit</Button>
				<Button bg='#fff' border='1px solid red' onClick={(()=>{set_suggest_new_technology(false)})}>Cancel</Button>
			</Flex>
		</Flex>
	)
}