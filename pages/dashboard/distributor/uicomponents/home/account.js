import { Box, HStack, Icon, Text } from "@chakra-ui/react"
import { useUserContext } from "../../../../../components/Providers/userContext";
import { MdCalendarMonth, MdEmail, MdLocalPhone, MdLocationPin, MdPerson } from "react-icons/md";
import moment from "moment";

export default function Account(){
    const {user,set_user_handler } = useUserContext();
    return(
        <>
            <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                <Text fontWeight='bold' fontSize='lg'>About</Text>
                <Text>{user?.description ? user?.description : '-'}</Text>
            </Box>
            <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                <Text fontWeight='bold' fontSize='lg'>Company Profile</Text>
                <HStack alignItems='center' mt='2'>
                    <Icon as={MdEmail} boxSize={4}/>
                    <Text fontSize='sm'>{user?.email_of_company ? user?.email_of_company : '-'}</Text>
                </HStack>
                <HStack alignItems='center' mt='3'>
                    <Icon as={MdLocalPhone} boxSize={4}/>
                    <Text fontSize='sm' fontWeight='light'>{user?.mobile_of_company ? user?.mobile_of_company : '-'}</Text>
                </HStack>
                <HStack alignItems='center' mt='3'>
                    <Icon as={MdLocationPin} boxSize={4}/>
                    <Text fontSize='sm' fontWeight='light'>{user?.address_of_company ? user?.address_of_company : '-'}</Text>
                </HStack>
                <HStack alignItems='center' mt='2'>
                    <Icon as={MdCalendarMonth} boxSize={4}/>
                    <Text fontSize='sm' fontWeight='light'>{moment( user?.joined_in).format("MMM Do YY")}</Text>
                </HStack>
            </Box>
            <Box bg='#fff' p='4' borderRadius={'md'} boxShadow={'sm'} my='2'>
                <Text fontWeight='bold' fontSize='lg'>Account handler</Text>
                <HStack alignItems='center' mt='2'>
                    <Icon as={MdPerson} boxSize={4}/>
                    <Text fontSize='sm' fontWeight='light'>{user?.contact_person_name ? user?.contact_person_name : '-'}</Text>
                </HStack>
                <HStack alignItems='center' mt='2'>
                    <Icon as={MdEmail} boxSize={4}/>
                    <Text fontSize='sm'>{user?.contact_email ? user?.contact_email : '-'}</Text>
                </HStack>
                <HStack alignItems='center' mt='3'>
                    <Icon as={MdLocalPhone} boxSize={4}/>
                    <Text fontSize='sm' fontWeight='light'>{user?.contact_mobile ? user?.contact_mobile : '-'}</Text>
                </HStack>
            </Box>
        </>
    )
}