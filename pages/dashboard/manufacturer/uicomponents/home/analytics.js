import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Center, Divider, Flex, HStack, Icon, Skeleton, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Tooltip } from "@chakra-ui/react";
import { useUserContext } from "../../../../../components/Providers/userContext";
import { SiGoogleanalytics } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import SuggestMarket from "../../../../../components/ui/Dashboard/suggestmarket";
import { MdEmail, MdLocalPhone, MdBusinessCenter, MdFactory } from "react-icons/md";

export const Analytics=()=>{
    const {user,set_user_handler } = useUserContext();
    return(
        <>
            {!user?.valid_email_status || !user?.verification_status?
                <Center display={'flex'} flexDirection={'column'} py='10' h='full' borderRadius='md'>
                    <Icon as={SiGoogleanalytics} boxSize={20} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'}>You have need to complete your profile to<br/> get access to insights and Analytics</Text>
                </Center>
                : 
                <>
                    <StatGroup bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2' display={'flex'} flexDirection={'column'}>
                        {user?.subscription? null : <Text fontSize={'sm'} color={'gray.400'}>Upgrade to analyse your accounts analytics</Text>}
                        <Flex w='full' mt='2'>
                            <Stat>
                                <HStack color={user?.subscription? 'black':'gray.400'}>
                                    {user?.subscription? null : <Icon as={FaLock} boxSize={4}/>}
                                    <StatLabel>Products stats</StatLabel>
                                </HStack>
                                {user?.subscription?
                                    <Flex flexDirection={'column'} textAlign={'center'}>
                                        <StatNumber>-</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                                5.36%
                                        </StatHelpText>
                                    </Flex>
                                    :
                                    <Skeleton height='40px' w='100px'/>
                                }
                            </Stat>
                            <Divider orientation="vertical"/>
                            <Stat>
                                <HStack color={user?.subscription? 'black':'gray.400'} textAlign={'center'} w='full'>
                                    {user?.subscription? null : <Icon as={FaLock} boxSize={4}/>}
                                    <StatLabel>Profile stats</StatLabel>
                                </HStack>
                                {user?.subscription?
                                    <Flex flexDirection={'column'} textAlign={'center'}>
                                        <StatNumber>{user?.views ===  0? '0' : user?.views}</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                                1.36%
                                        </StatHelpText>
                                    </Flex>
                                    :
                                    <Skeleton height='40px' w='100px'/>
                                }
                            </Stat>
                        </Flex>
                    </StatGroup>
                    <Box bg='#fff' p='4'>
                        <Text mb='0'>Operating in an industry or Technology not included in our options?</Text>
                        <SuggestMarket />
                    </Box>
                    <Box p='4' bg='#fff' borderRadius='md' boxShadow='sm' mt='2'>
                        <HStack justify={'space-between'}>
                            <Text fontWeight='bold' fontSize='lg'>Experts</Text>
                            {user?.experts?.length > 1 ? ( <Text>see all</Text> ) : null }
                        </HStack>
                        <Accordion allowToggle>
                            {user?.experts?.slice(0,1).map((item,index)=>{
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
                                                <Icon as={MdEmail} boxSize={4}/>
                                                <Text fontSize='sm'>{item?.email ? item?.email : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='3'>
                                                <Icon as={MdLocalPhone} boxSize={4}/>
                                                <Text fontSize='sm' fontWeight='light'>{item?.mobile ? item?.mobile : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='2'>
                                                <Icon as={MdBusinessCenter} boxSize={4}/>
                                                <Text fontSize='sm' fontWeight='light'>works as <span style={{fontWeight:'bold'}}>{item?.role ? item?.role : '-'}</span></Text>
                                            </HStack>
                                            <Text fontSize='md' mt='2' fontWeight='light'>{item?.description ? item?.description : '-'}</Text>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    )
                                })}
                        </Accordion>
                    </Box>
                    <Box p='4' bg='#fff' borderRadius='md' boxShadow='sm' mt='2'>
                        <HStack justify={'space-between'}>
                            <Text fontWeight='bold' fontSize='lg'>Distributors</Text>
                            {user?.distributors?.length > 1 ? ( <Text >see all</Text> ) : null }
                        </HStack>
                        <Accordion allowToggle>
                            {user?.distributors?.slice(0,2).map((item,index)=>{
                                return(
                                    <AccordionItem key={index}>
                                        <AccordionButton>
                                            <HStack justify='space-between' flex='1'>
                                                <HStack flex='1'>
                                                    <Avatar size='md' icon={<Icon as={MdFactory}/>}/>
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
                                                <Icon as={MdEmail} boxSize={4}/>
                                                <Text fontSize='sm'>{item?.email ? item?.email : '-'}</Text>
                                            </HStack>
                                            <HStack alignItems='center' mt='3'>
                                                <Icon as={MdLocalPhone} boxSize={4}/>
                                                <Text fontSize='sm' fontWeight='light'>{item?.mobile ? item?.mobile : '-'}</Text>
                                            </HStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    )
                                })}
                        </Accordion>
                    </Box>
                </>
            }
        </>
    )
}